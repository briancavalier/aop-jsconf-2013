var meld, simple, section, thing;

meld = require('meld');
simple = require('../src/aop-simple');
section = require('./format').section;

function Thing() {}

Thing.prototype = {
	doStuff: function(x) {
		return x + 1;
	}
};

//-------------------------------------------------------------
section([
	'Our simple AOP lib can compose advices easily.  However, they',
	'stack a bit differently than traditional AOP.  That\'s fine.',
	'Use whatever works for you as long as you recognize the differences'
]);

thing = new Thing();
thing.doStuff = simple.around(simple.before(simple.after(thing.doStuff, after), before), aroundSimple);
thing.doStuff(1);

//-------------------------------------------------------------
section([
	'meld.js advices also stack easily and predictably.  Notice here',
	'that before advice is always executed first, and after advice is',
	'always executed last, even though around advice is applied later'
]);

thing = new Thing();
meld.after (thing, 'doStuff', after);
meld.before(thing, 'doStuff', before);
meld.around(thing, 'doStuff', aroundMeld);
thing.doStuff(1);

function before() {
	console.log('before');
}

function after() {
	console.log('after');
}

function aroundSimple(f, args) {
	console.log('around 1');
	try {
		return f.apply(this, args);
	} finally {
		console.log('around 2');
	}
}

function aroundMeld(joinpoint) {
	console.log('around 1');
	try {
		return joinpoint.proceed();
	} finally {
		console.log('around 2');
	}
}

