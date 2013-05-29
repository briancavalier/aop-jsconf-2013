define({
	// Create a controller, productListView, and cartView
	// using declarative AOP to compose them together

	productListView: {
		create: { module: '../aop-simple/ProductListView',
			args: { $ref: 'dom!product-list' }
		},
		afterReturning: {
			'productAdded': 'cart.addItem'
		},
		ready: {
			init: { $ref: 'products' }
		}
	},

	cartView: {
		create: { module: '../aop-simple/CartView',
			args: { $ref: 'dom!cart' }
		},
		afterFulfilling: {
			'cart.addItem': 'addItem',
			'removeItemById': 'cart.removeItem'
		},
		ready: 'init'
	},

	// Create the products and cart models

	products: {
		create: { module: 'model/Products',
			args: { module: 'data/products' }
		}
	},

	cart: {
		create: 'model/Cart',
		// Add some new functionality via AOP
		// We can even add async Promise-aware advice!
		around: {
			'addItem': 'addingItemAdvice'
		},
		afterFulfilling: {
			'addItem': 'itemAddedAdvice'
		}
	},

	// New functionality we can add via advice above
	addingItemAdvice: {
		create: { module: './whilePromiseClassAdvice',
			args: ['adding-to-cart', { $ref: 'dom.first!body' } ]
		}
	},

	itemAddedAdvice: {
		create: { module: './afterDelayedClass',
			args: ['item-added', 2000, { $ref: 'dom.first!body' } ]
		}
	},


	$plugins: [{ module: 'wire/dom' }, { module: 'wire/aop' }]
});