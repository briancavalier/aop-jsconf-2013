define(function(require) {

	var Products, Cart, Controller, ProductListView, CartView, productData,
		products, cart, controller, productListView, cartView,

	Products = require('model/Products');
	Cart = require('model/Cart');
	Controller = require('./Controller');
	ProductListView = require('./ProductListView');
	CartView = require('./CartView');
	productData = require('data/products');

	products = new Products(productData);
	cart = new Cart();
	controller = new Controller();
	productListView = new ProductListView(document.getElementById('product-list'));
	cartView = new CartView(document.getElementById('cart'));

	controller.init(cart, productListView, cartView);
	cartView.init(controller);
	productListView.init(products);
});