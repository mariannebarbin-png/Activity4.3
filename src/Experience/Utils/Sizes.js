import EventEmitter from './EventEmitter.js';

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
      this.trigger('resize');
    });
  }
}
