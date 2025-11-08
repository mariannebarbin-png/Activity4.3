import EventEmitter from './EventEmitter.js';

export default class Time extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    this.tick = this.tick.bind(this);
    window.requestAnimationFrame(this.tick);
  }

  tick() {
    const now = Date.now();
    this.delta = now - this.current;
    this.current = now;
    this.elapsed = this.current - this.start;

    this.trigger('tick');
    window.requestAnimationFrame(this.tick);
  }
}
