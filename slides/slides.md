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

* [Logging](examples/logging.js)
* [Profiling](examples/around.js)
* [Memoization](examples/around.js)

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

* [Hardcoded](demo-app) - [code](demo-app/vanilla)
* [Events](demo-app/#events) - [code](demo-app/events)
* [Pubsub](demo-app/#pubsub) - [code](demo-app/pubsub)

---

![Coupled](img/coupled.png)

---

![Inseparable](img/inseparable.png)

---

# Bad

## Components are either coupled directly to each other, or directly to a connection lib API

* Lots of mocking to unit test
* Components can easily break one another
* Adding a new component means changing the source code of existing components
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

* [Simple AOP](demo-app/#aop-simple) - [code](demo-app/aop-simple)
* [meld.js AOP](demo-app/#aop-meld) - [code](demo-app/aop-meld)

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

## If we're always connecting components together in similar ways, couldn't we create a *DSL* to do it?

---

# Yes

## Here's our simple app again

* [cujoJS 1](demo-app/#cujojs-1) (still has a Controller) - [code](demo-app/cujojs-1)
* [cujoJS 2](demo-app/#cujojs-2) (Controller-less) - [code](demo-app/cujojs-2)

---

# TODO

* Need wrap-up slides