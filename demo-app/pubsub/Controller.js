(function(define) {
define(function(require) {

	var when, delay, pubsub;

	when = require('when');
	delay = require('when/delay');
	pubsub = require('./pubsub');

	function Controller() {}

	Controller.prototype = {
		init: function(cart) {
			var subscriptions = [];

			this.cart = cart;

			subscriptions.push(pubsub.subscribe('product/add',
				this.addItemToCart.bind(this)));
			subscriptions.push(pubsub.subscribe('cart/remove',
				this.removeItemFromCart.bind(this)));
		},

		addItemToCart: function(item) {
			return this.cart.addItem(item).otherwise(
				pubsub.publish.bind(pubsub, 'cart/add/error', item));
		},

		removeItemFromCart: function(id) {
			return this.cart.removeItem(id);
		}
	};

	return Controller;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
