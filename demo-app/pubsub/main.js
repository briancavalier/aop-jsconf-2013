define(['model/Products', './Controller', './ProductListView', './CartView', 'text!data/products.json'], function(Products, Controller, ProductListView, CartView, products) {

	var model, controller, productListView, cartView;

	model = new Products(JSON.parse(products));
	controller = new Controller();
	productListView = new ProductListView(document.getElementById('product-list'));
	cartView = new CartView(document.getElementById('cart'));

	controller.init(model);
	cartView.init();
	productListView.init(model);

	window.addEventListener('beforeunload', function() {
		cartView.destroy();
		productListView.destroy();
	});
});