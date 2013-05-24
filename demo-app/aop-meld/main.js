define(function(require) {

	var Products, Cart, Controller, ProductListView, CartView, aop, productData,
		products, cart, controller, productListView, cartView,

	Products = require('model/Products');
	Cart = require('model/Cart');
	Controller = require('../aop-simple/Controller');
	ProductListView = require('../aop-simple/ProductListView');
	CartView = require('../aop-simple/CartView');
	aop = require('aop');
	productData = require('text!data/products.json');

	products = new Products(JSON.parse(productData));
	cart = new Cart();
	controller = new Controller();
	productListView = new ProductListView(document.getElementById('product-list'));
	cartView = new CartView(document.getElementById('cart'));

	meld.afterReturning(controller, 'addItemToCart', function(promise) {
		return promise.then(cartView.addItem.bind(cartView));
	});

	meld.afterReturning(productListView, 'productAdded',
		controller.addItemToCart.bind(controller));

	meld.afterReturning(cartView, 'removeItemById',
		controller.removeItemFromCart.bind(controller))

	controller.init(cart);
	cartView.init();
	productListView.init(products);
});