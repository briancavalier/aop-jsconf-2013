define(['text!./template.html', 'dom/renderList', 'dom/addClassWhile'], function(template, renderList, addClassWhile) {

	function ProductListView(node) {
		this.node = node;
	}

	ProductListView.prototype = {
		init: function(model, controller) {
			var node = this.node;

			node.addEventListener('click', handleAddClick);

			this.destroy = function() {
				node.removeEventListener('click', handleAddClick);
				node.innerHTML = '';
			}

			this.node.innerHTML = renderList(template, model.list());

			function handleAddClick(e) {
				var itemNode, id;
				if(e.target.className === 'add') {
					itemNode = findItemNode(e.target);
					id = itemNode.getAttribute('data-item-id');

					addClassWhile('adding', node, controller.addItemToCart(id));
				}
			}
		},

		destroy: function() {}
	}

	return ProductListView;

	function findItemNode(startingNode) {
		var itemNode = startingNode;
		while(!itemNode.hasAttribute('data-item-id') && itemNode.parentNode) {
			itemNode = itemNode.parentNode;
		}

		return itemNode;
	}

});
