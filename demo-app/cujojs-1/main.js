define({
	// Create a controller, productListView, and cartView
	// using declarative AOP to compose them together

	controller: {
		create: '../aop-simple/Controller',
		ready: {
			init: { $ref: 'cart' }
		},
		afterFulfilling: {
			'addItemToCart': 'cartView.addItem'
		}
	},

	productListView: {
		create: { module: '../aop-simple/ProductListView',
			args: { $ref: 'dom!product-list' }
		},
		afterReturning: {
			'productAdded': 'controller.addItemToCart'
		},
		ready: {
			init: { $ref: 'products' }
		}
	},

	cartView: {
		create: { module: '../aop-simple/CartView',
			args: { $ref: 'dom!cart' }
		},
		afterReturning: {
			'removeItemById': 'controller.removeItemFromCart'
		},
		ready: 'init'
	},

	// Create the products and cart models

	products: {
		create: { module: 'model/Products',
			args: { module: 'data/products' }
		}
	},

	cart: { create: 'model/Cart' },

	$plugins: [{ module: 'wire/dom' }, { module: 'wire/aop' }]
});