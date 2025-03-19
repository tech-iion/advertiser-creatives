import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

const DEFAULT_WIDTH = 320*3;
const DEFAULT_HEIGHT = 480*3;
const config = {
    type: Phaser.AUTO,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    parent: 'game-container',
    background: 'transparent',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: {
      target: 60, // Target FPS
      forceSetTimeOut: true, // Ensures consistent timing
    },
    transparent: true, // Transparent canvas
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game
    ]
};

export default new Phaser.Game(config);
