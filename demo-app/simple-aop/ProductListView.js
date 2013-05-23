define(['text!template/productListView.html', 'dom/renderList'], function(template, renderList) {

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
					itemNode = findItemNode(e.target);
					if(itemNode) {
						id = itemNode.getAttribute('data-item-id');
						self.productAdded(products.find(id));
					}
				}
			}
		},

		productAdded: function(item) {
			return item;
		},

		destroy: function() {}
	};

	return ProductListView;

	function findItemNode(startingNode) {
		var itemNode = startingNode;
		while(!itemNode.hasAttribute('data-item-id') && itemNode.parentNode) {
			itemNode = itemNode.parentNode;
		}

		return itemNode;
	}

});
