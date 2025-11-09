import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Debug from './Utils/Debug.js';
import sources from './sources.js';

let instance = null;

export default class Experience {
  constructor(canvas) {
    // Singleton
    if (instance){ return instance}
    instance = this;

    // Options
    this.canvas = canvas;
    this.debug = new Debug();

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();

    // Resources
    this.resources = new Resources(sources);

    // Systems (constructed after resources may load)
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Resize / update bindings
    this.sizes.on('resize', () => this.resize());
    this.time.on('tick', () => this.update());
  }

  resize() {
    if (this.camera) this.camera.resize();
    if (this.renderer) this.renderer.resize();
  }

  update() {
    if (this.camera) this.camera.update();
    if (this.world && typeof this.world.update === 'function') this.world.update();
    if (this.renderer) this.renderer.update();
  }
}
