export default class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.canvasWidth = this.scale.width;
        this.canvasHeight = this.scale.height;

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });


        this.add.text(this.canvasWidth / 2, this.canvasHeight / 2, 'Sliding Puzzle', { fontSize: 48, fill: '#fff' }).setOrigin(0.5);

        this.add.text(this.canvasWidth / 2, this.canvasHeight / 2 + 96, 'Tap to start', { fontSize: 24, fill: '#fff' }).setOrigin(0.5);

    }
}