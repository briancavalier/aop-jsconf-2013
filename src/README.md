This is a very simple (read: naive), but still useful AOP implementation.

## Limitations

There are things this implementation doesn't do well or doesn't account for:

1. It creates deep stacks for all advice types.  In contrast, meld.js uses trampolines to execute all advice types except `around`, so stacks stay shallow.
2. There is no explicit way to "remove" advice.  You can simply throw away the advised function and start using the original again to "remove".
3. There is no codified notion of a *joinpoint*, and thus no way to do more sophisticated things that may require access to a joinpoint.