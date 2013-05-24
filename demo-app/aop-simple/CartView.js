(function(define) {
define(['text!template/cartView.html', 'dom/render'], function(template, render) {

	function CartView(node) {
		this.node = node;
	}

	CartView.prototype = {
		init: function() {
			var self, node;

			self = this;
			node = this.node;

			this._initDom(node);

			node.addEventListener('click', handleRemoveClick);

			this.destroy = function() {
				node.removeEventListener('click', handleRemoveClick);
				node.innerHTML = '';
			};

			function handleRemoveClick(e) {
				var itemNode, id;
				if(e.target.className === 'remove') {
					itemNode = findItemNode(e.target);
					if(itemNode) {
						id = itemNode.getAttribute('data-item-id');
						self.removeItemById(id);
					}
				}
			}
		},

		_initDom: function(node) {
			node.innerHTML = template;
			this.list = this.node.firstChild;
			this.itemTemplate = this.list.innerHTML;
			this.list.innerHTML = '';
		},

		addItem: function(item) {
			this.list.innerHTML += render(this.itemTemplate, item);
		},

		removeItem: function(item) {
			return item && this.removeItemById(item.id);
		},

		removeItemById: function(id) {
			var itemNode = this.node.querySelector('[data-item-id="' + id + '"]');
			if(itemNode) {
				itemNode.parentNode.removeChild(itemNode);
			}
		},

		destroy: function() {}
	};

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
