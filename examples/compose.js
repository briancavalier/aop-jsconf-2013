var meld, simple, section, Thing, thing;

meld = require('meld');
simple = require('../src/aop-simple');
section = require('./lib/format').section;
Thing = require('./lib/Thing');

thing = new Thing();
thing.doStuff = simple.around(simple.before(simple.after(thing.doStuff, after), before), aroundSimple);
thing.doStuff(1);

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

