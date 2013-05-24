(function(define) {
define(function() {

	return function(attrName, startingNode) {
		var itemNode = startingNode;
		while(!itemNode.hasAttribute(attrName) && itemNode.parentNode) {
			itemNode = itemNode.parentNode;
		}

		return itemNode;
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));
