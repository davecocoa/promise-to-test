promise-to-test
===============

Simple set of utils for making async tests more sane using promises.

## Reasoning
I found myself writing some really awful code because I wanted to wait for something to happen, but I did not want to hook into the particular methods causing it. I.e., I wanted my test to act like a user, just keep checking and give up after a certain amount of time. It looked like this :
```js
var it = setInterval(function(){
  if($('myCondition').length>0) {
    clearInterval(it)

    // carry on testing

    done()
  }
}, 10)
```
This didn't make me happy, and it was actually nested two or three levels deep, which I'll let you imagine. Apart from aesthetics, this approach also doesn't give much information when it *does* time out, and we're abandoning all the lovely assertion techniques at our disposal for the condition.

If we rewrite this code using my new tools (ok, just waitFor), it looks like this :
```js
waitFor(function(){
  assert.ok($('myCondition').length>0)
})
.then(function(){
  // carry on testing
})
.then(function(){done()}, done)
```
So this is actually a similar amount of code, but...
 * code reads chronologically top to bottom
 * we use a real assertion and pass an assertion error on failure
 * nesting / waiting again will not bother me at all, things will extend downward, not rightward

## API
### `waitFor(condition, timeout, frequency)`
 * `condition` : a function using assertions to test for something
 * `timeout` : optional, the amount of time to wait before failing, defaults to 1000 milliseconds
 * `frequency` : optional, the amount of time to wait before checking again, defaults to 10 milliseconds
Runs the `condition` function every `frequency` milliseconds until either `condition` runs without errors *or* `timeout` milliseconds have passed. Returns a promise that resolves if `condition` runs without errors and rejects with the last error thrown by `condition` if `timeout` is reached.

### `justWait(timeout)`
 * `timeout` : the amount of time to wait for (duh)
Returns a promise which will resolve in `timeout` milliseconds.
