(function(define) {
define(function(require) {

	var when, delay;

	when = require('when');
	delay = require('when/delay');

	function Controller() {}

	Controller.prototype = {
		init: function(cartView) {
			this.cartView = cartView;
		},

		addItemToCart: function(item) {
			if(!item) {
				return when.reject(new Error('No such item: ' + id));
			}

			return delay(1000, [this.cartView, item])
				.spread(function(cartView, item) {
					cartView.addItem(item)
				});
		},

		removeItemFromCart: function(id) {
			return delay(1000);
		}
	};

	return Controller;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
