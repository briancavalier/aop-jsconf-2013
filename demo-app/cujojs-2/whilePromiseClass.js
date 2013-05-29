(function(define) {
define(function(require) {

	var when = require('when');

	/**
	 * Add a class to a node immediately, and then remove it
	 * later when the promise resolved (regardless of whether it
	 * fulfills or rejects).
	 */
	return function(className, node, promise) {
		node.classList.add(className);
		return when(promise).ensure(function() {
			node.classList.remove(className);
		});
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
