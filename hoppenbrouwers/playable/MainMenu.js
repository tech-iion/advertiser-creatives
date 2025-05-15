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
        
        // Set up background with full opacity
        this.background = this.add.image(this.canvasWidth / 2, this.canvasHeight / 2, 'background')
            .setOrigin(0.5);

        // Add logo2 with initial opacity 0
        this.logo2 = this.add.image(0, 0, 'logo2')
            .setOrigin(0)
            .setAlpha(0);

        // Add main logo with initial opacity 0 and offset position
        this.logo = this.add.image(this.canvasWidth / 2, this.canvasHeight * 0.25, 'logo')
            .setOrigin(0.5)
            .setAlpha(0);

        // Add main text with initial opacity 0 and offset position
        this.txt1 = this.add.text(
            this.canvasWidth / 2, 
            this.canvasHeight / 2 + 30, // Start slightly below final position
            'Klaar voor een \nuitdaging?', 
            { fontSize: 48, fill: '#fff', fontFamily: 'PoppinsBold', align: 'center' }
        )
        .setOrigin(0.5)
        .setAlpha(0);

        // Add button with initial opacity 0 and offset position
        this.btn1 = this.add.image(this.canvasWidth / 2, this.canvasHeight * 0.75, 'btn1')
            .setOrigin(0.5)
            .setScale(1.25)
            .setAlpha(0);

        // Make button interactive
        /* this.btn1.setInteractive();
        this.btn1.on('pointerdown', () => {
            this.startGame();
        }); */

        // Create timed animations sequence
        this.animateElements();
    }

    /**
     * Animate all UI elements with opacity and y-position transitions
     */
    animateElements() {
        // Sequence the animations for visual appeal
        
        // First animate the logo2 (corner logo)
        this.tweens.add({
            targets: this.logo2,
            alpha: 1,
            duration: 500/2,
            ease: 'Power2',
            onComplete: () => {
                // Then animate the main logo
                this.tweens.add({
                    targets: this.logo,
                    alpha: 1,
                    y: this.canvasHeight * 0.3, // Move to final position
                    duration: 800/2,
                    ease: 'Back.easeOut',
                    onComplete: () => {
                        // Then animate the main text
                        this.tweens.add({
                            targets: this.txt1,
                            alpha: 1,
                            y: this.canvasHeight / 2, // Move to final position
                            duration: 800/2,
                            ease: 'Power2',
                            onComplete: () => {
                                // Finally animate the button with a slight bounce
                                this.tweens.add({
                                    targets: this.btn1,
                                    alpha: 1,
                                    y: this.canvasHeight * 0.7, // Move to final position
                                    duration: 800/2,
                                    ease: 'Back.easeOut',
                                    // Add a subtle pulse animation to draw attention to the button
                                    onComplete: () => {
                                        this.pulseButton();
                                        this.input.once('pointerdown', () => {
                                        // Remove UI elements after button click
                                        this.tweens.add({
                                            targets: [this.btn1, this.txt1, this.txt2, this.logo],
                                            alpha: 0,
                                            duration: 500/2,
                                            ease: 'Power2',
                                            onComplete: () => {

                                                this.scene.start('Game');
                                            }});
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    /**
     * Creates a subtle pulsing effect for the button
     */
    pulseButton() {
        this.tweens.add({
            targets: this.btn1,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    /**
     * Handle game start with transition
     */
    startGame() {
        // Fade out all elements before transitioning to game
        this.tweens.add({
            targets: [this.logo, this.logo2, this.txt1, this.btn1],
            alpha: 0,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                this.scene.start('Game');
            }
        });
    }
}