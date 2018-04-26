const Timer = function(options) {
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

	// Set defaults and process options
	let { seconds = null,
		container = null,
		daysBlock = null,
		hoursBlock = null,
		minutesBlock = null,
		secondsBlock = null,
		useTwoDigits = true,
		callback = null,
		pauseButton = null,
		goButton = null,
		resetButton = null
	} = options;

	let leftZero = useTwoDigits ? '0' : '';

	let obj = {
		seconds,
		container,
		daysBlock,
		hoursBlock,
		minutesBlock,
		secondsBlock,
		useTwoDigits,
		callback,
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
			let useContainer = obj.container !== null ? true : false;
			let useTimeblocks = false;

			[ obj.daysBlock, obj.hoursBlock, obj.minutesBlock, obj.secondsBlock ].forEach(block => {
				if (block !== null) {
					useTimeblocks = true;
				}
			});

			if (useContainer || useTimeblocks) {
				let delta = now / 1000;

				let d = Math.floor(delta / 86400) % 30;
				delta -= d * 86400;
				d = (d < 10 ? leftZero: '' ) + d;

				let h = Math.floor(delta / 3600) % 24;
				delta -= h * 3600;
				h = (h < 10 ? leftZero : '') + h;

				let m = Math.floor(delta / 60) % 60;
				delta -= m * 60;
				m = (m < 10 ? leftZero : '') + m;

				let s = Math.floor(delta % 60);
				s = (s < 10 ? leftZero : '') + s;

				if (useContainer) {
					let clock;
					if (d !== '00') {
						clock = `<span class="tf-clock">${d}:${h}:${m}:${s}</span>`;
					} else {
						clock = `<span class="tf-clock">${h}:${m}:${s}</span>`;
					}
					document.getElementById(obj.container).innerHTML = clock;
				}

				if (useTimeblocks) {
					if (obj.daysBlock !== null) {
						document.getElementById(obj.daysBlock).innerHTML = d;
					}
					if (obj.hoursBlock !== null) {
						document.getElementById(obj.hoursBlock).innerHTML = h;
					}
					if (obj.minutesBlock !== null) {
						document.getElementById(obj.minutesBlock).innerHTML = m;
					}
					if (obj.secondsBlock !== null) {
						document.getElementById(obj.secondsBlock).innerHTML = s;
					}
				}
			}
		},

		iterate() {
			obj.setRemaining();
			if(Math.floor(now) === 0) {
				clearInterval(timer);
				if(obj.callback !== null) {
					obj.callback();
				}
			} else {
				return now;
			}
		}
	};

	if(pauseButton !== null) document.getElementById(pauseButton).onclick = obj.pause;
	if(goButton !== null) document.getElementById(goButton).onclick = obj.go;
	if(resetButton !== null) document.getElementById(resetButton).onclick = obj.reset;

	obj.setRemaining();

	return obj;
};
