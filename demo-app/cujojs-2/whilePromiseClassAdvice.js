(function(define) {
define(function(require) {

	var whilePromiseClass = require('./whilePromiseClass');

	/**
	 * Around advice for meld.js that adds a class to a node
	 * immediately, and then removes it later when a promise
	 * resolves.  Handy for "loading" indicators, and can be
	 * reused wherever you need it rather than hardcoding it into
	 * every view component.
	 */
	return function createWhilePromiseClassAdvice(className, node) {
		return function(joinpoint) {
			return whilePromiseClass(className, node, joinpoint.proceed());
		};
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
