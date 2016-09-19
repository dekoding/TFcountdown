# TFcountdown
## It's the final countdown... you'll ever need!

TFCountdown is a simple countdown timer that's easy to incorporate in any app. Use it to display a countdown and execute callback functions at the completion of the countdown.

Features include:

* Highly accurate
* Easy-to-use - start, pause, reset, add time, or entirely reinitialize the timer with ease.
* Set any of the timer's parameters at creation, or any time after.

Example use:

```javascript
var timerOptions = {
    seconds: 30,          // Time in seconds to run the timer for
    container: 'timer',   // ID of the DOM element to place the timer in
    pauseButton: 'pause', // Buttons are DOM elements to attach a handler to
    goButton: 'start',
    resetButton: 'reset'
};
var timer = new Timer(timerOptions);

// When the timer's parameters are right, initialize it.
timer.init();

// And then run it
timer.go();

// Options can be changed on the fly
timer.callback = function() { console.log("This can be done even while the timer is running!"); };

// You can even add time to a running timer. This adds one minute.
timer.addtime(60);

```
