# Connecting your shiz.js with AOP

Brian Cavalier

[cujoJS](http://cujojs.com) co-lead & Spring Javascript @ Pivotal

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

## Where I come from, we call that *programming*

---

# AOP

* controlled - guarantees about *not breaking your stuff*
* non-invasive - without changing the *source code*

---

# AOP

* [cujoJS](http://cujojs.com) - [meld](https://github.com/cujojs/meld)
* [Dojo](http://dojotoolkit.org) - dojo/aspect
* [Flight](http://twitter.github.io/flight/) - flight/advice
* [dcl](https://github.com/uhop/dcl)
* Exists in many other languages/platforms as well, e.g. Spring AOP, AspectJ

---

# Examples

## The required, slightly boring, yet surprisingly illustrative examples

* [Logging](../examples/logging.js)
* [Profiling](../examples/around.js)
* [Memoization](../examples/around.js)

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

## Let's make a simple app

---

![Components](img/components.png)

---

![Connectors](img/connectors.png)

---

# Examples

## Let's build it

* [Hardcoded](../demo-app) - [code](../demo-app/vanilla)
* [Events](../demo-app/#events) - [code](../demo-app/events)
* [Pubsub](../demo-app/#pubsub) - [code](../demo-app/pubsub)

---

![Coupled](img/coupled.png)

---

![Inseparable](img/inseparable.png)

---

![Mess](img/mess.png)

---

# Bad

## Components are either coupled directly to each other, or directly to a connection lib API

* Lots of mocking to unit test
* Components easily break one another
* Adding new components &rarr; changing source code of existing components
* Changing one component may require
	* updating many mocks
	* re-unit testing all components!

---

# Composition plan

## A dedicated place to do application composition

---

![Composition](img/composition.png)

---

# Examples

## Let's re-make it using AOP and composition

* [Simple AOP](../demo-app/#aop-simple) - [code](../demo-app/aop-simple)
* [meld.js AOP](../demo-app/#aop-meld) - [code](../demo-app/aop-meld)

---

# So what?

* Components have no knowledge of each other
	* unit tests are easy, less mocking
* Change the plan w/o changing the components' source
	* no need to re-run unit tests
* Add new behavior to existing applications
	* minimize regressions
* Create a new plan (i.e. app variant) easily
	* build faster

---

# Testing

## What about testing the *composition*?

* We already do this anyway!
	* Functional testing, e.g. Selenium etc.
* Not a complete solution
	* Sometimes a composition represents *only part* of an application.
	* Need test harnesses for this.
	* You'd need them no matter what

---

# Composition

## If we're always connecting components together in similar ways, couldn't we create a *DSL* to do it?

---

# Yes

## Here's our simple app again

* [cujoJS 1](../demo-app/#cujojs-1) (still has a Controller) - [code](demo-app/cujojs-1)
* [cujoJS 2](../demo-app/#cujojs-2) (Controller-less) - [code](demo-app/cujojs-2)

---

# AOP

* Add/modify behavior
* Compose components
* Controlled, non-invasive
* Don't need a lib, but they help!

---

# App Composition

* Separate connection from components
* Make a Composition plan
* Test & refactor components easily
* Reduce collateral damage
* Build faster
