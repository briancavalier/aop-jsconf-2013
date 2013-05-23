(function(define) {
define(function(require) {

	function Model(data) {
		this.data = data;
		this.index = data.reduce(function(index, item) {
			index[item.id] = item;
			return index;
		}, {});
	}

	Model.prototype = {
		find: function(id) {
			return this.index[id];
		},

		list: function() {
			return this.data.slice();
		}
	};

	return Model;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
