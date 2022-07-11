class Timer {
    timerId;
    start;
    remaining;
    callback;

    constructor(callback, delay) {
        this.remaining = delay;
        this.callback = callback;

        this.resume();
    }

    pause = function () {
        window.clearTimeout(this.timerId);
        this.timerId = null;
        this.remaining -= Date.now() - this.start;
    };

    resume = function () {
        if (this.timerId) {
            return;
        }

        this.start = Date.now();
        this.timerId = window.setTimeout(this.callback, this.remaining);
    };
}

export default Timer;