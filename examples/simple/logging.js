var aop, section, Thing, thing, result, slice, origDoStuff;

section = require('../lib/format').section;
slice = Function.prototype.call.bind([].slice);

//-------------------------------------------------------------
// Our simple AOP library

aop = require('../../src/aop-simple');

//-------------------------------------------------------------
// A Thing constructor we'll use in all the examples

Thing = require('../lib/Thing');

//-------------------------------------------------------------
section([
	'What if we want to debug a Thing by logging it\'s parameters,',
	'return value, and any exceptions that it throws?'
]);

origDoStuff = Thing.prototype.doStuff;

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

//-------------------------------------------------------------
section([
	'Almost as lame :/',
	'Let\'s try AOP!  After we create thing, we can "advise" its doStuff',
	'method. Then we can give out thing to clients as usual, and they',
	'can\'t tell the difference--except that now thing.doStuff will',
	'always log it\'s arguments',
]);

thing.doStuff = aop.before(thing.doStuff, console.log.bind(console, 'called with'));
result = thing.doStuff(1);
console.log('returned', result);


//-------------------------------------------------------------
section([
	'Cool, but we still need to log the return value',
	'Never fear, AOP advices "stack" in sensible ways',
	'Let\'s log the return value, too'
]);

thing.doStuff = aop.afterReturning(thing.doStuff, console.log.bind(console, 'returned'));
result = thing.doStuff(1);


//-------------------------------------------------------------
section([
	'But what about exceptions?',
	'We can use afterThrowing advice to log those, as well.'
]);

thing.doStuff = aop.afterThrowing(thing.doStuff, console.log.bind(console, 'threw'));
try {
	result = thing.doStuff(-1);
} catch(e) { /* let's just keep node from crashing, shall we? */}

// Notice that the advice was able to OBSERVE the exception, but
// not PREVENT it.  This can be very useful, as in the case of logging,
// but can also be limiting.  For such cases, there is "around" advice
// which can change the outcome of a function call or even prevent
// the function from being executed at all.  We'll see that later.

//-------------------------------------------------------------
section([
	'We can wrap this up in an "aspect" -- a complex "behavior"',
	'that we can add to any function'
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

//-------------------------------------------------------------
section([
	'What if we want to log All The Things?',
	'We can advise Thing.prototype'
]);

Thing.prototype.doStuff = addLogging(Thing.prototype.doStuff);

thing = new Thing();

thing.doStuff(1);

try {
	result = thing.doStuff(-1);
} catch(e) {}

thing.doStuff(1, 2, 3, 4);

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

//-------------------------------------------------------------
section([
	'And add additional constraints!'
]);

Thing.prototype.doStuff = origDoStuff;

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

