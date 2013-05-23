(function(define) {
define(function(require) {

	var when, delay, makeEvented;

	when = require('when');
	delay = require('when/delay');
	makeEvented = require('./makeEvented');

	function Controller() {
		makeEvented(this);
	}

	Controller.prototype = {
		init: function(productView, cartView) {
			var subscriptions = [];

			subscriptions.push(productView.on('add',
				this.addItemToCart.bind(this)));
			subscriptions.push(cartView.on('remove',
				this.removeItemFromCart.bind(this)));
		},

		addItemToCart: function(item) {
			if(!item) {
				return when.reject(new Error('No such item'));
			}

			return delay(1000, item)
				.then(this.emit.bind(this, 'add'))
				.otherwise(this.emit.bind(this, 'add/error', item));
		},

		removeItemFromCart: function(id) {
			return delay(1000);
		}
	};

	return Controller;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
