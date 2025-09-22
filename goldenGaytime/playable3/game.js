let game;
let gameOptions = {
  gravity: 1,
  crateHeight: 200,
  crateRange: [-200, 200],
  crateSpeed: 1200,
  cameraSpeed: 800,
  skyScrollSpeed: 0.1,
  slabFixedY: 150,
};
window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 640,
      height: 960,
    },
    physics: {
      default: "matter",
      matter: {
        gravity: {
          y: gameOptions.gravity,
        },
      },
    },
    scene: [mainMenu, howtoplayGame, playGame, endMenu],
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
};

class mainMenu extends Phaser.Scene {
  constructor() {
    super("mainMenu");
  }
  preload() {
    this.load.image("crate", "assets/sprites/crate.png");
    this.load.image("ground", "assets/sprites/ground.png");
    this.load.image("sky", "assets/sprites/sky.png");
    this.load.image("skyitems", "assets/sprites/skyitems.png");
    this.load.image("block", "assets/sprites/block.png");
    this.load.image("block2", "assets/sprites/block2.png");
    this.load.image("background", "assets/sprites/background.png");
    this.load.image("tower", "assets/sprites/tower.png");
    this.load.image("bg", "assets/sprites/bg.png");
    this.load.image("tutorialArrow", "assets/sprites/tutorial-arrow.png");
    this.load.image("mainindextitle", "assets/sprites/main-index-title.png");
    this.load.image("logo", "assets/sprites/logo.png");
    this.load.image("tapbtn", "assets/sprites/tapbtn.png");
    this.load.image("ctabtn", "assets/sprites/ctabtn.png");
    this.load.image("finalSlab", "assets/sprites/finalSlab.png");
    this.load.image("hook", "assets/sprites/hook.png");

    this.load.image("cloud1", "assets/sprites/items/cloud1.png");
    this.load.image("cloud2", "assets/sprites/items/cloud2.png");
    this.load.image("cloud3", "assets/sprites/items/cloud3.png");
    this.load.image("plane", "assets/sprites/items/plane.png");
    this.load.image("balloon", "assets/sprites/items/balloon1.png");
    this.load.image("balloon2", "assets/sprites/items/balloon2.png");
    this.load.image("shootingstar", "assets/sprites/items/shootingstar.png");
    this.load.image("rocket", "assets/sprites/items/rocket.png");
    this.load.image("planet1", "assets/sprites/items/planet1.png");
    this.load.image("planet2", "assets/sprites/items/planet2.png");
    this.load.image("planet3", "assets/sprites/items/planet3.png");

    /* this.load.image("instructions", "assets/sprites/instru.png"); */
  }
  create() {
    var bg = this.add.image(0, 0, "bg");
    bg.displayWidth = game.config.width;
    bg.x = game.config.width / 2;
    bg.y = game.config.height / 2;
    bg.setOrigin(0.5);
    bg.setScale(1.5);

    var mainindextitle = this.add.image(0, 0, "mainindextitle");
    mainindextitle.x = game.config.width * 0.515;
    mainindextitle.y = game.config.height * 0.055;
    mainindextitle.setOrigin(0.5, 0);
    mainindextitle.setScale(0.85);

    var logo = this.add.image(0, 0, "logo");
    logo.x = game.config.width / 2;
    logo.y = game.config.height * 0.15;
    logo.setOrigin(0.5);
    logo.setScale(0.6);

    //angle tween swing effect to mainindextitle
    this.tweens.add({
      targets: mainindextitle,
      angle: 5,
      duration: 1200,
      ease: "Quad.easeInOut",
      yoyo: true,
      repeat: -1,
    });

    var tapbtn = this.add.image(0, 0, "tapbtn");
    tapbtn.x = game.config.width / 2;
    tapbtn.y = game.config.height * 0.875;
    tapbtn.setOrigin(0.5);
    tapbtn.setScale(1);

    var that = this;
    this.input.once("pointerdown", function () {
      that.scene.start("howtoplayGame");
    });
    this.canDrop = false;

    //tween scale tapbtn
    this.tweens.add({
      targets: tapbtn,
      scaleX: 0.95,
      scaleY: 0.95,
      duration: 600,
      ease: "Quad.easeInOut",
      yoyo: true,
      repeat: -1,
    });


    this.instructionsd = this.add.text(
      game.config.width * 12,
      game.config.height * 0.3,
      "Tap to Drop the Slab!",
      {
        fontSize: "40px",
        fill: "#572A31",
        stroke: "#ffffff",
        strokeThickness: 4,
        fontFamily: "ITCGoudySansStdBlack",
        align: "center",
        wordWrap: { width: game.config.width * 0.8 }
      }
    );
    this.instructionsd.setOrigin(0.5);
    this.instructionsd.setScrollFactor(0);
    this.instructionsd.setDepth(1200);
    this.instructionsd.setAlpha(0);
  }
}

class howtoplayGame extends Phaser.Scene {
  constructor() {
    super("howtoplayGame");
  }
  preload() {}
  create() {
    this.addSky();
    this.background = this.add.image(0, 0, "background");
    this.background.displayWidth = game.config.width;
    this.background.x = game.config.width / 2;
    this.background.y = game.config.height * 0.5;
    this.background.setOrigin(0.5);
    this.background.setScale(1);

    //tween y this.background
    this.tweens.add({
      targets: this.background,
      y: game.config.height * 0.7,
      duration: 1200,
      ease: "Quad.easeInOut",
      yoyo: false,
      repeat: 0,
    });

    this.hook = this.add.sprite(0, 0, "hook");
    this.hook.x = game.config.width / 2;
    this.hook.y = -game.config.height * 0.3;
    this.hook.setOrigin(0.5);
    this.hook.setScale(0.6);

    this.tweens.add({
      targets: this.hook,
      y: game.config.height * 0,
      duration: 1200,
      ease: "Quad.easeInOut",
      yoyo: false,
      repeat: 0,
    });

    this.block2 = this.add.sprite(0, 0, "block2");
    this.block2.x = game.config.width / 2;
    this.block2.y = 0;
    this.block2.setOrigin(0.5);
    this.block2.setScale(1);

    this.tweens.add({
      targets: this.block2,
      y: game.config.height * 0.3,
      duration: 1200,
      ease: "Quad.easeInOut",
      yoyo: false,
      repeat: 0,
    });

    this.tutorialArrow = this.add.sprite(0, 0, "tutorialArrow");
    this.tutorialArrow.x = game.config.width / 2;
    this.tutorialArrow.y = game.config.height * 0.45;
    this.tutorialArrow.setOrigin(0.5);
    this.tutorialArrow.setScale(1);
    this.tutorialArrow.setAlpha(0);

    this.tweens.add({
      targets: this.tutorialArrow,
      alpha: 1,
      duration: 600,
      delay: 600,
      ease: "Quad.easeInOut",
    });

    this.tweens.add({
      targets: this.tutorialArrow,
      y: game.config.height * 0.475,
      duration: 600,
      delay: 600,
      ease: "Quad.easeInOut",
      yoyo: true,
      repeat: -1,
    });

    this.logo = this.add.sprite(
      game.config.width / 2,
      game.config.height / 2,
      "logo"
    );
    this.logo.setScrollFactor(0);
    this.logo.setOrigin(0.5);
    this.logo.setScale(0.4);
    this.logo.setDepth(1000);
    this.logo.x = game.config.width - this.logo.displayWidth * 0.525;
    this.logo.y = this.logo.displayHeight * 0.4;

    /* this.tweens.add({
      targets: this.tutorialArrow,
      y: game.config.height * 0.5,
      duration: 1200,
      ease: "Quad.easeInOut",
      yoyo: true,
      repeat: -1,
    }); */

    var that = this;
    this.input.once("pointerdown", function () {
      that.scene.start("PlayGame");
    });
  }
  addSky() {
    // Create multiple sky sprites for infinite scrolling
    //this.skyGroup = this.add.group();

    //for (let i = -2; i <= 2; i++) {
    this.sky = this.add.sprite(0, 960, "sky");
    /* this.sky.displayWidth = game.config.width; */
    this.sky.setScale(2);
    /* sky.displayHeight = 960; */
    this.sky.setOrigin(0.5, 1);

    // tween this.sky

    //this.skyGroup.add(sky);
    //}
  }
}

class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  preload() {}
  create() {
    this.matter.world.update30Hz();
    this.isPlayableComplete = false;
    this.canDrop = true;
    this.towerHeight = 0;
    this.maxTowerHeight = 0;
    this.dropsCount = 0; // Track number of drops
    this.currentBlockType = this.getRandomBlockType();
    this.addSky();
    this.addGround();
    this.addMovingCrate();
    this.crateGroup = this.add.group();
    this.matter.world.on("collisionstart", this.checkCollision, this);
    this.setCameras();
    this.input.on("pointerdown", this.dropCrate, this);

    this.stackarr = [
      "How High Can You Stack?",
      "Make it a Gaytime Stack!",
      "Slab it. Stack it. Snack it!",
      "Don’t Miss! Stack the Slabs!",
      "Bigger Stack, Bigger Fun!",
      "One More Slab on Top!",
      "Stack it Tall, Stack it All!",
      "Build the Ultimate Slab Tower!",
      "Keep Going, Slab Master!",
      "Your Slab Empire Awaits!",
      "Higher, Higher, Higher!",
      "Slab Nation Rising!",
      "Tap Fast, Stack High!",
      "Epic Slab Incoming!",
      "Gravity Can’t Stop You!",
      "Stack Smart. Stack Strong.",
      "Is This Your Tallest Yet?",
      "Slab + Slab = Fun!",
      "Sky’s the Limit with Slabs!",
      "Go for the Perfect Drop!"
    ];

    this.logo = this.add.sprite(
      game.config.width / 2,
      game.config.height / 2,
      "logo"
    );
    this.logo.setScrollFactor(0);
    this.logo.setOrigin(0.5);
    this.logo.setScale(0.4);
    this.logo.setDepth(1000);
    this.logo.x = game.config.width - this.logo.displayWidth * 0.525;
    this.logo.y = this.logo.displayHeight * 0.4;


    this.instructions = this.add.text(
      game.config.width / 2,
      game.config.height * 0.5,
      "Tap to Drop the Slab!",
      {
        fontSize: "50px",
        fill: "#572A31",
        stroke: "#ffffff",
        strokeThickness: 4,
        fontFamily: "ITCGoudySansStdBlack",
        align: "center",
        wordWrap: { width: game.config.width * 0.8 }
      }
    );
    this.instructions.setOrigin(0.5);
    this.instructions.setScrollFactor(0);
    this.instructions.setDepth(1200);
    this.instructions.setAlpha(1);


    // Initialize notification text (initially hidden)
    this.notificationText = this.add.text(
      game.config.width / 2,
      game.config.height * 0.3,
      "",
      {
        fontSize: "40px",
        fill: "#572A31",
        stroke: "#ffffff",
        strokeThickness: 4,
        fontFamily: "ITCGoudySansStdBlack",
        align: "center",
        wordWrap: { width: game.config.width * 0.8 }
      }
    );
    this.notificationText.setOrigin(0.5);
    this.notificationText.setScrollFactor(0);
    this.notificationText.setDepth(1200);
    this.notificationText.setAlpha(0);
    // Score display
    /* this.scoreText = this.add.text(10, 10, "Height: 0", {
      fontSize: "32px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    });
    this.scoreText.setScrollFactor(0); */

    //this.canvasConfetti();
  }
  addSky() {
    // Create multiple sky sprites for infinite scrolling
    //this.skyGroup = this.add.group();

    //for (let i = -2; i <= 2; i++) {
    this.sky = this.add.sprite(0, 960, "sky");
    /* this.sky.displayWidth = game.config.width; */
    this.sky.setScale(1);
    this.sky.x = game.config.width / 2;
    /* sky.displayHeight = 960; */
    this.sky.setOrigin(0.5, 1);

    this.skyitems = this.add.sprite(0, 960, "skyitems");
    /* this.sky.displayWidth = game.config.width; */
    this.skyitems.setScale(1);
    this.skyitems.x = game.config.width / 2;
    /* sky.displayHeight = 960; */
    this.skyitems.setOrigin(0.5, 1);

    // tween this.sky

    //this.skyGroup.add(sky);
    //}
  }
  addGround() {
    this.ground = this.matter.add.sprite(
      game.config.width / 2,
      game.config.height,
      "ground"
    );
    this.ground.setAlpha(0);
    this.ground.setBody({
      type: "rectangle",
      width: this.ground.displayWidth,
      height: this.ground.displayHeight * 2,
    });
    this.ground.setOrigin(0.5, 1);
    this.ground.setStatic(true);

    this.tower = this.add.sprite(
      game.config.width / 2,
      this.ground.y - this.ground.displayHeight * 0.4,
      "tower"
    );
    this.tower.setAlpha(1);
    this.tower.y = game.config.height - this.tower.displayHeight * 0.31;
    /* this.tower.setBody({
      type: "rectangle",
      width: this.tower.displayWidth,
      height: this.tower.displayHeight * 2,
    }); */
    this.tower.setOrigin(0.5, 0);
    this.tower.setScale(1.55);
    //this.tower.setStatic(true);
  }
  getRandomBlockType() {
    const blockTypes = ["block", "block2"];
    return blockTypes[Math.floor(Math.random() * blockTypes.length)];
  }

  addMovingCrate() {
    this.hook = this.add.sprite(
      game.config.width / 2 - gameOptions.crateRange[0],
      gameOptions.slabFixedY,
      "hook"
    );
    this.hook.setScrollFactor(0);
    this.hook.setOrigin(0.5, 1.1);
    this.hook.setScale(0.6);
    this.tweens.add({
      targets: this.hook,
      x: game.config.width / 2 - gameOptions.crateRange[1],
      duration: gameOptions.crateSpeed,
      yoyo: true,
      repeat: -1,
    });

    this.movingCrate = this.add.sprite(
      game.config.width / 2 - gameOptions.crateRange[0],
      gameOptions.slabFixedY,
      this.currentBlockType
    );
    // Make the slab stay fixed on screen
    this.movingCrate.setScrollFactor(0);

    this.tweens.add({
      targets: this.movingCrate,
      x: game.config.width / 2 - gameOptions.crateRange[1],
      duration: gameOptions.crateSpeed,
      yoyo: true,
      repeat: -1,
    });
  }
  checkCollision(e, b1, b2) {
    if (b1.isCrate && !b1.hit) {
      b1.hit = true;
      b1.isStacked = true; // Mark as successfully stacked
      this.dropsCount++; // Increment drop counter

      // Show notification for successful stack
      this.showNotification();

      this.updateTowerHeight();
      this.manageBlockPhysics();

      // Only continue if tower height is less than 12
      if (this.towerHeight < 12) {
        this.nextCrate();
      } else {
        // Game completed - hide moving crate
        this.movingCrate.visible = false;
        this.hook.visible = false;
        this.canDrop = false;
        this.canvasConfetti();
      }
    }
    if (b2.isCrate && !b2.hit) {
      b2.hit = true;
      b2.isStacked = true; // Mark as successfully stacked
      this.dropsCount++; // Increment drop counter
      
      // Show notification for successful stack
      this.showNotification();
      
      this.updateTowerHeight();
      this.manageBlockPhysics();

      // Only continue if tower height is less than 12
      if (this.towerHeight < 12) {
        this.nextCrate();
      } else {
        // Game completed - hide moving crate
        this.movingCrate.visible = false;
        this.hook.visible = false;
        this.canDrop = false;
        this.canvasConfetti();
      }
    }
  }
  setCameras() {
    // Main camera will follow the tower
    this.cameras.main.setBounds(0, -10000, game.config.width, 20000);
  }
  dropCrate() {
    if (this.canDrop) {
      this.canDrop = false;
      this.movingCrate.visible = false;
      this.instructions.setAlpha(0);
      this.hook.visible = false;
      this.addFallingCrate();
    }
  }
  update() {
    this.crateGroup.getChildren().forEach(function (crate) {
      if (crate.y > game.config.height + crate.displayHeight) {
        if (!crate.body.hit) {
          this.nextCrate();
        } else if (crate.body.isStacked) {
          // Block fell after being stacked - don't count it
          crate.body.isStacked = false;
          this.updateTowerHeight(); // Recalculate height without this block
        }
        crate.destroy();
      }
      // Check for unstable stacked blocks (tilted too much)
      if(crate && crate.body){
        if (!crate.body.oopsShown) {
          const maxTiltRadians = Math.PI / 4; // 45 degrees in radians
          if (Math.abs(crate.rotation) > maxTiltRadians) {
            crate.body.oopsShown = true; // Prevent spam
            this.showOopsNotification();
          }
        }
      }
      
    }, this);
  }
  // Removed timer functionality for endless gameplay
  addFallingCrate() {
    // Convert screen position to world position for the falling crate
    let worldY = this.cameras.main.scrollY + this.movingCrate.y;

    let fallingCrate = this.matter.add.sprite(
      this.movingCrate.x,
      worldY,
      this.currentBlockType
    );

    // Set different collision body heights based on block type
    if (this.currentBlockType === "block2") {
      // block2 gets a taller collision body
      fallingCrate.setBody({
        type: "rectangle",
        width: fallingCrate.displayWidth,
        height: fallingCrate.displayHeight * 0.875, // 50% taller collision
      });
    } else {
      // Regular block keeps default collision body
      fallingCrate.setBody({
        type: "rectangle",
        width: fallingCrate.displayWidth,
        height: fallingCrate.displayHeight * 0.975,
      });
    }

    fallingCrate.body.isCrate = true;
    fallingCrate.body.hit = false;
    
    fallingCrate.body.isStacked = false; // Initially not stacked
    this.crateGroup.add(fallingCrate);
  }
  nextCrate() {
    // Only update camera position after the first drop
    if (this.dropsCount > 1) {
      this.updateCameraPosition();
    }

    this.canDrop = true;
    this.movingCrate.visible = true;
    this.hook.visible = true;
    // Choose new random block type for next crate
    this.currentBlockType = this.getRandomBlockType();
    this.movingCrate.setTexture(this.currentBlockType);
  }
  updateTowerHeight() {
    let stackedBlocks = 0;
    let highestY = this.ground.getBounds().top;

    // Only count blocks that are hit AND still stacked (not fallen)
    this.crateGroup.getChildren().forEach(function (crate) {
      if (crate.body.hit && crate.body.isStacked) {
        stackedBlocks++;
        highestY = Math.min(highestY, crate.getBounds().top);
      }
    }, this);

    this.towerHeight = stackedBlocks;
    this.maxTowerHeight = Math.max(this.maxTowerHeight, this.towerHeight);
    this.cameras.main.shake(250, 0.0025);
    // Update score display
    //this.scoreText.setText("Height: " + this.towerHeight);
  }

  manageBlockPhysics() {
    // Get all stacked blocks and sort them by Y position (highest to lowest)
    let stackedBlocks = [];
    this.crateGroup.getChildren().forEach(function (crate) {
      if (crate.body.hit && crate.body.isStacked) {
        stackedBlocks.push(crate);
      }
    });

    // Sort by Y position (lowest Y = highest position)
    stackedBlocks.sort((a, b) => a.y - b.y);

    // Keep only top 1 block dynamic, make the rest static
    stackedBlocks.forEach((block, index) => {
      if (index < 1) {
        // Top 1 block remains dynamic
        block.setStatic(false);
      } else {
        // All other blocks become static
        block.setStatic(true);
      }
    });
  }

  updateCameraPosition() {
    let highestY = this.ground.getBounds().top;

    this.crateGroup.getChildren().forEach(function (crate) {
      if (crate.body.hit) {
        highestY = Math.min(highestY, crate.getBounds().top);
      }
    }, this);
    console.log(this.sky.y);

    // Only tween sky if it hasn't reached the top of the screen

    let skyTopLimit = this.sky.displayHeight; // Sky's display height from bottom origin
    console.log(skyTopLimit);
    //console.log(skyTopLimit,this.sky.y + this.sky.displayHeight / 5);
    /* if (this.sky.y > skyTopLimit) { */
    /* console.log("completed",this.sky.y,this.sky.y + this.sky.displayHeight / 8); */
    var y = this.sky.y + this.sky.displayHeight * 0.1;
    console.log(skyTopLimit - y, skyTopLimit / 4);
    if (skyTopLimit - y > skyTopLimit / 4) {
      this.tweens.add({
        targets: this.sky,
        y: y,
        duration: 1000,
        yoyo: false,
        repeat: 0,
        onComplete: () => {
          console.log("completed", this.sky.y);
        },
      });
      this.tweens.add({
        targets: this.skyitems,
        y: y,
        duration: 1500,
        yoyo: false,
        repeat: 0,
        onComplete: () => {
          console.log("completed", this.sky.y);
        },
      });
    }

    // Keep moving crate at fixed position on screen
    // No need to update its Y position since it has setScrollFactor(0)

    // Move camera UP to follow the tower (negative scrollY moves camera up)
    // Keep the highest point of the tower in the center-bottom area of screen
    let targetY = highestY - game.config.height * 0.7; // Keep tower at 70% down from top of screen
    //check if 10 are stacked and if so dont move the camera
    if (this.towerHeight >= 10) {
      return;
    }
    this.tweens.add({
      targets: this.cameras.main,
      scrollY: targetY,
      duration: gameOptions.cameraSpeed,
      ease: "Power2",
    });

    // Update sky positions to create infinite scrolling effect
    //this.updateSkyPosition(targetY);
  }

  updateSkyPosition(cameraY) {
    /* this.skyGroup.getChildren().forEach(function(sky) {
      // Move sky slower than camera for parallax effect
      sky.y = Math.floor(cameraY * gameOptions.skyScrollSpeed / 960) * 960;
    }); */
  }

  showNotification() {
    // Get a random message from stackarr
    const randomIndex = Math.floor(Math.random() * this.stackarr.length);
    const message = this.stackarr[randomIndex];
    
    // Stop any existing notification tweens
    this.tweens.killTweensOf(this.notificationText);
    
    // Set the notification text and styling
    this.notificationText.setText(message);
    this.notificationText.setFontSize(40);
    this.notificationText.setStyle({ fill: "#572A31" }); // Normal brown color
    
    // Position notification at a fixed screen position
    this.notificationText.x = game.config.width / 2;
    this.notificationText.y = game.config.height * 0.35;
    
    // Reset notification properties
    this.notificationText.setAlpha(0);
    this.notificationText.setScale(0.8);
    // Animate notification appearance
    this.tweens.add({
      targets: this.notificationText,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 300,
      ease: "Back.easeOut",
      onComplete: () => {
        // Keep notification visible for a moment, then fade out
        this.tweens.add({
          targets: this.notificationText,
          alpha: 0,
          scaleX: 0.9,
          scaleY: 0.9,
          duration: 400,
          delay: 1500,
          ease: "Power2.easeIn"
        });
      }
    });
    
    // Add a subtle bounce effect
    this.tweens.add({
      targets: this.notificationText,
      y: this.notificationText.y - 10,
      duration: 200,
      ease: "Power2.easeOut",
      yoyo: true,
      repeat: 1
    });
  }

  showOopsNotification() {
    // Stop any existing notification tweens
    this.tweens.killTweensOf(this.notificationText);
    
    // Set the notification text and styling
    this.notificationText.setText("Oops!");
    this.notificationText.setFontSize(60);
    this.notificationText.setStyle({ fill: "#D32F2F" }); // Red color for oops
    
    // Position notification at a fixed screen position
    this.notificationText.x = game.config.width / 2;
    this.notificationText.y = game.config.height * 0.35;
    
    // Reset notification properties
    this.notificationText.setAlpha(0);
    this.notificationText.setScale(0.8);
    
    // Animate notification appearance
    this.tweens.add({
      targets: this.notificationText,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 300,
      ease: "Back.easeOut",
      onComplete: () => {
        // Keep notification visible for a moment, then fade out
        this.tweens.add({
          targets: this.notificationText,
          alpha: 0,
          scaleX: 0.9,
          scaleY: 0.9,
          duration: 400,
          delay: 1500,
          ease: "Power2.easeIn"
        });
      }
    });
    
    // Add a shake effect for oops notifications
    this.tweens.add({
      targets: this.notificationText,
      x: this.notificationText.x - 8,
      duration: 60,
      ease: "Power2.easeOut",
      yoyo: true,
      repeat: 5
    });
  }

  endMenu() {}

  canvasConfetti() {
    /* console.log("Creating confetti effect"); */

    // Use scaleFact instead of undefined scaleFactor
    const scaleFactor = 1; //this.scaleFact;

    // Define vibrant confetti colors (hex values)
    const colors = [
      0xf6c738, // Yellow
      0xd02626, // Red
      0xffffff, // White
      0x2ecc40, // Green
      0x0074d9, // Blue
      0xd2b48c, // Yellow
      0xc58938, // Red
      0x4b2e20, // White
      0xf5ebdd, // Green
      0xffd700, // Yellow
    ];
    this.canvasWd = game.config.width;
    this.canvasHt = game.config.height;
    // Create confetti particles
    for (let i = 0; i < 100; i++) {
      // Random position across the screen
      const x = Phaser.Math.Between(this.canvasWd * 0.1, this.canvasWd * 0.9);
      const y = Phaser.Math.Between(this.canvasHt * 0.1, this.canvasHt * 0.6);

      // Randomly select a color
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Random shapes - squares and rectangles
      const width = Phaser.Math.Between(5, 15) * scaleFactor;
      const height = Phaser.Math.Between(5, 15) * scaleFactor;

      // Create the confetti particle
      const confetti = this.add.rectangle(x, y, width, height, color);
      confetti.setOrigin(0.5);
      confetti.setScrollFactor(0); // CRITICAL: Keep confetti fixed to camera
      confetti.setDepth(1120); // Above everything else
      confetti.rotation = Math.random() * Math.PI * 2; // Random initial rotation

      // Calculate random velocity - more natural movement
      const speedX = Phaser.Math.Between(-200, 200) * scaleFactor;
      const speedY = Phaser.Math.Between(-100, 300) * scaleFactor; // More downward bias

      // Animate the confetti with proper from/to values
      this.tweens.add({
        targets: confetti,
        x: confetti.x + speedX,
        y: confetti.y + speedY,
        scaleX: { from: 1, to: 0 },
        scaleY: { from: 1, to: 0 },
        rotation: confetti.rotation + (Math.random() > 0.5 ? 5 : -5), // Spin effect
        alpha: { from: 1, to: 0 },
        duration: Phaser.Math.Between(2000, 5000), // Varied durations
        ease: "Cubic.easeOut",
        onComplete: () => confetti.destroy(),
      });
    }

    // Create multiple bursts of confetti for a longer celebration
    // First burst is already created above
    /* Global.successSFX.play(); */
    // Second burst after a short delay
    this.time.delayedCall(0, () => {
      this.createConfettiBurst(100, colors);
      // Third burst (final) after another delay
      this.time.delayedCall(1000, () => {
        /*  this.createConfettiBurst(1000, colors); */
        //this.createConfettiBurst(200, colors, true); // Final burst
        // Track API call if needed
        if (!this.isPlayableComplete) {
          this.isPlayableComplete = true;
          console.log("Playable Complete");
          // Transition to end menu after confetti
          this.time.delayedCall(1000, () => {
            this.scene.start("endMenu");
          });
          /* if (window.trackingType) {
            this.fnfetchAPI(window.trackingType + "PlayableComplete");
          }*/
        }
      });
    });
  }

  // Helper method to create confetti bursts
  createConfettiBurst(particleCount, colors, isFinalBurst = false) {
    // Use scaleFact instead of undefined scaleFactor
    const scaleFactor = 1; //this.scaleFact;
    this.canvasWd = game.config.width;
    this.canvasHt = game.config.height;
    for (let i = 0; i < particleCount; i++) {
      // Random position with wider spread for final burst
      const xRange = isFinalBurst ? 0.2 : 0.1;
      const yRange = isFinalBurst ? 0.3 : 0.2;

      const x = Phaser.Math.Between(
        this.canvasWd * xRange,
        this.canvasWd * (1 - xRange)
      );
      const y = Phaser.Math.Between(
        this.canvasHt * 0.1,
        this.canvasHt * (0.6 + yRange)
      );

      // Randomly select a color
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Random size - larger for final burst
      const sizeMultiplier = isFinalBurst ? 1.5 : 1;
      const size = Phaser.Math.Between(4, 12) * scaleFactor * sizeMultiplier;

      // Create the confetti particle - mix of shapes
      let confetti;
      if (Math.random() > 0.3) {
        // Rectangle
        confetti = this.add.rectangle(
          x,
          y,
          size,
          size * (Math.random() > 0.5 ? 0.5 : 2),
          color
        );
      } else {
        // Circle
        confetti = this.add.circle(x, y, size / 2, color);
      }

      confetti.setOrigin(0.5);
      confetti.setScrollFactor(0); // CRITICAL: Keep confetti fixed to camera
      confetti.setDepth(1120);
      confetti.rotation = Math.random() * Math.PI * 2;

      // Calculate random velocity - more explosive for final burst
      const speedMultiplier = isFinalBurst ? 1.5 : 1;
      const speedX =
        Phaser.Math.Between(-150, 150) * scaleFactor * speedMultiplier;
      const speedY =
        Phaser.Math.Between(-50, 300) * scaleFactor * speedMultiplier;

      // Longer durations for extended effect
      const duration = isFinalBurst
        ? Phaser.Math.Between(4000, 7000)
        : Phaser.Math.Between(3000, 6000);

      // Animate the confetti
      this.tweens.add({
        targets: confetti,
        x: confetti.x + speedX,
        y: confetti.y + speedY,
        scaleX: { from: 1, to: 0 },
        scaleY: { from: 1, to: 0 },
        rotation:
          confetti.rotation +
          (Math.random() > 0.5 ? 5 : -5) * (isFinalBurst ? 2 : 1),
        alpha: { from: 1, to: 0 },
        duration: duration,
        ease: "Cubic.easeOut",
        onComplete: () => confetti.destroy(),
      });
    }
  }
}

class endMenu extends Phaser.Scene {
  constructor() {
    super("endMenu");
  }
  preload() {}
  create() {
    var bg = this.add.image(0, 0, "bg");
    bg.displayWidth = game.config.width;
    bg.x = game.config.width / 2;
    bg.y = game.config.height / 2;
    bg.setOrigin(0.5);
    bg.setScale(1.5);

    var logo = this.add.image(0, 0, "logo");
    logo.x = game.config.width / 2;
    logo.y = game.config.height * 0.25;
    logo.setOrigin(0.5);
    logo.setScale(1);

    var finalSlab = this.add.image(0, 0, "finalSlab");
    finalSlab.x = game.config.width / 2;
    finalSlab.y = game.config.height * 0.5;
    finalSlab.setOrigin(0.5);
    finalSlab.setScale(0.45);

    //tween shift slight effect x finalSlab
    this.tweens.add({
      targets: finalSlab,
      x: game.config.width / 2 + 10,
      duration: 1200,
      ease: "Quad.easeInOut",
      yoyo: true,
      repeat: -1,
    });

    //tween shift slight effect y logo
    this.tweens.add({
      targets: logo,
      y: game.config.height * 0.25 + 10,
      duration: 1200,
      ease: "Quad.easeInOut",
      yoyo: true,
      repeat: -1,
    });

    var tapbtn = this.add.image(0, 0, "ctabtn");
    tapbtn.x = game.config.width / 2;
    tapbtn.y = game.config.height * 0.875;
    tapbtn.setOrigin(0.5);
    tapbtn.setScale(1);

    this.input.on(
      "pointerdown",
      function () {
        window.open(
          "https://www.streetsicecream.com.au/p/golden-gaytime-slab-ice-cream-sandwich.html/09310016000521",
          "_blank"
        );
      },
      this
    );
    this.canDrop = false;

    //tween scale tapbtn
    this.tweens.add({
      targets: tapbtn,
      scaleX: 0.95,
      scaleY: 0.95,
      duration: 600,
      ease: "Quad.easeInOut",
      yoyo: true,
      repeat: -1,
    });
  }
}
