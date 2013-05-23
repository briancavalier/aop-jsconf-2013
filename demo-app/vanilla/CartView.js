(function(define) {
define(['text!template/cartView.html', 'dom/render', 'dom/addClassWhile'], function(template, render, addClassWhile) {

	function CartView(node) {
		this.node = node;
	}

	CartView.prototype = {
		init: function(controller) {
			var node = this.node;

			node.innerHTML = template;
			this.list = this.node.firstChild;
			this.itemTemplate = this.list.innerHTML;

			this.list.innerHTML = '';

			node.addEventListener('click', handleRemoveClick);

			this.destroy = function() {
				node.removeEventListener('click', handleRemoveClick);
				node.innerHTML = '';
			}

			function handleRemoveClick(e) {
				var itemNode, id, promise;
				if(e.target.className === 'remove') {
					itemNode = findItemNode(e.target);
					if(itemNode) {
						id = itemNode.getAttribute('data-item-id');

						promise = controller.removeItemFromCart(id)
							.then(function() {
								itemNode.parentNode.removeChild(itemNode);
							});

						addClassWhile('removing', node, promise);
					}
				}
			}
		},

		addItem: function(item) {
			this.list.innerHTML += render(this.itemTemplate, item);
		},

		destroy: function() {}
	}

	return CartView;

	function findItemNode(startingNode) {
		var itemNode = startingNode;
		while(!itemNode.hasAttribute('data-item-id') && itemNode.parentNode) {
			itemNode = itemNode.parentNode;
		}

		return itemNode;
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
