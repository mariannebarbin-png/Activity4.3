export default class EventEmitter {
  constructor() {
    this.callbacks = {};
  }

  on(name, callback) {
    if (!name || typeof callback !== 'function') return this;
    if (!this.callbacks[name]) this.callbacks[name] = [];
    this.callbacks[name].push(callback);
    return this;
  }

  off(name) {
    if (!name) return this;
    delete this.callbacks[name];
    return this;
  }

  trigger(name, args = []) {
    if (!name) return;
    const cbs = this.callbacks[name] || [];
    let lastResult;
    cbs.forEach(cb => {
      lastResult = cb(...args);
    });
    return lastResult;
  }
}
