class Timer {
  timerId: number | undefined;
  start: number;
  remaining;
  callback;
  numberAddTime: number;

  constructor(callback: TimerHandler, delay: number) {
    this.remaining = delay;
    this.callback = callback;

    this.numberAddTime = 0;

    this.start = Date.now();
    this.timerId = window.setTimeout(this.callback, this.remaining);
  }

  setRemaining = (delay: any) => {
    this.remaining = delay;
  };

  setCallback = (callback: any) => {
    this.callback = callback;
  };

  pause = function (this: Timer) {
    window.clearTimeout(this.timerId);
    this.timerId = undefined;
    this.remaining -= Date.now() - this.start;
  };

  resume = function (this: Timer) {
    if (this.timerId) {
      return;
    }

    this.start = Date.now();
    this.timerId = window.setTimeout(this.callback, this.remaining);
  };

  restart = (callback: void, delay: any) => {
    this.setRemaining(delay);
    this.setCallback(callback);

    window.clearTimeout(this.timerId);

    this.start = Date.now();
    this.timerId = window.setTimeout(this.callback, this.remaining);
  };

  addTime = (time: number) => {
    if (this.numberAddTime > 4) {
      this.pause();

      this.start = Date.now();
      this.timerId = window.setTimeout(this.callback, this.remaining + time)
    }
    this.numberAddTime++;
  }
}

export default Timer;
