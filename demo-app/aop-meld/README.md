# meld.js

This implementation uses AOP via meld.js to connect components together.  Note that it uses the *same* Controller and Views as the aop-simple implementation.  Because we've moved the responsibility of composition out of the components themselves, the components become more easily reusable.

We can change the composition mechanism itself without changing the components!