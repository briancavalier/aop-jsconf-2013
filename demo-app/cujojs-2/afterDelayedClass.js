(function(define) {
define(function(require) {

	/**
	 * Add a class to a node immediately, and then remove it
	 * later when the promise resolved (regardless of whether it
	 * fulfills or rejects).
	 */
	return function(className, time, node) {
		return function(result) {
			node.classList.add(className);
			setTimeout(function() {
				node.classList.remove(className);
			}, time);
		};
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
