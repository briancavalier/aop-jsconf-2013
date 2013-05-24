(function(define) {
define(function(require) {

	var when, delay;

	when = require('when');
	delay = require('when/delay');

	function Controller() {}

	Controller.prototype = {
		init: function(cart, cartView) {
			this.cart = cart;
			this.cartView = cartView;
		},

		addItemToCart: function(item) {
			var cartView = this.cartView;
			return this.cart.addItem(item)
				.then(cartView.addItem.bind(cartView));
		},

		removeItemFromCart: function(id) {
			return this.cart.removeItem(id);
		}
	};

	return Controller;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
