var meld, simple, section, Thing, AdvisedThing

meld = require('meld');
simple = require('../src/aop-simple');
section = require('./lib/format').section;
Thing = require('./lib/Thing');

section([
	'Our simple AOP lib doesn\'t handle less common cases, like',
	'advising constructors.'
])
AdvisedThing = simple.before(Thing, function() { console.log('Calling simple-advised constructor'); });

thing = new AdvisedThing();
console.log('thing instanceof Thing:', thing instanceof Thing);
console.log('thing has Thing prototype:', typeof thing.doStuff === 'function');

section([
	'meld.js handles advising constructors, preserving prototypes',
	'and instanceof'
]);
AdvisedThing = meld.before(Thing, function() { console.log('Calling meld-advised constructor'); });

thing = new AdvisedThing();
console.log('thing instanceof Thing:', thing instanceof Thing);
console.log('thing has Thing prototype:', typeof thing.doStuff === 'function');
