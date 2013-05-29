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

	// Init the controller and views, giving out minimal references.
	// Unforutnately, we pay the price inside each of these modules
	controller.init(cart);
	cartView.init();
	productListView.init(products);
});