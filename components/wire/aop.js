/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * wire/aop plugin
 * Provides AOP for components created via wire, including Decorators,
 * Introductions (mixins), and Pointcut-based Aspect Weaving.
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(define) {
define(['meld', 'when', './lib/async', './lib/connection'], function(meld, when, async, connection) {

	var adviceTypes, adviceStep, undef;

	// "after" is not included in these standard advice types because
	// it is created as promise-aware advice.
	adviceTypes = ['before', 'around', 'afterReturning', 'afterThrowing'];
	adviceStep = 'connect:before';

    //
    // Decoration
    //

	function applyDecorator(target, Decorator, args) {
		args = args ? [target].concat(args) : [target];

		Decorator.apply(null, args);
	}

	function makeDecorator(decorator, args, wire) {
		return function(target) {
			function apply(Decorator) {
				return args
					? when(wire(args), function (resolvedArgs) {
					applyDecorator(target, Decorator, resolvedArgs);
				})
					: applyDecorator(target, Decorator);
			}

			return when(wire.resolveRef(decorator), apply);
		};
	}

	function decorateFacet(resolver, facet, wire) {
		var target, options, tasks;

		target = facet.target;
		options = facet.options;
		tasks = [];

		for(var decoratorRefName in options) {
			tasks.push(makeDecorator(decoratorRefName, options[decoratorRefName], wire));
		}

		resolver.resolve(async.sequence(tasks, target));
	}

	//
	// Simple advice
	//

	function addSingleAdvice(addAdviceFunc, advices, proxy, advice, options, wire) {

		function handleAopConnection(srcObject, srcMethod, adviceHandler) {
			advices.push(addAdviceFunc(srcObject, srcMethod, adviceHandler));
		}

		return connection.parse(proxy, advice, options, wire, handleAopConnection);
	}

	function makeSingleAdviceAdd(adviceType) {
		return function (source, sourceMethod, advice) {
			return meld[adviceType](source, sourceMethod, advice);
		};
	}

	function addAfterFulfillingAdvice(source, sourceMethod, advice) {
		return meld.afterReturning(source, sourceMethod, function(promise) {
			return when(promise, advice);
		});
	}

	function addAfterRejectingAdvice(source, sourceMethod, advice) {
		return meld.afterReturning(source, sourceMethod, function(promise) {
			return when(promise, null, advice);
		});
	}

	function addAfterPromiseAdvice(source, sourceMethod, advice) {
		return meld.after(source, sourceMethod, function(promise) {
			return when(promise, advice, advice);
		});
	}

	function makeAdviceFacet(addAdviceFunc, advices) {
		return function(resolver, facet, wire) {
			var advice, target, advicesToAdd, promises;

			target = facet;
			advicesToAdd = facet.options;
			promises = [];

			for(advice in advicesToAdd) {
				promises.push(addSingleAdvice(addAdviceFunc, advices,
					target, advice, advicesToAdd[advice], wire));
			}

			resolver.resolve(when.all(promises));
		};
	}

    //
    // Aspect Weaving
    //

    function applyAspectCombined(target, aspect, wire, add) {
        return when(wire.resolveRef(aspect), function (aspect) {
            var pointcut = aspect.pointcut;

            if (pointcut) {
                add(target, pointcut, aspect);
            }

            return target;
        });
    }

    function applyAspectSeparate(target, aspect, wire, add) {
        var pointcut, advice;

        pointcut = aspect.pointcut;
        advice = aspect.advice;

        function applyAdvice(pointcut) {
            return when(wire.resolveRef(advice), function (aspect) {
                add(target, pointcut, aspect);
                return target;
            });
        }

        return typeof pointcut === 'string'
            ? when(wire.resolveRef(pointcut, applyAdvice))
            : applyAdvice(pointcut);
    }

    function weave(resolver, proxy, wire, options, add) {
		// TODO: Refactor weaving to use proxy.invoke

        var target, path, aspects, applyAdvice;

        aspects = options.aspects;
        path = proxy.path;

        if (!aspects || path === undef) {
            resolver.resolve();
            return;
        }

        target = proxy.target;
        applyAdvice = applyAspectCombined;

        // Reduce will preserve order of aspects being applied
        resolver.resolve(when.reduce(aspects, function(target, aspect) {
            var aspectPath;

            if (aspect.advice) {
                aspectPath = aspect.advice;
                applyAdvice = applyAspectSeparate;
            } else {
                aspectPath = aspect;
            }

            return typeof aspectPath === 'string' && aspectPath !== path
                ? applyAdvice(target, aspect, wire, add)
                : target;

        }, target));
    }

    return {
        /**
         * Creates wire/aop plugin instances.
         *
         * @param ready {Promise} promise that will be resolved when the context has been wired,
         *  rejected if there is an error during the wiring process, and will receive progress
         *  events for object creation, property setting, and initialization.
         * @param destroyed {Promise} promise that will be resolved when the context has been destroyed,
         *  rejected if there is an error while destroying the context, and will receive progress
         *  events for objects being destroyed.
         * @param options {Object}
         */
        wire$plugin: function(ready, destroyed, options) {

            // Track aspects so they can be removed when the context is destroyed
            var woven, plugin, i, len, adviceType;

			woven = [];

            // Remove all aspects that we added in this context
            when(destroyed, function() {
                for(var i = woven.length - 1; i >= 0; --i) {
                    woven[i].remove();
                }
            });

            /**
             * Function to add an aspect and remember it in the current context
             * so that it can be removed when the context is destroyed.
             * @param target
             * @param pointcut
             * @param aspect
             */
            function add(target, pointcut, aspect) {
                woven.push(meld.add(target, pointcut, aspect));
            }

            function makeFacet(step, callback) {
                var facet = {};

                facet[step] = function(resolver, proxy, wire) {
                    callback(resolver, proxy, wire);
                };

                return facet;
            }

            // Plugin
            plugin = {
                facets: {
                    decorate:       makeFacet('configure:after', decorateFacet),
					afterFulfilling: makeFacet(adviceStep, makeAdviceFacet(addAfterFulfillingAdvice, woven)),
					afterRejecting:  makeFacet(adviceStep, makeAdviceFacet(addAfterRejectingAdvice, woven)),
					after: makeFacet(adviceStep, makeAdviceFacet(addAfterPromiseAdvice, woven))
                }
            };

			if(options.aspects) {
				plugin.create = function(resolver, proxy, wire) {
					weave(resolver, proxy, wire, options, add);
				};
			}

			// Add all regular single advice facets
			for(i = 0, len = adviceTypes.length; i<len; i++) {
				adviceType = adviceTypes[i];
				plugin.facets[adviceType] = makeFacet(adviceStep, makeAdviceFacet(makeSingleAdviceAdd(adviceType), woven));
			}

			return plugin;
        }
    };
});
})(typeof define == 'function'
	// use define for AMD if available
	? define
    : function(deps, factory) {
        module.exports = factory.apply(this, deps.map(require));
    }
);
