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

	products: {
		create: { module: 'model/Products',
			args: { module: 'data/products' }
		}
	},

	cart: { create: 'model/Cart' },

	$plugins: [{ module: 'wire/dom' }, { module: 'wire/aop' }]
});