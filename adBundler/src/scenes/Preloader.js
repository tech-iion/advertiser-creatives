import { Scene } from "phaser";
import { global } from "../utils/global";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background");
    global.path = window.globalassetPath;
  }

  preload() {
    console.log(global.path, " globalPath");
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath(global.path);

    this.load.image("logo", "logo.png");
    this.load.image("indicator1", "indicator1.png");
    this.load.image("indicator2", "indicator2.png");
    this.load.image("beef_uncooked", "beef2_uncooked.png");
    this.load.image("salmon_uncooked", "salmon_uncooked.png");
    this.load.image("chicken_uncooked", "chicken_uncooked.png");
    this.load.image("beef_cooked", "beef2_cooked.png");
    this.load.image("salmon_cooked", "salmon_cooked.png");
    this.load.image("chicken_cooked", "chicken_cooked.png");

    this.load.image("tryagainbtnEN", "tryagainbtn.png");
    this.load.image("tryagainbtnFR", "tryagainbtn2.png");
    this.load.image("learnBtnEN", "learnBtnEN.png");
    this.load.image("learnBtnFR", "learnBtnFR.png");
    this.load.image("smoke", "smoke.png");
    this.load.image("taphand", "taphand.png");
    this.load.image("mainlogo", "sig-blk-en.png");
  }

  create() {
    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
