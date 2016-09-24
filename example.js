// Create and initialize a timer by default, with standard controls.
var timerOptions = {
    seconds: 30,
    container: 'timer',
    pauseButton: 'pause',
    goButton: 'start',
    resetButton: 'reset'
};
var timer = new Timer(timerOptions);
timer.init();

// Example function for adding time to the timer via the addtime method
var addTime = function() {
    let h = Math.floor(document.getElementById('add-hours').value * 3600);
    let m = Math.floor(document.getElementById('add-minutes').value * 60);
    let s = Math.floor(document.getElementById('add-seconds').value);
    let seconds = h + m + s;
    timer.addtime(seconds);
}
document.getElementById('add-time').onclick = addTime;

// Example function for changing the timer's starting value and rebuilding it.
var setTime = function() {
    let h = Math.floor(document.getElementById('hours').value * 3600);
    let m = Math.floor(document.getElementById('minutes').value * 60);
    let s = Math.floor(document.getElementById('seconds').value);
    let seconds = h + m + s;

    timer.reset();
    timer.seconds = seconds;
    timer.init();
}

document.getElementById('set-time').onclick = setTime;

// Example function for adding a callback after the timer is initialized and running
document.getElementById('set-callback').onclick = function() { timer.callback = function() { alert("This is a callback!"); }; };
