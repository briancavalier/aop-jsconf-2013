(function(define) {
define(function(require) {

	var when = require('when');

	function CartFail() {}

	CartFail.prototype = {
		addItem: function(item) {
			return when.reject(new Error('Adding item failed'));
		},

		removeItem: function(id) {
			return when.reject(new Error('Removing item failed'));
		}
	};

	return CartFail;
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
