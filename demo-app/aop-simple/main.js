define(function(require) {

	var Products, Cart, Controller, ProductListView, CartView, aop, productData,
		products, cart, controller, productListView, cartView,

	Products = require('model/Products');
	Cart = require('model/Cart');
	Controller = require('./Controller');
	ProductListView = require('./ProductListView');
	CartView = require('./CartView');
	aop = require('aop');
	productData = require('data/products');

	// Create models for the products and cart
	products = new Products(productData);
	cart = new Cart();

	// Create controller and views
	controller = new Controller();
	productListView = new ProductListView(document.getElementById('product-list'));
	cartView = new CartView(document.getElementById('cart'));

	// Use our simple AOP lib to bind the components together externally
	controller.addItemToCart = aop.afterReturning(
		controller.addItemToCart,
		function(promise) {
			return promise.then(cartView.addItem.bind(cartView));
		});

	productListView.productAdded = aop.afterReturning(
		productListView.productAdded,
		controller.addItemToCart.bind(controller));

	cartView.removeItemById = aop.before(
		cartView.removeItemById,
		controller.removeItemFromCart.bind(controller));

	// Give out minimal references to models only
	controller.init(cart);
	cartView.init();
	productListView.init(products);
});