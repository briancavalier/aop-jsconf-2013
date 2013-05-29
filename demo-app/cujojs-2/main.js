define({

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

	addingItemAdvice: {
		create: { module: './whilePromiseClassAdvice',
			args: ['adding-to-cart', { $ref: 'dom.first!body' } ]
		}
	},

	itemAddedAdvice: {
		create: { module: './afterPromiseClass',
			args: ['item-added', 2000, { $ref: 'dom.first!body' } ]
		}
	},

	products: {
		create: { module: 'model/Products',
			args: { module: 'data/products' }
		}
	},

	cart: {
		create: 'model/Cart'//,
//		around: {
//			'addItem': 'addingItemAdvice'
//		},
//		afterFulfilling: {
//			'addItem': 'itemAddedAdvice'
//		}
	},

	$plugins: [{ module: 'wire/dom' }, { module: 'wire/aop' }]
});