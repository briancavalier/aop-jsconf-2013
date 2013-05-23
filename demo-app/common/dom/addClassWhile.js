/**
 * addClassWhile
 * @author: brian
 */
(function(define) {
define(function(require) {

	var when = require('when');

	return function addClassWhile(className, node, promise) {
		node.className = className;
		return when(promise).ensure(function() {
			node.className = '';
		});
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
