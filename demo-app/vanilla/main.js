define(['model/Products', './Controller', './productListView/ProductListView', './cartView/CartView', 'text!data/products.json'], function(Products, Controller, ProductListView, CartView, products) {

	var model, controller, productListView, cartView;

	model = new Products(JSON.parse(products));
	controller = new Controller();
	productListView = new ProductListView(document.getElementById('product-list'));
	cartView = new CartView(document.getElementById('cart'));

	controller.init(model, cartView);
	cartView.init(controller);
	productListView.init(model, controller);

	window.addEventListener('beforeunload', function() {
		cartView.destroy();
		productListView.destroy();
	});
});