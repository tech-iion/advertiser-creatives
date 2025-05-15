import Game from './Game.js';
import MainMenu from './MainMenu.js';
import Preloader from './Preloader.js';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#0A5BC5',
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 640,
        height: 960,
    },
    scene: [ Preloader, MainMenu, Game ]
};

let game = new Phaser.Game(config);

// Handle window resize events
window.addEventListener('resize', function() {
    if (game.isBooted) {
        setTimeout(() => {
            game.scale.refresh();
        }, 100);
    }
});