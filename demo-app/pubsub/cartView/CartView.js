(function(define) {
define(['text!./template.html', 'dom/render', 'dom/addClassWhile', '../pubsub'], function(template, render, addClassWhile, pubsub) {

	function CartView(node) {
		this.node = node;
	}

	CartView.prototype = {
		init: function() {
			var node, subscriptions;

			node = this.node;

			node.innerHTML = template;
			this.list = this.node.firstChild;
			this.itemTemplate = this.list.innerHTML;

			this.list.innerHTML = '';

			subscriptions = [];
			subscriptions.push(pubsub.subscribe('product/add',
				this.addItem.bind(this)));
			subscriptions.push(pubsub.subscribe('cart/add/error',
				this.removeItem.bind(this)));

			node.addEventListener('click', handleRemoveClick);

			this.destroy = function() {
				node.removeEventListener('click', handleRemoveClick);
				node.innerHTML = '';
				subscriptions.forEach(function(unsubscribe) {
					unsubscribe();
				});
			}


			function handleRemoveClick(e) {
				var itemNode, id, promise;
				if(e.target.className === 'remove') {
					itemNode = findItemNode(e.target);
					if(itemNode) {
						id = itemNode.getAttribute('data-item-id');

						itemNode.parentNode.removeChild(itemNode);
						pubsub.publish('cart/remove', id);
					}
				}
			}

		},

		addItem: function(item) {
			this.list.innerHTML += render(this.itemTemplate, item);
		},

		removeItem: function(item) {
			var itemNode = this.node.querySelector('[data-item-id="' + item.id + '"]');
			if(itemNode) {
				itemNode.parentNode.removeChild(itemNode);
			}
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
