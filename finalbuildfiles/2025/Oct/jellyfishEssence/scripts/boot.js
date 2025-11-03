class Boot extends Phaser.Scene {
  constructor() {
    super("boot");
  }
  preload() {
    this.load.setPath(window.trackingPath);
    //load some initial sprites
    this.load.image("game_title", "img/game_title.png");
    /* this.load.image("game_title", "img/game_title.png");
    this.load.image("jelbounce", "img/jelbounce.png");
    this.load.image("teamvsteam", "img/teamvsteam.jpg"); */
  }
  create() {
    this.scale.stopListeners();
    this.scene.start("load");
  }
}
