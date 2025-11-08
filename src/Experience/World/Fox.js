import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    this.resource = this.resources.items.foxModel;
    if (this.resource) this.setModel();
    if (this.resource) this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    // create actions if animations present
    const clips = this.resource.animations || [1];
    this.animation.actions = {};
    this.animation.actions.idle = clips[0] ? this.animation.mixer.clipAction(clips[0]) : null;
    this.animation.actions.walking = clips[1] ? this.animation.mixer.clipAction(clips[1]) : null;
    this.animation.actions.running = clips[2] ? this.animation.mixer.clipAction(clips[2]) : null;

    // pick default
    this.animation.actions.current = this.animation.actions.idle;
    if (this.animation.actions.current) this.animation.actions.current.play();

    // debug UI buttons
    if (this.debug && this.debug.active) {
      const ui = this.debug.ui;
      const folder = ui.addFolder('fox');
      if (this.animation.actions.idle) folder.add({ idle: () => this.play('idle') }, 'idle');
      if (this.animation.actions.walking) folder.add({ walking: () => this.play('walking') }, 'walking');
      if (this.animation.actions.running) folder.add({ running: () => this.play('running') }, 'running');
    }
  }

  play(name) {
    const newAction = this.animation.actions[name];
    const oldAction = this.animation.actions.current;
    if (!newAction) return;
    newAction.reset();
    newAction.play();
    if (oldAction) newAction.crossFadeFrom(oldAction, 1, true);
    this.animation.actions.current = newAction;
  }

  update() {
    if (this.animation && this.animation.mixer) {
      // delta is in ms, mixer expects seconds
      this.animation.mixer.update((this.time.delta || 16) * 0.001);
    }
  }
}
