(function(define) {
define(['text!template/cartView.html', 'dom/render', 'dom/findAncestorNode'], function(template, render, findAncestorNode) {

	function CartView(node) {
		this.node = node;
	}

	CartView.prototype = {
		init: function(controller) {
			var node = this.node;

			this._initDom(node);

			node.addEventListener('click', handleRemoveClick);

			this.destroy = function() {
				node.removeEventListener('click', handleRemoveClick);
				node.innerHTML = '';
			}

			function handleRemoveClick(e) {
				var itemNode, id, promise;
				if(e.target.className === 'remove') {
					itemNode = findAncestorNode('data-item-id', e.target);
					if(itemNode) {
						id = itemNode.getAttribute('data-item-id');

						promise = controller.removeItemFromCart(id)
							.then(function() {
								itemNode.parentNode.removeChild(itemNode);
							});
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

		destroy: function() {}
	};

	return CartView;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
