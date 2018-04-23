const Timer = function(options, callback) {
    let startTime;
    let timer;
    let ms = options.seconds !== null ? options.seconds * 1000 : 0;
    let now;
    
    let running = false;
    let paused = false;
    
    if (ms === 0) {
        console.error('Cannot initialize timer without seconds defined.');
        return;
    }

    let obj = {
        self: this,
        seconds: options.seconds !== null ? options.seconds : null,
        container: options.container !== null ? options.container : null,
        callback: options.callback !== null ? options.callback : null,
        
        go() {
            startTime = new Date().getTime();
            timer = setInterval(obj.iterate,250);
            running = true;
        },
        
        pause() {
            if (running && !paused) {
                clearInterval(timer);
                ms = obj.iterate();
                paused = true;
            } else if (running && paused) {
                paused = false;
                obj.go();
            } else {} // If it hasn't been started, it can't be paused
        },
        
        reset() {
            clearInterval(timer);
            ms = obj.seconds * 1000;
            startTime = new Date().getTime();
            running = false;
            paused = false;
            obj.setRemaining();
        },
        
        addtime(time) {
            obj.seconds += time;
            ms = obj.iterate() + (time * 1000);
        },
        
        gettime() {
            return Math.floor(now / 1000);
        },
        
        setRemaining() {
            if(!startTime) {
                startTime = new Date().getTime();
            }
            now = Math.max(0,ms-(new Date().getTime()-startTime));

            // Allows you to start without a container, or change the container.
            if(obj.container !== null) {

                let delta = now / 1000;

                let h = Math.floor(delta / 3600) % 24;
                delta -= h * 3600;
                h = (h < 10 ? '0' : '') + h;

                let m = Math.floor(delta / 60) % 60;
                delta -= m * 60;
                m = (m < 10 ? '0' : '') + m;

                let s = Math.floor(delta % 60);
                s = (s < 10 ? '0' : '') + s;

                let clock = `<span class="tf-clock">${h}:${m}:${s}</span>`;
                document.getElementById(obj.container).innerHTML = clock;
            }
        },
        
        iterate() {
            obj.setRemaining();
            if(Math.floor(now) === 0) {
                clearInterval(timer);
                if(obj.callback !== null && obj.callback !== undefined) {
                    obj.callback();
                }
            } else {
                return now;
            }
        },
        
    };
    
    if(options.pauseButton !== null) document.getElementById(options.pauseButton).onclick = obj.pause;
    if(options.goButton !== null) document.getElementById(options.goButton).onclick = obj.go;
    if(options.resetButton !== null) document.getElementById(options.resetButton).onclick = obj.reset;
    
    obj.setRemaining();
    
    return obj;
};
