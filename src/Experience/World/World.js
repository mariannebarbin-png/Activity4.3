import Experience from '../Experience.js';
import Floor from './Floor.js';
import Fox from './Fox.js';
import Environment from './Environment.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // wait until resources ready
    this.resources.on('ready', () => {
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) this.fox.update();
  }
}
