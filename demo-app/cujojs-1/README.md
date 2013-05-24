# cujoJS Implementation 1

This implementation uses AOP via cujoJS's declarative application composition.  Notice that main.js is a "composition plan", aka "wire spec", which cujoJS's wire.js processes and composes together a running application.  It allows declarative AOP via the wire/aop plugin (which uses meld.js as its AOP engine), and even supports *promise-aware* AOP: Note the new `afterFulfilling` advice type, which takes care of the promise-handling details.

We can change the composition mechanism itself without changing the components!