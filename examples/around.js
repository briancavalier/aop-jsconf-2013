var aop, section, result, slice, fib;

section = require('./format').section;
slice = Function.prototype.call.bind([].slice);

//-------------------------------------------------------------
// Our simple AOP library

aop = require('../src/aop-simple');

function fibonacci(n) {
	return n === 0 ? 0
		: n === 1 ? 1
		: fibonacci(n-1) + fibonacci(n - 2);
}

//-------------------------------------------------------------
section([
	'Yay, fibonacci, everyone\'s fav',
	'But wait, we can\'t see it doing anything. We won\'t see',
	'any output here, since finbonacci() just computes and',
	'returns the value'
]);

fibonacci(0);
fibonacci(1);
fibonacci(2);
fibonacci(3);
fibonacci(4);
fibonacci(5);

// ===================================================================
// Yay, fibonacci, everyone's fav
// But wait, we can't see it doing anything. We won't see
// any output here, since finbonacci() just computes and
// returns the value
// ...................................................................

//-------------------------------------------------------------
section([
	'Let\'s add some simple logging, so we can see it'
]);

fib = aop.afterReturning(fibonacci, console.log.bind(console));

fib(0);
fib(1);
fib(2);
fib(3);
fib(4);
fib(5);

// ===================================================================
// Let's add some simple logging, so we can see it
// ...................................................................
// 0
// 1
// 1
// 2
// 3
// 5

//-------------------------------------------------------------
section([
	'That\'s better, but it\'d be nicer if we could see the input',
	'and the output.  Around advice can do that.'
]);

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

// ===================================================================
// That's better, but it'd be nicer if we could see the input
// and the output.  Around advice can do that.
// ...................................................................
// f(0) -> 0
// f(1) -> 1
// f(2) -> 1
// f(3) -> 2
// f(4) -> 3
// f(5) -> 5

//-------------------------------------------------------------
section([
	'Cool, and now we can wrap that up into a prettyPrint "aspect"'
]);

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

// ===================================================================
// Cool, and now we can wrap that up into a prettyPrint "aspect"
// ...................................................................
// f(0) -> 0
// f(1) -> 1
// f(2) -> 1
// f(3) -> 2
// f(4) -> 3
// f(5) -> 5

//-------------------------------------------------------------
section([
	'Fibonacci is computationally intensive, so let\'s profile it',
	'to see how it behaves with bigger inputs, and since we already',
	'have a prettyPrint aspect, let\'s keep using that, too'
]);


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

// ===================================================================
// Fibonacci is computationally intensive, so let's profile it
// to see how it behaves with bigger inputs, and since we already
// have a prettyPrint aspect, let's keep using that, too
// ...................................................................
// elapsed: 0 ms
// f(10) -> 55
// elapsed: 1 ms
// f(20) -> 6765
// elapsed: 15 ms
// f(30) -> 832040
// elapsed: 1795 ms
// f(40) -> 102334155

//-------------------------------------------------------------
section([
	'Wow, things get brutal around 40.  Let\'s memoize it so we',
	'only pay that cost once.  We can stack prettyPrint and profiling',
	'with memoization too.',
	'Pretty printed, profiled, memoized fibonacci, here we go:'
]);

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

// ===================================================================
// Wow, things get brutal around 40.  Let's memoize it so we
// only pay that cost once.  We can stack prettyPrint and profiling
// with memoization too.
// Pretty printed, profiled, memoized fibonacci, here we go:
// ...................................................................
// elapsed: 1823 ms
// f(40) -> 102334155
// elapsed: 0 ms
// f(40) -> 102334155
// elapsed: 0 ms
// f(40) -> 102334155
