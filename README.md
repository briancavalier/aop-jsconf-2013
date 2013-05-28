Slides and code for [Connecting your shiz.js with AOP](http://2013.jsconf.us/schedule) @ [JSConf 2013](http://2013.jsconf.us)

---

# Connecting your shiz.js with AOP

Brian Cavalier, cujoJS co-lead & Spring Javascript @ Pivotal
[@briancavalier](http://twitter.com/briancavalier)
[blog](http://blog.briancavalier.com)

---

# Two things

* AOP
* Application Composition

---

# AOP

## Aspect Oriented Programming

---

# AOP

* *What* Oriented Programming?
* What's an aspect?
* Awesome, I came to JSConf to learn more TLAs

---

# AOP

* Aspect: Some encapsulated unit of behavior
* AOP: Technique for composing units of behavior

---

# Um

## Where I come from, we call that "programming"

---

# AOP

## Technique for composing units of behavior

* controlled
* non-invasive

---

# AOP

* controlled - guarantees about *not breaking your stuff*
* non-invasive - without changing the *source code*

---

# Examples

The required, slightly boring, yet surprisingly illustrative examples

* Logging
* Profiling
* Memoization

---

# Neato, but yawn

## Users don't actually care about logging, so if that's all we could do, this would lame

---

# What if

## we could use this kind of approach to connect more interesting things together?

* Views
* Controllers
* Models
* *Any* application component

---

# Application Composition

## Connecting application components together to make a particular application

* Now *that* sounds useful
* It also sounds a lot like AOP: "composing units of behavior"

---

# Examples

## Let's make a real app, times 5

---

# Composition plan

## A dedicated place to do application composition

---

# So what?

* Components have no knowledge of each other
	* unit tests are easy, less mocking
* Can change the plan without changing the components' source
	* don't need to re-run unit test
* Can add new behavior to existing applications
	* minimize regressions
* Can create a new plan (i.e. application variant) without changing source
	* build faster

---

# Composition

If we're always connecting components together in similar ways, couldn't we create a *DSL* to do it?

---

# Yes

## Here's an example

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

1. Other libs
	* Dojo: dojo/aspect
	* Flight: flight/advice
	* dcl https://github.com/uhop/dcl