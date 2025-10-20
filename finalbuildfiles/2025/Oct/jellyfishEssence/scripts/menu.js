var bestscore = 0;
var game_settings = {
  sound: true,
};
var storage_key = "rf.tennis";
load_data();
function load_data() {
  /* let local_data = get_data(storage_key);
	if(local_data){ //Load existing game data
		bestscore = local_data;
	} */
}
class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  fnfetchAPI(trackingURL) {
    fetch(trackingURL, { method: "GET" })
      .then((response) => console.log("Tracking sent:", response.status))
      .catch((error) => console.error("Tracking error:", error));
  }

  create() {
    var self = this;
    
    // Background with fade in effect
    let bg = this.add.sprite(config.width * 0.5, config.height / 2, "bgg");
    bg.setScale(1);
    bg.flipX = true;
    bg.setAlpha(0);
    this.tweens.add({
      targets: bg,
      alpha: 1,
      duration: 800,
      ease: "Power2.easeOut"
    });
    
    // Character with slide in and fade
    let char = this.add.sprite(config.width * 0.4 - 100, config.height / 2, "tvst");
    char.flipX = true;
    char.setAlpha(0);
    char.setScale(0.8);
    
    this.tweens.add({
      targets: char,
      x: config.width * 0.4,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 1000,
      delay: 300,
      ease: "Back.easeOut",
      onComplete: () => {
        // Start floating animation after entrance
        this.tweens.add({
          targets: char,
          x: char.x - 15,
          duration: 1300,
          ease: "Sine.easeInOut",
          yoyo: true,
          repeat: -1,
        });
      }
    });
    
    // Title with dramatic entrance
    let title = this.add
      .sprite(360, -config.height * 0.2, "game_title")
      .setScale(0.5)
      .setAlpha(0);
    
    this.tweens.add({
      targets: title,
      y: config.height * 0.1,
      scaleX: 1.35,
      scaleY: 1.35,
      alpha: 1,
      duration: 1200,
      delay: 500,
      ease: "Bounce.easeOut"
    });

    // Jellyfish with bounce entrance
    let jelbounce = this.add.sprite(
      config.width * 0.5,
      config.height * 0.75 + 50,
      "jelbounce"
    );
    jelbounce.setScale(0.1);
    jelbounce.setAlpha(0);
    
    this.tweens.add({
      targets: jelbounce,
      y: config.height * 0.75,
      scaleX: 0.38,
      scaleY: 0.38,
      alpha: 1,
      duration: 800,
      delay: 800,
      ease: "Elastic.easeOut",
      onComplete: () => {
        // Add floating animation
        this.tweens.add({
          targets: jelbounce,
          y: jelbounce.y - 10,
          duration: 2000,
          ease: "Sine.easeInOut",
          yoyo: true,
          repeat: -1
        });
      }
    });

    // Play button with dramatic entrance
    let b_play = draw_button(360, config.height * 1.1, "start", this);
    b_play.setScale(0.5);
    b_play.setAlpha(0);

    this.tweens.add({
      targets: b_play,
      y: config.height * 0.9,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      duration: 1000,
      delay: 1200,
      ease: "Back.easeOut",
      onComplete: function () {
        // Add pulsing effect
        self.tweens.add({
          targets: b_play,
          scaleX: 1.1,
          scaleY: 1.1,
          yoyo: true,
          ease: "Sine.easeInOut",
          duration: 1000,
          repeat: -1,
        });
        
        // Add glow effect
        self.tweens.add({
          targets: b_play,
          alpha: 0.8,
          yoyo: true,
          ease: "Power2.easeInOut",
          duration: 1500,
          repeat: -1,
        });
      },
    });
    //b_play tween scale

    /* this.input.on(
      "gameobjectdown",
      (pointer, obj) => {
        if (obj.button) {
          play_sound("click", this);
          this.tweens.add(
            {
              targets: obj,
              scaleX: 1.1,
              scaleY: 1.1,
              yoyo: true,
              ease: "Linear",
              duration: 100,
              onComplete: function () {
                if (obj.name === "start") {
                  self.scene.start("game");
                }
              },
            },
            this
          );
        }
      },
      this
    ); */

this.input.on("pointerdown", (pointer) => {
	this.input.off("pointerdown");
	console.log(pointer);
	play_sound("click", this);
	play_bg_music("bgMusic", this);
	// Create screen fade effect
	let fadeOverlay = this.add.rectangle(0, 0, config.width, config.height, 0x000000);
	fadeOverlay.setOrigin(0);
	fadeOverlay.setAlpha(0);
	fadeOverlay.setDepth(1000);
	
	// Animate all elements out with staggered timing
	this.tweens.add({
		targets: b_play,
		scaleX: 1.3,
		scaleY: 1.3,
		alpha: 0.5,
		duration: 200,
		ease: "Power2.easeIn"
	});
	
	this.tweens.add({
		targets: [title, char, jelbounce],
		alpha: 0,
		scaleX: 0.8,
		scaleY: 0.8,
		duration: 300,
		delay: 100,
		ease: "Power2.easeIn"
	});
	
  this.fnfetchAPI(window.trackingType+"PlayableStart");

	this.tweens.add({
		targets: fadeOverlay,
		alpha: 1,
		duration: 400,
		delay: 200,
		ease: "Power2.easeIn",
		onComplete: function () {
			self.scene.start("game");
		}
	});
});

    // Developer text with fade in
    let devText = this.add
      .text(360, 1040, dev_str, {
        fontFamily: "vanilla",
        fontSize: 20,
        align: "center",
        color: "#FFFFFF",
      })
      .setOrigin(0.5);
      
    devText.setAlpha(0);
    this.tweens.add({
      targets: devText,
      alpha: 0.7,
      duration: 1000,
      delay: 2000,
      ease: "Power2.easeOut"
    });
  }
}
