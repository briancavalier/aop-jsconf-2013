define(['text!template/productListView.html', 'dom/renderList', 'dom/findAncestorAttr'], function(template, renderList, findAncestorAttr) {

	function ProductListView(node) {
		this.node = node;
	}

	ProductListView.prototype = {
		init: function(products) {
			var self, node;

			self = this;
			node = this.node;

			node.addEventListener('click', handleAddClick);

			this.destroy = function() {
				node.removeEventListener('click', handleAddClick);
				node.innerHTML = '';
			};

			this.node.innerHTML = renderList(template, products.list());

			function handleAddClick(e) {
				var itemNode, id;
				if(e.target.className === 'add') {
					id = findAncestorAttr('data-item-id', e.target);
					self.productAdded(products.find(id));
				}
			}
		},

		productAdded: function(item) {
			return item;
		},

		destroy: function() {}
	};

	return ProductListView;

});
