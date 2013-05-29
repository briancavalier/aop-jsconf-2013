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

	// In order for all of these to bind to events on each other, they have
	// to get references to them first!  Even more coupled than the vanilla version!
	controller.init(cart, productListView, cartView);
	cartView.init(controller);
	productListView.init(products);
});