(function(define) {
define(function(require) {

	var when, delay, pubsub;

	when = require('when');
	delay = require('when/delay');
	pubsub = require('./pubsub');

	function Controller() {}

	Controller.prototype = {
		init: function() {
			var subscriptions = [];

			subscriptions.push(pubsub.subscribe('product/add', this.addItemToCart.bind(this)));
			subscriptions.push(pubsub.subscribe('cart/remove', this.removeItemFromCart.bind(this)));
		},

		addItemToCart: function(item) {
			if(!item) {
				return when.reject(new Error('No such item: ' + item.id));
			}

			return delay(1000).otherwise(function(e) {
				pubsub.publish('cart/add/error', item, e);
			});
		},

		removeItemFromCart: function(id) {
			return delay(1000);
		}
	};

	return Controller;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
