var aop, section, result, slice, fib;

section = require('../lib/format').section;
slice = Function.prototype.call.bind([].slice);

//-------------------------------------------------------------
// Our simple AOP library

aop = require('../../src/aop-simple');

function fibonacci(n) {
	return n === 0 ? 0
		: n === 1 ? 1
		: fibonacci(n-1) + fibonacci(n - 2);
}

fib = aop.afterReturning(fibonacci, console.log.bind(console));

fib(0);
fib(1);
fib(2);
fib(3);
fib(4);
fib(5);

fib = aop.around(fibonacci, function(orig, args) {
	var result = orig.apply(this, args);

	console.log('f(' + args[0] + ') -> ' + result);

	return result;
});

fib(0);
fib(1);
fib(2);
fib(3);
fib(4);
fib(5);

function prettyPrint(f) {
	return aop.around(f, function(orig, args) {
		var result = orig.apply(this, args);

		console.log('f(' + args[0] + ') -> ' + result);

		return result;
	});
}

fib = prettyPrint(fibonacci);

fib(0);
fib(1);
fib(2);
fib(3);
fib(4);
fib(5);

function profile(f) {
	return aop.around(f, function(orig, args) {
		var start = Date.now();
		try {
			return orig.apply(this, args);
		} finally {
			console.log('elapsed:', Date.now() - start, 'ms');
		}
	});
}

fib = prettyPrint(profile(fibonacci));

fib(10);
fib(20);
fib(30);
fib(40);

function memoize(f) {
	var cache = {};
	return aop.around(f, function(orig, args) {
		var arg, result;

		arg = args[0];

		if(arg in cache) {
			result = cache[arg];
		} else {
			result = orig.apply(this, args);
			cache[arg] = result;
		}

		return result;
	});
}

fib = prettyPrint(profile(memoize(fibonacci)));

fib(40);
fib(40);
fib(40);
