define(['model/Products', './Controller', './ProductListView', './CartView', 'aop', 'text!data/products.json'], function(Products, Controller, ProductListView, CartView, aop, productData) {

	var products, controller, productListView, cartView;

	products = new Products(JSON.parse(productData));
	controller = new Controller();
	productListView = new ProductListView(document.getElementById('product-list'));
	cartView = new CartView(document.getElementById('cart'));

	controller.addItemToCart = aop.afterReturning(
		controller.addItemToCart,
		function(promise) {
			return promise.then(cartView.addItem.bind(cartView));
		});

	productListView.productAdded = aop.afterReturning(
		productListView.productAdded,
		controller.addItemToCart.bind(controller));

	cartView.removeItemById = aop.afterReturning(
		cartView.removeItemById,
		controller.removeItemFromCart.bind(controller));

	cartView.init();
	productListView.init(products);

	window.addEventListener('beforeunload', function() {
		cartView.destroy();
		productListView.destroy();
	});
});