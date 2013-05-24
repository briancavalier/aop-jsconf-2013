(function(define) {
define(['text!template/cartView.html', 'dom/render', 'dom/findAncestorNode', './makeEvented'], function(template, render, findAncestorNode, makeEvented) {

	function CartView(node) {
		makeEvented(this);
		this.node = node;
	}

	CartView.prototype = {
		init: function(controller) {
			var self, node, subscriptions;

			self = this;
			node = this.node;

			this._initDom(node);

			subscriptions = [];
			subscriptions.push(controller.on('add',
				this.addItem.bind(this)));
			subscriptions.push(controller.on('add/error',
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
				var itemNode, id;
				if(e.target.className === 'remove') {
					itemNode = findAncestorNode('data-item-id', e.target);
					if(itemNode) {
						id = itemNode.getAttribute('data-item-id');

						itemNode.parentNode.removeChild(itemNode);
						self.emit('remove', id);
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
