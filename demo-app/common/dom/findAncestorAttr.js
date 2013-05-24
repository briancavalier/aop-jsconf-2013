(function(define) {
define(function(require) {

	var findAncestorNode = require('./findAncestorNode');

	return function(attrName, startingNode) {
		var node = findAncestorNode(attrName, startingNode);
		return node && node.getAttribute(attrName);
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));
