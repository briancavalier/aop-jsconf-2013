define(['text!template/productListView.html', 'dom/renderList', 'dom/findAncestorAttr', './makeEvented'], function(template, renderList, findAncestorAttr, makeEvented) {

	function ProductListView(node) {
		makeEvented(this);
		this.node = node;
	}

	ProductListView.prototype = {
		init: function(products) {
			var node, self;

			node = this.node;
			self = this;

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
					self.emit('add', products.find(id));
				}
			}
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
