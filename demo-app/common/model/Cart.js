(function(define) {
define(function(require) {

	var when, delay;

	when = require('when');
	delay = require('when/delay');

	function Cart() {}

	Cart.prototype = {
		addItem: function(item) {
			if(!item) {
				return when.reject(new Error('No such item'));
			}

			return delay(1000, item);
		},

		removeItem: function(id) {
			return delay(1000);
		}
	};

	return Cart;
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
