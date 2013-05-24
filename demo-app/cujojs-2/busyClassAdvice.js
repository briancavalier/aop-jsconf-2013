(function(define) {
define(function(require) {

	var fn = require('when/function');

	/**
	 * Around advice for meld.js that adds a class to a node
	 * immediately, and then removes it later when a promise
	 * resolves.  Handy for "loading" indicators, and can be
	 * reused wherever you need it rather than hardcoding it into
	 * every view component.
	 */
	return function createBusyClassAdvice(className, node) {
		return function(joinpoint) {
			node.classList.add(className);
			return fn.call(joinpoint.proceed).ensure(function() {
				node.classList.remove(className);
			});
		};
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
