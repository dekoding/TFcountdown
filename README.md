# TFcountdown
## It's the final countdown... you'll ever need!

TFCountdown is a simple countdown timer that's easy to incorporate in any app. Use it to display a countdown and execute callback functions at the completion of the countdown.

Features include:

* Highly accurate.
* Easy-to-use - start, pause, reset, add time, or entirely reinitialize the timer with ease.
* Set any of the timer's parameters at creation, or any time after.
* Supports up to 30 day timers.

Example use:

```javascript
// Create an object of options
const timerOptions = {
    seconds: 30,          // Time in seconds to run the timer for
    container: 'timer',   // ID of the DOM element to place the visible timer in (optional)
    pauseButton: 'pause', // Buttons are the IDs of DOM elements to attach a handler to (optional)
    goButton: 'start',
    resetButton: 'reset'
};
// Initialize the timer
const timer = new Timer(timerOptions);

// And then run it
timer.go();

// Options can be changed on the fly
timer.callback = function() { console.log('This can be done even while the timer is running!'); };

// You can even add time to a running timer. This adds one minute.
timer.addtime(60);

// Timers can be customized to use individual blocks of the clock
const secondTimerOptions = {
    seconds: 259200, // Three days
    daysBlock: 'days-block', // ID of DOM element to place just days in
    hoursBlock: 'hours-block',
    minutesBlock: 'minutes-block',
    secondsBlock: 'seconds-block'
};

// These options are ideal for when you want to track just one block of time, or need to style each component individually
```

NPM package coming soon!
