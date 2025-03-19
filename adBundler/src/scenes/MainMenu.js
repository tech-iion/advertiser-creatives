import { Scene } from "phaser";
import { getCanvasDimensions } from "../utils/canvasConfig";
import { global } from "../utils/global";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    

    const { canvasWidth, canvasHeight } = getCanvasDimensions(this, true);
    let scaleFactor = 1.4;
    
    // Add background
    this.meatName = "";
    this.clickBG = false;

    this.mainlogo = this.add.image(
      canvasWidth * 0.5,
      canvasHeight - canvasWidth * 0.025,
      "mainlogo"
    );
    this.mainlogo.setOrigin(0.5, 1).setDepth(11111111);
    this.mainlogo.setScale(scaleFactor * 0.3).setAlpha(0);

    this.image = this.add.image(
      canvasWidth / 2,
      canvasHeight / 2,
      "background"
    );
    this.image.setOrigin(0.5);
    this.image.setScale(scaleFactor * 0.55);
    this.image.alpha = 0;

    // Fade in background
    this.tweens.add({
      targets: this.image,
      alpha: 1,
      duration: 800,
      ease: "Power2",
    });
    this.tempTextFloat = null;
    // Add title text
    const title = this.add
      .text(canvasWidth / 2, canvasHeight * 0.125, "SAFE TEMP TAP", {
        fontSize: `${Math.floor(48 * scaleFactor)}px`,
        fontFamily: "Asap",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 0,
        shadow: { color: "#000000", blur: 2, fill: true },
      })
      .setOrigin(0.5);
    title.alpha = 0;
    title.y -= 50; // Start above final position

    // Add subtitle text
    const subtitle = this.add
      .text(
        canvasWidth / 2,
        canvasHeight * 0.225,
        "Tap and hold the digital thermometer \nto reach the safe cooking temperature!",
        {
          fontSize: `${Math.floor(36 * scaleFactor)}px`,
          fontFamily: "Asap",
          fill: "#ffffff",
          align: "center",
          stroke: "#000000",
          strokeThickness: 0,
          shadow: { color: "#000000", blur: 2, fill: true },
        }
      )
      .setOrigin(0.5);
    subtitle.alpha = 0;

    // Add salmon
    this.salmon = this.add.image(
      canvasWidth / 2,
      canvasHeight * 0.625,
      "salmon_uncooked"
    );
    this.salmon.setScale(scaleFactor * 0.5);
    this.salmon.setOrigin(0.5);
    this.salmon.alpha = 0;
    this.inactivityTimer = null;

    // Add thermometer (using indicator1)
    this.thermometer = this.add.image(
      canvasWidth * 0.395,
      canvasHeight * 0.45,
      "indicator2"
    );
    this.thermometer.setScale(scaleFactor * 0.3);
    this.thermometer.setOrigin(0.5);
    this.thermometer.alpha = 0;

    // Add temperature text
    this.tempText = this.add
      .text(canvasWidth * 0.395, canvasHeight * 0.45, "70°C", {
        fontSize: `${Math.floor(22 * scaleFactor)}px`,
        fontFamily: "Montserrat",
        fill: "#000000",
        align: "center",
        shadow: { color: "#000000", blur: 0, fill: true },
      })
      .setOrigin(0.5)
      .setAngle(60);

    this.tempText.alpha = 0;

    // Add start button
    this.startButton = this.add
      .text(canvasWidth / 2, canvasHeight * 0.835, "Start Cooking!", {
        fontSize: `${Math.floor(60 * scaleFactor)}px`,
        fontFamily: "Asap",
        fill: "#FFD700",
        stroke: "#000000",
        strokeThickness: 0,
        shadow: { color: "#000000", blur: 2, fill: true },
      })
      .setOrigin(0.5);
    this.startButton.alpha = 0;

    if (global.language == "FR") {
      title.setText("Température sécuritaire");
      subtitle.setFontSize(`${Math.floor(30 * scaleFactor)}px`);
      subtitle.setText(
        "Tapez sur le thermomètre numérique \npour atteindre la température de \ncuisson sécuritaire"
      );
      this.startButton.setFontSize(`${Math.floor(55 * scaleFactor)}px`);
      this.startButton.setText("Commencez la cuisson !");
    }

    if (global.retryCount > 0) {
      this.showSelectionPage();
    } else {
      // Fade in and slide down title
      this.tweens.add({
        targets: title,
        alpha: 1,
        y: canvasHeight * 0.125,
        duration: 1000,
        ease: "Back.easeOut",
        delay: 300,
      });

      // Fade in subtitle
      this.tweens.add({
        targets: subtitle,
        alpha: 1,
        duration: 800,
        delay: 800,
        ease: "Power2",
      });

      this.salmon.x += 200; // Start from right

      // Slide in and fade in salmon
      this.tweens.add({
        targets: this.salmon,
        x: canvasWidth / 2,
        alpha: 1,
        duration: 1000,
        ease: "Power2",
        delay: 1200,
        onComplete: () => {
          // Add fish wiggle animation
          this.tweens.add({
            targets: this.salmon,
            angle: { from: -3, to: 3 },
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
          });

          // Add subtle swimming motion
          this.tweens.add({
            targets: this.salmon,
            x: "+=15",
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
          });

          // Add very subtle vertical motion
          this.tweens.add({
            targets: this.salmon,
            y: "+=5",
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
            delay: 200, // Offset to create more natural motion
          });
        },
      });

      this.thermometer.x -= 200; // Start from left

      // Slide in and fade in thermometer
      this.tweens.add({
        targets: this.thermometer,
        x: canvasWidth * 0.3,
        alpha: 1,
        duration: 1000,
        ease: "Power2",
        delay: 1200,
      });

      /* setTimeout(() => {
        this.tempText.x =
          this.thermometer.x - this.thermometer.displayWidth * 0.22;
        this.tempText.y =
          this.thermometer.y - this.thermometer.displayHeight * 0.3;
      }, 2000); */
      // Fade in temperature text
      this.tweens.add({
        targets: this.tempText,
        alpha: 1,
        duration: 800,
        delay: 2000,
        ease: "Power2",
      });

      this.startButton.y += 50; // Start below final position

      // Fade in and slide up start button
      this.tweens.add({
        targets: this.startButton,
        alpha: 1,
        y: canvasHeight * 0.85,
        duration: 1000,
        ease: "Back.easeOut",
        delay: 2000,
        onComplete: () => {
          // Add continuous pulsing effect
          this.tweens.add({
            targets: this.startButton,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
          });

          // Add glowing effect
          this.tweens.add({
            targets: this.startButton,
            strokeThickness: { from: 4, to: 8 },
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
          });
        },
      });
      setTimeout(() => {
        this.input.on("pointerdown", () => {
          
          this.tempText.alpha = 0;
          if (!this.isTransitioning) {
            this.tempText.alpha = 0;
            this.fnfetchAPI(window.trackingType + "StartCooking");
            // Only apply hover if not transitioning
            this.startButton.emit("pointerdown");
            this.input.off("pointerdown");
          }
        });
      }, 2500);
      // Add hover effect with smoother transition
      this.startButton.on("pointerover", () => {
        if (!this.isTransitioning) {
          // Only apply hover if not transitioning
          this.tweens.add({
            targets: this.startButton,
            scale: 1.1,
            duration: 200,
            ease: "Power2",
          });
        }
      });

      this.startButton.on("pointerout", () => {
        if (!this.isTransitioning) {
          // Only apply hover if not transitioning
          this.tweens.add({
            targets: this.startButton,
            scale: 1,
            duration: 200,
            ease: "Power2",
          });
        }
      });

      // Start game on click
      this.startButton.on("pointerdown", () => {
        if (this.isTransitioning) return; // Prevent multiple clicks
        this.isTransitioning = true; // Set flag

        

        // Disable interactivity
        this.startButton.removeInteractive();

        // Kill any existing tweens
        this.tweens.killTweensOf(this.startButton);

        // Reset scale
        this.startButton.setScale(1);

        // Fade out everything
        this.tweens.add({
          targets: [
            title,
            subtitle,
            this.salmon,
            this.thermometer,
            this.tempText,
            this.startButton,
          ],
          alpha: 0,
          duration: 500,
          ease: "Power2",
          onComplete: () => {
            this.showSelectionPage();
          },
        });
      });
    }

    const learnBtn = this.add
      .image(canvasWidth / 2, canvasHeight, "learnBtn" + global.language)
      .setInteractive({ useHandCursor: true })
      .setScale(0.555)
      .setOrigin(0.5, 1)
      .setDepth(1);

    // Add hover effects for learn button
    learnBtn.on("pointerover", () => {
      this.tweens.add({
        targets: learnBtn,
        scale: 0.6,
        duration: 100,
        ease: "Power2",
      });
    });

    learnBtn.on("pointerout", () => {
      this.tweens.add({
        targets: learnBtn,
        scale: 0.56,
        duration: 100,
        ease: "Power2",
      });
    });

    // Add click handler for learn button
    learnBtn.on("pointerdown", () => {
      this.fnfetchAPI(window.trackingType + "LearnMore");
      if (global.language == "FR") {
        window.open(
          window.setTracker + "https://www.Canada.ca/salubritealiments",
          "_blank"
        );
      } else {
        window.open(
          window.setTracker + "https://www.Canada.ca/foodsafety",
          "_blank"
        );
      }
      // Scale down animation on click
      this.tweens.add({
        targets: learnBtn,
        scale: 0.5,
        duration: 100,
        ease: "Power2",
        onComplete: () => {
          // Scale back up
          this.tweens.add({
            targets: learnBtn,
            scale: 0.56,
            duration: 100,
            ease: "Back.easeOut",
            onComplete: () => {
              // Open the URL after animation
              window.open("https://www.Canada.ca/foodsafety", "_blank");
            },
          });
        },
      });
    });

    //this.showFinalScreen();
  }

  showSelectionPage() {
    this.isTransitioning = true; // Set to true at start

    const { canvasWidth, canvasHeight } = getCanvasDimensions(this, true);

    let scaleFactor = 1.4;

    // Add title
    this.selectionTitle = this.add
      .text(canvasWidth / 2, canvasHeight * 0.115, "Pick the choice of meat", {
        fontSize: `${Math.floor(48 * scaleFactor)}px`,
        fontFamily: "Asap",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 0,
        shadow: { color: "#000000", blur: 2, fill: true },
      })
      .setOrigin(0.5);
    this.selectionTitle.alpha = 0;

    // Create selection options
    let options = [
      {
        name: "chicken_uncooked",
        text: "Chicken drumstick : 74°C (165°F)",
        y: 0.18,
      },
      {
        name: "beef_uncooked",
        text: "Beef hamburger : 71°C (160°F)",
        y: 0.45 - 0.05,
      },
      {
        name: "salmon_uncooked",
        text: "Fish : 70°C (158°F)",
        y: 0.7 - 0.05,
      },
    ];

    if (global.language == "FR") {
      this.selectionTitle.setFontSize(`${Math.floor(48 * scaleFactor)}px`);
      this.selectionTitle.setText("Choisissez le type de viande");
      options = [
        {
          name: "chicken_uncooked",
          text: "Pilon de poulet : 74 °C (165 °F)",
          y: 0.18,
        },
        {
          name: "beef_uncooked",
          text: "Hamburger de bœuf : 71 °C (160 °F)",
          y: 0.45 - 0.05,
        },
        {
          name: "salmon_uncooked",
          text: "Poisson : 70 °C (158 °F)",
          y: 0.7 - 0.05,
        },
      ];
    }

    this.optionContainers = [];

    options.forEach((option, index) => {
      // Create container for each option
      const container = this.add.container(
        canvasWidth / 2,
        canvasHeight * option.y
      );
      container.alpha = 0;

      // Add meat image
      const image = this.add.image(0, 0, option.name);
      image.setScale(scaleFactor * 0.325).setOrigin(0.5, 0);

      // Add text
      const text = this.add
        .text(0, image.displayHeight * 1.15, option.text, {
          fontSize: `${Math.floor(30 * scaleFactor)}px`,
          fontFamily: "Asap",
          fill: "#ffffff",
          align: "center",
          stroke: "#000000",
          strokeThickness: 0,
          shadow: { color: "#000000", blur: 2, fill: true },
        })
        .setOrigin(0.5);

      // Calculate container bounds
      const padding = 20;
      const containerWidth =
        Math.max(image.displayWidth, text.displayWidth) + padding * 2;
      const containerHeight =
        image.displayHeight + text.displayHeight + padding * 2;

      // Add graphics rectangle based on container dimensions
      const containerGraphics = this.add.graphics();
      containerGraphics.lineStyle(3, 0xffffff, 0);
      containerGraphics.strokeRect(
        -containerWidth / 2,
        -padding,
        containerWidth,
        containerHeight
      );
      containerGraphics.setDepth(0);

      // Add to container
      container.add([image, text, containerGraphics]);

      // Setup container interaction matching graphics bounds
      const hitArea = new Phaser.Geom.Rectangle(
        -containerWidth / 2, // x matches graphics
        -padding, // y matches graphics
        containerWidth, // width matches graphics
        containerHeight // height matches graphics
      );
      container.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

      // Enable input and set cursor
      container.input.cursor = "pointer";

      // Add click handler
      container.on("pointerdown", () => {
        
        if (!this.isTransitioning) {
          this.isTransitioning = true;

          // Disable all container interactions
          this.optionContainers.forEach((cont) => {
            cont.removeInteractive();
          });
          const selectedOptionName = container.list[0].texture.key;
          
          if (selectedOptionName === "chicken_uncooked") {
            this.fnfetchAPI(window.trackingType + "ChickenPicked");
          } else if (selectedOptionName === "beef_uncooked") {
            this.fnfetchAPI(window.trackingType + "BeefPicked");
          } else if (selectedOptionName === "salmon_uncooked") {
            this.fnfetchAPI(window.trackingType + "FishPicked");
          }
          //this.fnfetchAPI(window.trackingType + "Picked");
          // Stop all ongoing animations
          this.tweens.killAll();

          // Clear all glows
          this.optionContainers.forEach((cont) => {
            const img = cont.list[0];
            img.preFX.clear();
          });

          // Fade out non-selected options
          this.optionContainers.forEach((cont) => {
            if (cont !== container) {
              // Quickly fade out other options
              this.tweens.add({
                targets: cont,
                alpha: 0,
                scale: 0.8,
                duration: 300,
                ease: "Power2",
              });
            }
          });

          // Fade out title and any other UI
          this.tweens.add({
            targets: [this.selectionTitle],
            alpha: 0,
            duration: 300,
            ease: "Power2",
          });

          // Scale up and center the selected option
          const selectedImage = container.list[0];
          const selectedText = container.list[1];

          // First move to center
          this.tweens.add({
            targets: container,
            x: canvasWidth / 2,
            y: canvasHeight / 2,
            duration: 500,
            ease: "Power2",
            onComplete: () => {
              // Create a graphics rectangle for the cooking area
              const cookingAreaGraphics = this.add.graphics();
              cookingAreaGraphics.lineStyle(4, 0xffffff, 0);

              // Calculate the bounds for the cooking area
              const padding = 40;
              const areaWidth = selectedImage.displayWidth * 2.5;
              const areaHeight = selectedImage.displayHeight * 3;

              // Position the rectangle centered on the meat
              cookingAreaGraphics.strokeRect(
                canvasWidth / 2 - areaWidth / 2,
                canvasHeight / 2 - areaHeight / 2,
                areaWidth,
                areaHeight
              );
              cookingAreaGraphics.setDepth(0);

              // Make the cooking area interactive
              const hitArea = new Phaser.Geom.Rectangle(
                canvasWidth / 2 - areaWidth / 2,
                canvasHeight / 2 - areaHeight / 2,
                areaWidth,
                areaHeight
              );
              cookingAreaGraphics.setInteractive(
                hitArea,
                Phaser.Geom.Rectangle.Contains
              );

              // Variable to track if we're currently pressing
              let isPressingCookArea = false;

              // Add press handlers
              cookingAreaGraphics.on("pointerdown", () => {
                isPressingCookArea = true;
                this.tapCount++;
                if (this.tapHand && this.tapHand.active) {
                  this.tweens.add({
                    targets: this.tapHand,
                    alpha: 0,
                    duration: 200,
                    ease: "Power2",
                    onComplete: () => {
                      this.tapHand.destroy();
                    },
                  });
                }
                
              });

              cookingAreaGraphics.on("pointerup", () => {
                isPressingCookArea = false;
              });

              cookingAreaGraphics.on("pointerout", () => {
                isPressingCookArea = false;
              });

              // Start with zero alpha and fade in
              cookingAreaGraphics.alpha = 0;
              this.tweens.add({
                targets: cookingAreaGraphics,
                alpha: 1,
                duration: 300,
                ease: "Power2",
              });

              // Store reference to destroy later
              this.cookingAreaGraphics = cookingAreaGraphics;

              // Then scale up with a bounce effect
              this.tweens.add({
                targets: selectedImage,
                scale: scaleFactor * 0.5,
                duration: 600,
                ease: "Back.easeOut",
                onComplete: () => {
                  

                  // Set depth for raw meat
                  selectedImage.setAlpha(0);
                  this.meatName = option.name.split("_")[0];
                  const cookedMeat2 = this.add.image(
                    container.x,
                    container.y,
                    `${option.name.split("_")[0]}_uncooked`
                  );
                  cookedMeat2.setScale(selectedImage.scale);
                  cookedMeat2.setDepth(2); // Above raw meat
                  cookedMeat2.setOrigin(0.5, 0);
                  cookedMeat2.setAlpha(1);

                  // Add the cooked version on top
                  const cookedMeat = this.add.image(
                    container.x,
                    container.y,
                    `${option.name.split("_")[0]}_cooked`
                  );
                  cookedMeat.setScale(selectedImage.scale);
                  cookedMeat.setDepth(2); // Above raw meat
                  cookedMeat.setOrigin(0.5, 0);
                  cookedMeat.setAlpha(0);

                  // Add thermometer with same style as title screen
                  const thermometer = this.add.image(
                    canvasWidth * 0.395,
                    canvasHeight * 0.45,
                    "indicator1"
                  );
                  thermometer.setScale(scaleFactor * 0.3);
                  thermometer.setOrigin(0.5);
                  if (option.name.includes("beef")) {
                    thermometer.setDepth(1); // Above both meats
                  } else {
                    thermometer.setDepth(2); // Above both meats
                  }
                  thermometer.alpha = 0;
                  thermometer.x -= 200;

                  // Add temperature text
                  const tempText = this.add
                    .text(canvasWidth * 0.395, canvasHeight * 0.45, "0°C", {
                      fontSize: `${Math.floor(18 * scaleFactor)}px`,
                      fontFamily: "Montserrat",
                      fill: "#ffffff",
                      align: "center",
                      shadow: { color: "#000000", blur: 0, fill: true },
                    })
                    .setOrigin(0.5)
                    .setAngle(60);
                  tempText.setDepth(4); // Above everything
                  tempText.alpha = 0;

                  this.tapHand = this.add.image(
                    canvasWidth * 0.5,
                    thermometer.y + thermometer.displayHeight * 0.3,
                    "taphand"
                  );
                  this.tapHand.setScale(1.4);
                  this.tapHand.setOrigin(0);
                  this.tapHand.setDepth(5); // Above everything
                  this.tapHand.setAlpha(0);

                  // Add clicking animation for tap hand
                  const createClickAnimation = () => {
                    this.tweens.add({
                      targets: this.tapHand,
                      scale: 1.2,
                      duration: 150,
                      yoyo: true,
                      repeat: 2,
                      ease: "Bounce.easeIn",
                      onComplete: () => {
                        
                      },
                    });
                  };

                  // Slide in and fade in thermometer
                  this.tweens.add({
                    targets: thermometer,
                    x: option.name.includes("beef")
                      ? canvasWidth * 0.395
                      : option.name.includes("chicken")
                      ? canvasWidth * 0.25
                      : canvasWidth * 0.3,
                    alpha: 1,
                    duration: 1000,
                    ease: "Power2",
                    onComplete: () => {
                      // Position and fade in temperature text
                      tempText.x =
                        thermometer.x - thermometer.displayWidth * 0.22;
                      tempText.y =
                        thermometer.y - thermometer.displayHeight * 0.3;

                      this.tapHand.x = canvasWidth * 0.5;
                      this.tapHand.y =
                        thermometer.y + thermometer.displayHeight * 0.51;

                      this.tweens.add({
                        targets: [tempText, this.tapHand],
                        alpha: 1,
                        duration: 500,
                        ease: "Power2",
                        onComplete: () => {
                          // Start tap hand animation
                          createClickAnimation();
                          // Add header text
                          const getDisplayName = (name) => {
                            name = name.replace("_uncooked", "");
                            switch (name.toLowerCase()) {
                              case "salmon":
                                return global.language == "FR"
                                  ? "poisson"
                                  : "fish";
                              case "chicken":
                                return global.language == "FR"
                                  ? "poulet"
                                  : "chicken";
                              case "beef":
                                return global.language == "FR"
                                  ? "bœuf"
                                  : "beef";
                              default:
                                return name;
                            }
                          };

                          const getDisplayName2 = (name) => {
                            name = name.replace("_uncooked", "");
                            switch (name.toLowerCase()) {
                              case "salmon":
                                return global.language == "FR"
                                  ? "poisson"
                                  : "Fish";
                              case "chicken":
                                return global.language == "FR"
                                  ? "poulet"
                                  : "Chicken";
                              case "beef":
                                return global.language == "FR"
                                  ? "bœuf"
                                  : "Beef";
                              default:
                                return name;
                            }
                          };

                          const meatDisplayName = getDisplayName(option.name);
                          const meatDisplayName2 = getDisplayName2(option.name);

                          const headerText = this.add
                            .text(
                              this.cameras.main.centerX,
                              canvasHeight * 0.18,
                              `To cook to the correct temperature, tap and hold the ${meatDisplayName}.` /* 
                              `Start cooking the ${meatDisplayName} by tapping and holding the ${meatDisplayName}.`, */,
                              {
                                fontSize: `${Math.floor(48 * scaleFactor)}px`,
                                fontFamily: "Asap",
                                fill: "#ffffff",
                                align: "center",
                                shadow: {
                                  color: "#000000",
                                  blur: 2,
                                  fill: true,
                                },
                              }
                            )
                            .setOrigin(0.5);
                          headerText.alpha = 0;
                          if (global.language == "FR") {
                            headerText.setFontSize(
                              `${Math.floor(44 * scaleFactor)}px`
                            );
                          }
                          // Add HTML progress bar
                          if (
                            !document.querySelector(
                              ".cooking-progress-container"
                            )
                          ) {
                            const progressContainer =
                              document.createElement("div");
                            progressContainer.className =
                              "cooking-progress-container";

                            const progressText = document.createElement("div");
                            progressText.className = "cooking-progress-text";
                            progressText.textContent = "";

                            const progressBar = document.createElement("div");
                            progressBar.className = "cooking-progress-bar";

                            const progressFill = document.createElement("div");
                            progressFill.className = "cooking-progress-fill";
                            progressBar.style.display = "none";
                            progressBar.appendChild(progressFill);
                            progressContainer.appendChild(progressText);
                            progressContainer.appendChild(progressBar);
                            document.body.appendChild(progressContainer);
                          }

                          // Initialize progress
                          this.cookingProgress = 0;
                          const progressContainer = document.querySelector(
                            ".cooking-progress-container"
                          );
                          const progressFill = document.querySelector(
                            ".cooking-progress-fill"
                          );

                          // Show progress bar after delay
                          this.time.delayedCall(1200, () => {
                            progressContainer.style.display = "block";

                            // Start auto progress
                            this.progressTimer = this.time.addEvent({
                              delay: 1,
                              callback: () => {
                                // Only increase progress if temperature is safe
                                if (currentTextState === "safe") {
                                  this.cookingProgress = Math.min(
                                    100,
                                    this.cookingProgress + 0.1
                                  );
                                  progressFill.style.width = `${this.cookingProgress}%`;
                                }

                                // Start fading in cooked meat at 50% progress
                                if (this.cookingProgress >= 50) {
                                  
                                  if (this.progressTimer) {
                                    this.progressTimer.remove();
                                  }
                                  if (this.inactivityTimer)
                                    clearTimeout(this.inactivityTimer);
                                  return;
                                  const fadeAmount =
                                    (this.cookingProgress - 50) / 50; // Fade over 50% of progress
                                  cookedMeat.setAlpha(fadeAmount);
                                  // Add smoke effect if not already added
                                  if (this.smoke) {
                                    this.smoke.destroy();
                                    this.smoke = null;
                                  }
                                  if (this.smoke) {
                                    this.smoke = this.add.image(
                                      cookedMeat.x,
                                      cookedMeat.y -
                                        cookedMeat.displayHeight * 0.2,
                                      "smoke"
                                    );
                                    this.smoke.setScale(0.7);
                                    this.smoke.setAlpha(0);
                                    this.smoke.setDepth(3); // Above the meat

                                    // Fade in smoke
                                    this.tweens.add({
                                      targets: this.smoke,
                                      alpha: 0.8,
                                      duration: 800,
                                      ease: "Power2",
                                    });

                                    // Add floating animation
                                    this.tweens.add({
                                      targets: this.smoke,
                                      y: this.smoke.y - 70,
                                      duration: 2500,
                                      ease: "Power1",
                                      yoyo: true,
                                      repeat: -1,
                                    });
                                  }
                                }

                                if (this.cookingProgress >= 100) {
                                  
                                  if (this.progressTimer) {
                                    this.progressTimer.remove();
                                  }
                                  this.time.delayedCall(500, () => {
                                    progressContainer.style.display = "none";

                                    //this.scene.start('Game', { selectedMeat: option.name });
                                  });
                                }
                              },
                              loop: true,
                            });
                          });

                          // Clean up when scene changes
                          this.events.once("shutdown", () => {
                            if (progressContainer) {
                              progressContainer.remove();
                            }
                            if (this.progressTimer) {
                              this.progressTimer.remove();
                            }
                          });

                          // Fade in header
                          this.tweens.add({
                            targets: headerText,
                            alpha: 1,
                            duration: 500,
                            ease: "Power2",
                            delay: 1200,
                          });

                          // Initialize temperature mechanics
                          let currentTemp = 0;
                          const maxTemp = 100;
                          let targetTemp = 70;
                          targetTemp =
                            option.name === "chicken_uncooked"
                              ? 74
                              : option.name === "beef_uncooked"
                              ? 71
                              : 70;

                          const tempIncreasePerTap = 5;
                          const tempDecreaseRate = 2;
                          let tempUpdateTimer;
                          this.tapCount = 0;
                          let hasShownInitialText = false;
                          let currentTextState = "start";

                          // Function to flash text
                          const flashText = (text, color) => {
                            if (headerText.flashTween) {
                              headerText.flashTween.remove();
                            }

                            headerText.setText(text);
                            headerText.setStyle({ fill: color });
                            headerText.setAlpha(1);

                            headerText.flashTween = this.tweens.add({
                              targets: headerText,
                              alpha: 0.5,
                              delay: 500,
                              duration: 500,
                              yoyo: true,
                              repeat: -1,
                              ease: "Sine.easeInOut",
                            });
                          };

                          // Initial flash

                          if (global.language == "FR") {
                            flashText(
                              `Pour cuire à la température \nsécuritaire, taper et garder \nvotre doigt sur le ${meatDisplayName}`,
                              "#ffffff"
                            );
                          } else {
                            flashText(
                              `To cook to the correct \ntemperature, tap and hold \nthe ${meatDisplayName}`,
                              "#ffffff"
                            );
                          }
                          this.startInactivityTimer();

                          // Function to update temperature display
                          const updateTemp = () => {
                            const previousTemp = currentTemp;

                            if (isPressingCookArea) {
                              // Increase temperature when pressing
                              currentTemp = Math.min(
                                currentTemp + tempIncreasePerTap,
                                maxTemp
                              );

                              // Calculate opacity based on temperature progress
                              const tempProgress = currentTemp / targetTemp;
                              const opacity = Math.min(tempProgress, 1);
                              cookedMeat.setAlpha(opacity);

                              // Add heartbeat effect when temperature is rising
                              if (currentTemp > previousTemp) {
                                // Stop any existing heartbeat tween
                                if (thermometer.heartbeatTween) {
                                  thermometer.heartbeatTween.stop();
                                }

                                const originalScale = scaleFactor * 0.3;
                                thermometer.setScale(originalScale * 1.02);
                                setTimeout(() => {
                                  thermometer.setScale(originalScale);
                                }, 80);
                                
                              }
                            } else {
                              // Decrease temperature when not pressing
                              //currentTemp = Math.max(currentTemp - tempDecreaseRate, 0);
                            }

                            // Update temperature display
                            if (currentTemp <= targetTemp) {
                              tempText.setText(`${Math.round(currentTemp)}°C`);
                            } else {
                              currentTemp = targetTemp;
                              tempText.setText(`${Math.round(targetTemp)}°C`);
                              //tempText.setText(`${Math.round(targetTemp)}°C`);
                              // Show a floating temperature display
                              if (!this.tempTextFloat) {
                                this.tempTextFloat = this.add
                                  .text(
                                    cookedMeat.x,
                                    cookedMeat.y +
                                      cookedMeat.displayHeight * 0.5,
                                    `${Math.round(targetTemp)}°C`,
                                    {
                                      fontSize: "180px",
                                      fill: "#00ff00",
                                      fontFamily: "Asap",
                                      stroke: "#ffffff",
                                      strokeThickness: 12,
                                    }
                                  )
                                  .setOrigin(0.5);
                                this.tempTextFloat.setDepth(5);
                                this.tempTextFloat.setScale(0.5);
                                this.tempTextFloat.alpha = 0.9;

                                this.tweens.add({
                                  targets: this.tempTextFloat,
                                  alpha: 0,
                                  scale: 0.9,
                                  y: this.tempTextFloat.y - 200,
                                  duration: 2750,
                                  delay: 0,
                                  ease: "Power2",
                                  onComplete: () => {
                                    this.tempTextFloat.destroy();
                                  },
                                });
                              }
                            }
                            if (currentTemp === targetTemp) {
                            }
                            updateTempDisplay();

                            // Progress cooking if temperature is above target
                            if (currentTemp >= targetTemp) {
                              this.cookingProgress = Math.min(
                                100,
                                this.cookingProgress + 0.5
                              );
                              progressFill.style.width = `${this.cookingProgress}%`;

                              // Update cooked meat visibility as cooking progresses
                              if (this.cookingProgress > 50) {
                                
                                if (tempUpdateTimer) {
                                  tempUpdateTimer.destroy();
                                }
                                if (this.inactivityTimer)
                                  clearTimeout(this.inactivityTimer);
                                /* if (headerText.flashTween)
                                  headerText.flashTween.remove(); */
                                cookingAreaGraphics.disableInteractive();
                                const fadeAmount =
                                  (this.cookingProgress - 50) / 50; // Fade over 50% of progress
                                cookedMeat.setAlpha(1);

                                // Add smoke effect if not already added
                                if (this.smoke) this.smoke.destroy();
                                this.smoke = this.add.image(
                                  cookedMeat.x,
                                  cookedMeat.y - cookedMeat.displayHeight * 0.2,
                                  "smoke"
                                );
                                this.smoke.setScale(0.7);
                                this.smoke.setAlpha(0);
                                this.smoke.setDepth(3); // Above the meat

                                // Fade in smoke
                                this.tweens.add({
                                  targets: this.smoke,
                                  alpha: 0.8,
                                  duration: 800,
                                  ease: "Power2",
                                });

                                // Add floating animation
                                this.tweens.add({
                                  targets: this.smoke,
                                  y: this.smoke.y - 70,
                                  duration: 2500,
                                  ease: "Power1",
                                  yoyo: true,
                                  repeat: -1,
                                });
                                setTimeout(() => {
                                  if (headerText.flashTween) {
                                    headerText.flashTween.remove();
                                  }
                                  headerText.setFontSize(
                                    `${Math.floor(36 * 1.4)}px`
                                  );
                                  headerText.setText(this.fnShowHotTip());
                                  headerText.setStyle({ fill: "#FFFFFF" });
                                  headerText.setAlpha(1);
                                }, 2000);

                                this.tweens.add({
                                  targets: [
                                    /* thermometer, */
                                    /* tempText, */
                                    this.headerText,
                                    headerText,
                                    progressContainer,
                                  ],
                                  alpha: 0,
                                  delay: 5000,
                                  duration: 500,
                                  ease: "Power2",
                                  onComplete: () => {
                                    /* thermometer.destroy(); */
                                    /* tempText.destroy(); */

                                    progressContainer.style.display = "none";
                                    cookedMeat2.destroy();
                                    // Wait 2 seconds then fade out everything else
                                    this.time.delayedCall(100, () => {
                                      headerText.destroy();

                                      // Fade out background and meats
                                      this.tweens.add({
                                        targets: [
                                          thermometer,
                                          tempText,
                                          container,
                                          cookedMeat,
                                          this.smoke,
                                          /* this.cookingAreaGraphics, */
                                        ],
                                        alpha: 0,
                                        duration: 500,
                                        ease: "Power2",
                                        onComplete: () => {
                                          selectedImage.destroy();
                                          cookedMeat.destroy();

                                          container.destroy();
                                          this.image.destroy();
                                          if (this.smoke) this.smoke.destroy();
                                          if (this.cookingAreaGraphics)
                                            this.cookingAreaGraphics.destroy();
                                          this.showFinalScreen();
                                        },
                                      });
                                    });
                                  },
                                });
                              }

                              // Check if cooking is complete
                              if (this.cookingProgress >= 100) {
                                
                                // Disable cooking area interaction immediately
                                cookingAreaGraphics.removeInteractive();

                                isPressingCookArea = false;

                                // Stop the temperature update timer
                                if (tempUpdateTimer) {
                                  tempUpdateTimer.destroy();
                                }
                                if (headerText.flashTween)
                                  headerText.flashTween.remove();

                                // Fade out all UI elements
                                this.tweens.add({
                                  targets: [
                                    /* thermometer, */
                                    /* tempText, */
                                    this.headerText,
                                    headerText,
                                    progressContainer,
                                  ],
                                  alpha: 0,
                                  duration: 500,
                                  ease: "Power2",
                                  onComplete: () => {
                                    /* thermometer.destroy(); */
                                    /* tempText.destroy(); */
                                    headerText.destroy();

                                    progressContainer.style.display = "none";

                                    // Wait 2 seconds then fade out everything else
                                    this.time.delayedCall(2000, () => {
                                      // Fade out background and meats
                                      this.tweens.add({
                                        targets: [
                                          /* container, */
                                          this.smoke,
                                          /* this.cookingAreaGraphics, */
                                        ],
                                        alpha: 0,
                                        duration: 500,
                                        ease: "Power2",
                                        onComplete: () => {
                                          selectedImage.destroy();
                                          cookedMeat.destroy();
                                          cookedMeat2.destroy();
                                          container.destroy();
                                          this.image.destroy();
                                          if (this.smoke) this.smoke.destroy();
                                          if (this.cookingAreaGraphics)
                                            this.cookingAreaGraphics.destroy();
                                          this.showFinalScreen();
                                        },
                                      });
                                    });
                                  },
                                });

                                // Fade out raw meat
                                this.tweens.add({
                                  targets: selectedImage,
                                  alpha: 0,
                                  duration: 500,
                                  ease: "Power2",
                                });
                                // Clean up and show final screen
                                //this.showFinalScreen();
                              }
                            }
                          };
                          // Start temperature update timer
                          tempUpdateTimer = this.time.addEvent({
                            delay: 400, // Update every 100ms
                            callback: updateTemp,
                            loop: true,
                          });

                          

                          // Function to update temperature display
                          const updateTempDisplay = () => {
                            // After 3 taps, clear initial text
                            if (
                              this.tapCount >= 1 &&
                              currentTextState === "start"
                            ) {
                              currentTextState = "monitoring";
                            }
                            

                            if (currentTextState !== "start") {
                              if (currentTemp >= targetTemp) {
                                if (currentTextState !== "safe") {
                                  currentTextState = "safe";
                                  flashText(
                                    global.language == "FR"
                                      ? `Super ! Le ${meatDisplayName} est à la \nbonne température sécuritaire`
                                      : `Great! ${meatDisplayName2} is at the\ncorrect safe temperature`,
                                    "#FBDF42"
                                  );
                                }
                              } else {
                                if (currentTextState !== "unsafe") {
                                  currentTextState = "unsafe";
                                  flashText(
                                    global.language == "FR"
                                      ? `Oups ! Le ${meatDisplayName} n'est pas \nà une température sécuritaire`
                                      : `Oops! ${meatDisplayName2} is not at a\nsafe temperature`,
                                    "#ff0000"
                                  );
                                }
                              }
                            }

                            // After initial text is cleared, show warning based on temperature
                            if (currentTextState !== "start") {
                              if (currentTemp >= targetTemp) {
                                if (currentTextState !== "safe") {
                                  currentTextState = "safe";
                                  flashText(
                                    global.language == "FR"
                                      ? `Super ! Le ${meatDisplayName} est à la \nbonne température sécuritaire`
                                      : `Great! ${meatDisplayName2} is at the\ncorrect safe temperature`,
                                    "#FBDF42"
                                  );
                                }
                              } else {
                                if (currentTextState !== "unsafe") {
                                  currentTextState = "unsafe";
                                  flashText(
                                    global.language == "FR"
                                      ? `Oups ! Le ${meatDisplayName} n'est pas \nà une température sécuritaire`
                                      : `Oops! ${meatDisplayName2} is not at a\nsafe temperature`,
                                    "#ff0000"
                                  );
                                }
                              }
                            }

                            // Change thermometer and text based on temperature
                            if (currentTemp >= targetTemp) {
                              tempText.setStyle({ fill: "#000000" });
                              thermometer.setTexture("indicator2");
                            } /* else if (currentTemp >= 49) {
                              tempText.setStyle({ fill: "#490103" });
                              thermometer.setTexture("indicator2");
                            } */ else {
                              tempText.setStyle({ fill: "#ffffff" });
                              thermometer.setTexture("indicator1");
                            }
                          };

                          // Clean up when scene changes
                          this.events.once("shutdown", () => {
                            if (headerText.flashTween) {
                              headerText.flashTween.remove();
                            }
                          });

                          // Fade out the text separately
                          this.tweens.add({
                            targets: selectedText,
                            alpha: 0,
                            duration: 300,
                            ease: "Power2",
                          });
                        },
                      });
                    },
                  });

                  // Fade out the text separately
                  this.tweens.add({
                    targets: selectedText,
                    alpha: 0,
                    duration: 300,
                    ease: "Power2",
                  });
                },
              });
            },
          });
        }
      });

      this.optionContainers.push(container);
    });

    // Fade in title and options with sequence
    this.tweens.add({
      targets: this.selectionTitle,
      alpha: 1,
      duration: 500,
      ease: "Power2",
    });

    this.optionContainers.forEach((container, index) => {
      this.tweens.add({
        targets: container,
        alpha: 1,
        duration: 500,
        ease: "Power2",
        delay: 300 + index * 200,
        onComplete: () => {
          if (index === this.optionContainers.length - 1) {
            // Set to false before starting glow sequence
            this.isTransitioning = false;
            this.startGlowSequence(scaleFactor);
          }
        },
      });
    });
  }

  startGlowSequence(scaleFactor) {
    // Add glow effect to all options
    this.optionContainers.forEach((container, index) => {
      const image = container.list[0];
      const text = container.list[1];

      // Add glow effect to image
      const glowFX = image.preFX.addGlow(0xffffff, 0, 0, false);

      // Create continuous glow animation
      this.tweens.add({
        targets: glowFX,
        outerStrength: 4,
        innerStrength: 1,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        delay: index * 1000, // Stagger the start of each glow
      });

      // Add subtle scale animation only to the image
      this.tweens.add({
        targets: image,
        scaleX: image.scaleX * 1.05,
        scaleY: image.scaleY * 1.05,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        delay: index * 1000, // Match the glow delay
      });
    });
  }

  fnfetchAPI(trackingURL) {
    fetch(trackingURL, { method: "GET" })
      .then((response) => console.log("Tracking sent:", response.status))
      .catch((error) => console.error("Tracking error:", error));
  }

  fnShowHotTip() {
    
    let hotTipText = "";
    switch (this.meatName) {
      case "chicken":
        hotTipText =
          global.language == "FR"
            ? "Truc de pro :\nInsérez le thermomètre dans \nla partie la plus épaisse de la viande"
            : "HOT TIP :\nInsert thermometer in \nthickest part of the meat";
        break;
      case "beef":
        hotTipText =
          global.language == "FR"
            ? "Truc de pro :\nPour les burgers, insérez \nle thermomètre dans le côté"
            : "HOT TIP :\nFor burgers, insert the \nthermometer through the side";
        break;
      case "salmon":
        hotTipText =
          global.language == "FR"
            ? "Truc de pro :\nToujours laver le thermomètre \navant de le réutiliser"
            : "HOT TIP :\nAlways wash thermometer \nbefore using it again";
        break;
      default:
        hotTipText = "";
    }
    return hotTipText;
  }

  startInactivityTimer() {
    
    this.inactivityTimer = null;
    const handleInactivity = () => {
      if (this.inactivityTimer) {
        
        clearTimeout(this.inactivityTimer);
      }
      this.inactivityTimer = setTimeout(() => {
        
        this.cameras.main.fadeOut(500, 0, 0, 0);
        setTimeout(() => {
          this.clickBG = false;
          this.meatName = "";
          if (this.tempTextFloat) {
            this.tempTextFloat.destroy();
            this.tempTextFloat = null;
          }
          this.tapCount = 0;
          this.isTransitioning = false;
          this.scene.stop("MainMenu");
          this.scene.start("Game");
        }, 500);
        /* this.tweens.add({
          targets: [headerText, cookedMeat, thermometer],
          alpha: 0,
          duration: 1000,
          ease: "Power2",
          onComplete: () => {
            this.scene.start("Game", {
              selectedMeat: option.name,
            });
          },
        }); */
      }, 10000);
    };

    // Reset inactivity timer on any input
    this.input.on(Phaser.Input.Events.POINTER_DOWN, handleInactivity);
    this.input.on(Phaser.Input.Events.POINTER_UP, handleInactivity);
    /* this.input.on(Phaser.Input.Events.POINTER_MOVE, handleInactivity);
    this.input.on(Phaser.Input.Events.POINTER_WHEEL, handleInactivity); */
  }

  showFinalScreen() {
    if (this.clickBG) return;
    this.clickBG = true;
    this.mainlogo.setAlpha(0);
    this.clickBG = false;
    this.meatName = "";
    if (this.tempTextFloat) {
      this.tempTextFloat.destroy();
      this.tempTextFloat = null;
    }
    this.tapCount = 0;
    this.isTransitioning = false;
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.scene.stop("MainMenu");
    this.scene.start("Game");
    
  }

  update() {
    if (this.tempText && this.thermometer) {
      this.tempText.x =
        this.thermometer.x - this.thermometer.displayWidth * 0.22;
      this.tempText.y =
        this.thermometer.y - this.thermometer.displayHeight * 0.3;
    }
  }
}
