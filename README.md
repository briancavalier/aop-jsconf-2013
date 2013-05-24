Slides and code for [Connecting your shiz.js with AOP](http://2013.jsconf.us/schedule) @ [JSConf 2013](http://2013.jsconf.us)

---

# Connecting your shiz.js with AOP

Brian Cavalier, cujoJS co-lead & Spring Javascript @ Pivotal
[@briancavalier](http://twitter.com/briancavalier)
[blog](http://blog.briancavalier.com)

---

# AOP

* Aspect Oriented Programming
* Application Composition

---

# AOP

## *What* Oriented Programming?

What's an aspect?

---

## Notes

1. Connections
1. Less flexible connections
	1. Hardcoded examples
	1. Event emitter examples
	1. Pubsub examples
1. Ideal
	* Components have no knowledge of each other
	* Can be tested and refactored independently
1. Intro to AOP
1. Simple AOP lib and examples
1. Connection examples
1. Transforming/adapting data
	1. Hardcoded approaches require even more hardcoding, making testing and refactoring even more difficult.  Components can't be adapted to new situations as easily
	1. AOP allows data transformations to happen *between* components, that is, along the line between two boxes.
1. Examples
1. Declarative AOP w/wire and meld
	1. TodoMVC
	2. Monty Hall?