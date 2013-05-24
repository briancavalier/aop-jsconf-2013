(function(define) {
define(['text!template/cartView.html', 'dom/render', 'dom/findAncestorAttr', './pubsub'], function(template, render, findAncestorAttr, pubsub) {

	function CartView(node) {
		this.node = node;
	}

	CartView.prototype = {
		init: function() {
			var node, subscriptions;

			node = this.node;

			this._initDom(node);

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
			};

			function handleRemoveClick(e) {
				var id;
				if(e.target.className === 'remove') {
					id = findAncestorAttr('data-item-id', e.target);
					pubsub.publish('cart/remove', id);
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
			var itemNode = this.node.querySelector('[data-item-id="' + item.id + '"]');
			if(itemNode) {
				itemNode.parentNode.removeChild(itemNode);
			}
		},

		destroy: function() {}
	};

	return CartView;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
