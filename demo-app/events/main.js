define(['model/Products', './Controller', './ProductListView', './CartView', 'text!data/products.json'], function(Products, Controller, ProductListView, CartView, productData) {

	var products, controller, productListView, cartView;

	products = new Products(JSON.parse(productData));
	controller = new Controller();
	productListView = new ProductListView(document.getElementById('product-list'));
	cartView = new CartView(document.getElementById('cart'));

	controller.init(productListView, cartView);
	cartView.init(controller);
	productListView.init(products);

	window.addEventListener('beforeunload', function() {
		cartView.destroy();
		productListView.destroy();
	});
});