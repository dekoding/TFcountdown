// Create and initialize a timer by default, with standard controls.
const timerOptions = {
    seconds: 30,
    container: 'timer',
    pauseButton: 'pause',
    goButton: 'start',
    resetButton: 'reset'
};
const timer = new Timer(timerOptions);

// Example function for adding time to the timer via the addtime method
const addTime = function() {
    let h = Math.floor(document.getElementById('add-hours').value * 3600);
    let m = Math.floor(document.getElementById('add-minutes').value * 60);
    let s = Math.floor(document.getElementById('add-seconds').value);
    let seconds = h + m + s;
    timer.addtime(seconds);
}
document.getElementById('add-time').onclick = addTime;

// Example function for changing the timer's starting value and rebuilding it.
const setTime = function() {
    let h = Math.floor(document.getElementById('hours').value * 3600);
    let m = Math.floor(document.getElementById('minutes').value * 60);
    let s = Math.floor(document.getElementById('seconds').value);
    let seconds = h + m + s;

    timer.seconds = seconds;
    timer.reset();
}
document.getElementById('set-time').onclick = setTime;

// Example function for adding a callback after the timer is initialized and running
document.getElementById('set-callback').onclick = function() {
    const message = document.getElementById('callback-message').value;
    timer.callback = () => alert(message);
};
