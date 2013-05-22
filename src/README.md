This is a very simple (read: naive), but still quite useful, AOP implementation.

## Cool stuff

1. It's only about 50 lines of JS for before, afterReturning, afterThrowing, after, and around advices.
2. The advices compose easily.

## Limitations

There are things this implementation doesn't do well or doesn't account for:

1. It creates deep stacks for all advice types.  meld.js uses trampolines to execute all advice types except `around`, so stacks stay shallow.
2. There is no explicit way to "remove" advice.  You can simply throw away the advised function and start using the original again to "remove".  meld.js provides an API for removing advices, even in a different order than they were added, i.e. you can "yank" an advice, even around advice, out of the middle of an advice chain, leaving all others intact.
3. There is no codified notion of a *joinpoint*, and thus no way to do more sophisticated things that may require access to a joinpoint.  meld.js provides a joinpoint, and an API for accessing the current joinpoint from within any advice.
4. It doesn't handle advising constructors.  meld.js can advice constructors, correctly preserving prototypes and `instanceof`