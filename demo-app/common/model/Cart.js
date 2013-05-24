(function(define) {
define(function(require) {

	var delay = require('when/delay');

	function Cart() {}

	Cart.prototype = {
		addItem: function(item) {
			return delay(1000, item);
		},

		removeItem: function(id) {
			return delay(1000);
		}
	};

	return Cart;
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
