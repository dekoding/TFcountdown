var Timer = function(options, callback) {
    let obj = {};

    obj.init = function() {
        /*
            Parameters can be passed at creation or assigned later. When we initialize the timer,
            we preference those assigned later.
        */

        obj.seconds = (this.seconds != null ? this.seconds : (options.seconds != null ? options.seconds : null));
        obj.pauseButton = (this.pauseButton != null ? this.pauseButton : (options.pauseButton != null ? options.pauseButton : null));
        obj.goButton = (this.goButton != null ? this.goButton : (options.goButton != null ? options.goButton : null));
        obj.resetButton = (this.resetButton != null ? this.resetButton : (options.resetButton != null ? options.resetButton : null));

        obj.callback = (this.callback != null ? this.callback : (callback != null ? callback : null));

        // Timer core
        if(obj.seconds != null) {
            let startTime;
            let timer;
            let ms = obj.seconds*1000
            let now;
            let resetMs = ms;

            obj.go = function() {
                startTime = new Date().getTime();
                timer = setInterval(obj.iterate,250);
            };
            obj.pause = function() {
                ms = obj.iterate();
                clearInterval(timer);
            };
            obj.reset = function() {
            	ms = resetMs;
                clearInterval(timer);
                obj.settime('reset');
            };
            obj.addtime = function(time) {
            	ms = obj.iterate() + (time * 1000);
                obj.go();
            };
            obj.gettime = function() {
                return Math.floor(now / 1000);
            }
            obj.settime = function(reset) {
                if(!startTime || reset != null) {
                    startTime = new Date().getTime();
                    clearInterval(timer);
                }
                now = Math.max(0,ms-(new Date().getTime()-startTime));

                // Allows you to start without a container, or change the container.
                obj.container = (this.container != null ? this.container : (options.container != null ? options.container : null));
                if(obj.container != null) {

                    let delta = now / 1000;

                    let h = Math.floor(delta / 3600) % 24;
                    delta -= h * 3600;
                    h = (h < 10 ? "0" : "") + h;

                    let m = Math.floor(delta / 60) % 60;
                    delta -= m * 60;
                    m = (m < 10 ? "0" : "") + m;

                    let s = Math.floor(delta % 60);
                    s = (s < 10 ? "0" : "") + s;

                    let clock = '<span>' + h + ':' + m + ':' + s + '</span>';
                    if(document.getElementById(obj.container).innerHTML != clock) document.getElementById(obj.container).innerHTML = clock;
                }
            }
            obj.iterate = function() {
                obj.settime();
                if(Math.floor(now) == 0) {
                    clearInterval(timer);
                    // This allows changing the callback function on the fly!
                    obj.callback = (this.callback != null ? this.callback : (obj.callback != null ? obj.callback : null));
                    if(obj.callback != null) {
                        obj.callback();
                    }
                } else {
                    return now;
                }
            };
            obj.settime();

            // Timer controls
            if(obj.pauseButton != null) document.getElementById(obj.pauseButton).onclick = obj.pause;
            if(obj.goButton != null) document.getElementById(obj.goButton).onclick = obj.go;
            if(obj.resetButton != null) document.getElementById(obj.resetButton).onclick = obj.reset;
        }
        else {
            throw "error: Cannot initialize timer without seconds defined."
        }
    }
    return obj;
};
