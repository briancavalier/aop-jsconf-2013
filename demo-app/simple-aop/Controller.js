(function(define) {
define(function(require) {

	var when, delay;

	when = require('when');
	delay = require('when/delay');

	function Controller() {}

	Controller.prototype = {
		addItemToCart: function(item) {
			if(!item) {
				return when.reject(new Error('No such item'));
			}

			return delay(1000, item);
		},

		removeItemFromCart: function(id) {
			return delay(1000);
		}
	};

	return Controller;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
