define(function(require) {

	var Products, Cart, Controller, ProductListView, CartView, meld, productData,
		products, cart, controller, productListView, cartView,

	Products = require('model/Products');
	Cart = require('model/Cart');
	Controller = require('../aop-simple/Controller');
	ProductListView = require('../aop-simple/ProductListView');
	CartView = require('../aop-simple/CartView');
	meld = require('meld');
	productData = require('data/products');

	// Create models for the products and cart
	products = new Products(productData);
	cart = new Cart();

	// Create controller and views
	controller = new Controller();
	productListView = new ProductListView(document.getElementById('product-list'));
	cartView = new CartView(document.getElementById('cart'));

	// Use meld.js to bind the components together externally
	meld.afterReturning(controller, 'addItemToCart', function(promise) {
		return promise.then(cartView.addItem.bind(cartView));
	});

	meld.afterReturning(productListView, 'productAdded',
		controller.addItemToCart.bind(controller));

	meld.before(cartView, 'removeItemById',
		controller.removeItemFromCart.bind(controller));

	// Give out minimal references to models only
	controller.init(cart);
	cartView.init();
	productListView.init(products);
});