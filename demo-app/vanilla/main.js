define(function(require) {

	var Products, Cart, Controller, ProductListView, CartView, productData,
		products, cart, controller, productListView, cartView,

	Products = require('model/Products');
	Cart = require('model/Cart');
	Controller = require('./Controller');
	ProductListView = require('./ProductListView');
	CartView = require('./CartView');
	productData = require('data/products');

	// Create models for the products and cart
	products = new Products(productData);
	cart = new Cart();

	// Create controller and views
	controller = new Controller();
	productListView = new ProductListView(document.getElementById('product-list'));
	cartView = new CartView(document.getElementById('cart'));

	// Mash them all together, by giving out direct references
	// to everyone who needs one.
	controller.init(cart, cartView);
	cartView.init(controller);
	productListView.init(products, controller);
});