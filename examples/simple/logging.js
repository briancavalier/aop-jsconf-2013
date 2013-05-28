var aop, section, thing, result, slice, origDoStuff, logger, loggingEnabled;

section = require('../format').section;
slice = Function.prototype.call.bind([].slice);

//-------------------------------------------------------------
// A Thing constructor we'll use in all the examples

function Thing() {}

Thing.prototype = {
	doStuff: function(x) {
		if(x < 0) {
			throw new Error('dont\'t be so negative');
		}
		return x + 1;
	}
};

// Save this so we can replace it for some examples
origDoStuff = Thing.prototype.doStuff;

//-------------------------------------------------------------
section([
	'What if we want to debug a Thing by logging it\'s parameters,',
	'return value, and any exceptions that it throws?'
]);

Thing.prototype.doStuff = function(x) {
	console.log('called with', slice(arguments));

	var result;
	if(x < 0) {
		result = new Error('dont\'t be so negative');
		console.log('threw', result);
		throw result;
	}

	result = x + 1;
	console.log('result', result);
	return result;
};

thing = new Thing();

thing.doStuff(1);

try {
	result = thing.doStuff(-1);
} catch(e) {}

thing.doStuff(1, 2, 3, 4);

// ===================================================================
// What if we want to debug a Thing by logging it's parameters,
// return value, and any exceptions that it throws?
// ...................................................................
// called with [ 1 ]
// result 2
// called with [ -1 ]
// threw [Error: dont't be so negative]
// called with [ 1, 2, 3, 4 ]
// result 2


//-------------------------------------------------------------
// Ok, that was lame, let's start over and try again

Thing.prototype.doStuff = origDoStuff;

//-------------------------------------------------------------
section([
	'That works, but is LAME!',
	'Why should we have to modify the SOURCE CODE of Thing to debug it??',
	'We could also do it manually at the point of call, but then we',
	'have to do it EVERYWHERE we call thing.doStuff'
]);

thing = new Thing();

try {
	console.log('called with', 1);
	result = thing.doStuff(1);
	console.log('returned', result);
} catch(e) {
	console.log('threw', e);
}

// ===================================================================
// That works, but is LAME!
// Why should we have to modify the SOURCE CODE of Thing to debug it??
// We could also do it manually at the point of call, but then we
// have to do it EVERYWHERE we call thing.doStuff
// ...................................................................
// called with 1
// returned 2

//-------------------------------------------------------------
section([
	'Also LAME :/',
	'Let\'s try AOP!  After we create thing, we can "advise" its doStuff',
	'method. Then we can give out thing to clients as usual, and they',
	'can\'t tell the difference--except that now thing.doStuff will',
	'always log it\'s arguments',
]);

thing = new Thing();

// Do something before the original doStuff
origDoStuff = Thing.prototype.doStuff;
thing.doStuff = function(x) {
	console.log('called with', x);
	return origDoStuff.call(this, x);
};

thing.doStuff(1);

// Also do something with the return value, after it returns
var tmpDoStuff1 = thing.doStuff;
thing.doStuff = function(x) {
	var result = tmpDoStuff1.call(this, x);
	console.log('returned', result);
};

thing.doStuff(1);

// And also do something if it throws
var tmpDoStuff2 = thing.doStuff;
thing.doStuff = function(x) {
	try {
		return tmpDoStuff2.call(this, x);
	} catch(e) {
		console.log('threw', e);
		throw e;
	}
};

thing.doStuff(1);

try {
	thing.doStuff(-1);
} catch(e) { /* let's just keep node from crashing, shall we? */}

// ===================================================================
// Also LAME :/
// Let's try AOP!  After we create thing, we can "advise" its doStuff
// method. Then we can give out thing to clients as usual, and they
// can't tell the difference--except that now thing.doStuff will
// always log it's arguments
// ...................................................................
// called with 1
// called with 1
// returned 2
// called with 1
// returned 2
// called with -1
// threw [Error: dont't be so negative]

//-------------------------------------------------------------
section([
	'Now that we have some interesting patterns, we can package',
	'them up and reuse them. Here\'s a simple AOP lib in about',
	'50 lines of JS.'
]);

//-------------------------------------------------------------
// Our simple AOP library

aop = require('../../src/aop-simple');

thing = new Thing();

thing.doStuff = aop.before(thing.doStuff, console.log.bind(console, 'called with'));
result = thing.doStuff(1);

// ===================================================================
// Now that we have some interesting patterns, we can package
// them up and reuse them. Here's a simple AOP lib in about
// 50 lines of JS.
// ...................................................................
// called with 1

//-------------------------------------------------------------
section([
	'Cool, but we still need to log the return value',
	'Never fear, AOP advices "stack" in sensible ways',
	'Let\'s log the return value, too'
]);

thing.doStuff = aop.afterReturning(thing.doStuff, console.log.bind(console, 'returned'));
result = thing.doStuff(1);

// ===================================================================
// Cool, but we still need to log the return value
// Never fear, AOP advices "stack" in sensible ways
// Let's log the return value, too
// ...................................................................
// called with 1
// returned 2

//-------------------------------------------------------------
section([
	'But what about exceptions?',
	'We can use afterThrowing advice to log those, as well.'
]);

thing.doStuff = aop.afterThrowing(thing.doStuff, console.log.bind(console, 'threw'));
try {
	result = thing.doStuff(-1);
} catch(e) { /* let's just keep node from crashing, shall we? */}

// ===================================================================
// But what about exceptions?
// We can use afterThrowing advice to log those, as well.
// ...................................................................
// called with -1
// threw [Error: dont't be so negative]

//-------------------------------------------------------------
// Notice that the advice was able to OBSERVE the exception, but
// not PREVENT it.  This can be very useful, as in the case of logging,
// but can also be limiting.  For such cases, there is "around" advice
// which can change the outcome of a function call or even prevent
// the function from being executed at all.  We'll see that later.

//-------------------------------------------------------------
section([
	'We can wrap this up in an "aspect" -- a more interesting',
	'"behavior" that we can add to any function'
]);

function addLogging(target) {
	return aop.afterThrowing(
		aop.afterReturning(
			aop.before(target,
				console.log.bind(console, 'called with')),
			console.log.bind(console, 'returned')),
		console.log.bind(console, 'threw'));
}

thing = new Thing();

thing.doStuff = addLogging(thing.doStuff);

thing.doStuff(1);

try {
	result = thing.doStuff(-1);
} catch(e) {}

thing.doStuff(1, 2, 3, 4);

// ===================================================================
// We can wrap this up in an "aspect" -- a more interesting
// "behavior" that we can add to any function
// ...................................................................
// called with 1
// returned 2
// called with -1
// threw [Error: dont't be so negative]
// called with 1 2 3 4
// returned 2

//-------------------------------------------------------------
section([
	'What if we want to log All The Things?',
	'We can apply our aspect to Thing.prototype'
]);

Thing.prototype.doStuff = addLogging(Thing.prototype.doStuff);

thing = new Thing();

thing.doStuff(1);

try {
	result = thing.doStuff(-1);
} catch(e) {}

thing.doStuff(1, 2, 3, 4);

// ===================================================================
// What if we want to log All The Things?
// We can apply our aspect to Thing.prototype
// ...................................................................
// called with 1
// returned 2
// called with -1
// threw [Error: dont't be so negative]
// called with 1 2 3 4
// returned 2

//-------------------------------------------------------------
section([
	'We can even represent constraints as advice'
]);

origDoStuff = Thing.prototype.doStuff = function(x) {
	return x + 1;
};

function checkArg(x) {
	if(x < 0) {
		throw new Error('dont\'t be so negative');
	}
}

Thing.prototype.doStuff = aop.before(Thing.prototype.doStuff, checkArg);
Thing.prototype.doStuff = addLogging(Thing.prototype.doStuff);

thing = new Thing();

thing.doStuff(1);

try {
	result = thing.doStuff(-1);
} catch(e) {}

thing.doStuff(1, 2, 3, 4);

// ===================================================================
// We can even represent constraints as advice
// ...................................................................
// called with 1
// returned 2
// called with -1
// threw [Error: dont't be so negative]
// called with 1 2 3 4
// returned 2

// reset
Thing.prototype.doStuff = origDoStuff;

//-------------------------------------------------------------
section([
	'And add additional constraints!'
]);

function checkArgMore(x) {
	if(x > 11) {
		throw new Error('this one goes to 11, but that\'s all my friend');
	}
}

function addConstraints(target) {
	return aop.before(aop.before(target, checkArg), checkArgMore);
}

Thing.prototype.doStuff = addLogging(addConstraints(Thing.prototype.doStuff));

thing = new Thing();

thing.doStuff(1);

try {
	result = thing.doStuff(-1);
} catch(e) {}

thing.doStuff(11);

try {
	result = thing.doStuff(12);
} catch(e) {}

// ===================================================================
// And add additional constraints!
// ...................................................................
// called with 1
// returned 2
// called with -1
// threw [Error: dont't be so negative]
// called with 11
// returned 12
// called with 12
// threw [Error: this one goes to 11, but that's all my friend]

// reset
Thing.prototype.doStuff = origDoStuff;

//-------------------------------------------------------------
section([
	'There\'s no reason we have to use console. We could use',
	'our own Logger component.  Now we\'re starting to do',
	'something a bit more interesting: compose together our',
	'own components using AOP without changing the source',
	'code of either component'
]);

function Logger() {}

Logger.prototype = {
	log: function() {
		var args = ['LOG:', new Date()].concat(slice(arguments));
		console.log.apply(console, args);
	},
	error: function() {
		var args = ['ERROR! Go wake the devs!', new Date()].concat(slice(arguments))
		console.error.apply(console, args);
	}
}

logger = new Logger();
loggingEnabled = true;

function addLogger(target) {
	if(loggingEnabled) {
		var log, error;

		log = logger.log.bind(logger);
		error = logger.error.bind(logger);

		return aop.afterThrowing(aop.afterReturning(aop.before(target, log), log), error);
	} else {
		return target;
	}
}

Thing.prototype.doStuff = addLogger(addConstraints(Thing.prototype.doStuff));

thing = new Thing();

thing.doStuff(1);

try {
	result = thing.doStuff(-1);
} catch(e) {}

// ===================================================================
// There's no reason we have to use console. We could use
// our own Logger component.  Now we're starting to do
// something a bit more interesting: compose together our
// own components using AOP without changing the source
// code of either component
// ...................................................................
// LOG: Tue May 28 2013 11:10:37 GMT-0400 (EDT) 1
// LOG: Tue May 28 2013 11:10:37 GMT-0400 (EDT) 2
// LOG: Tue May 28 2013 11:10:37 GMT-0400 (EDT) -1
// ERROR! Go wake the devs! Tue May 28 2013 11:10:37 GMT-0400 (EDT) [Error: dont't be so negative]
