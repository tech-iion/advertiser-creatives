import { Scene } from "phaser";
import { getCanvasDimensions } from "../utils/canvasConfig";
import { global } from "../utils/global";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    const { canvasWidth, canvasHeight } = getCanvasDimensions(this, true);

    this.fnfetchAPI(window.trackingType + "ExperienceComplete");

    // Create final screen elements
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    this.cameras.main.fadeIn(500, 0, 0, 0);
    // Add "Well Done!" text
    const wellDoneText = this.add
      .text(centerX, canvasHeight * 0.2, "Well Done!", {
        fontSize: "80px",
        fontFamily: "Asap",
        fill: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    // Add food safety tips text
    const tipsText = this.add
      .text(centerX, canvasHeight * 0.35, "For more food safety tips, visit", {
        fontSize: "50px",
        fontFamily: "Asap",
        fill: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    // Add Canada.ca link
    const linkText = this.add
      .text(centerX, canvasHeight * 0.4, "Canada.ca/foodsafety", {
        fontSize: "50px",
        fontFamily: "Asap",
        fill: "#FBDF42",
        align: "center",
      })
      .setOrigin(0.5);

    if (global.language == "FR") {
      wellDoneText.setText("Bien joué !");
      tipsText.setText(
        "Pour plus de conseils sur la \ncuisson sécuritaire, visitez"
      );
      linkText.setText("Canada.ca/salubrite-aliments");
    }

    // Add try again button
    const tryAgainBtn = this.add
      .image(centerX, canvasHeight * 0.6, "tryagainbtn" + global.language)
      .setInteractive({ useHandCursor: true })
      .setScale(0.5);

    const learnBtn = this.add
      .image(centerX, canvasHeight, "learnBtn" + global.language)
      .setInteractive({ useHandCursor: true })
      .setScale(0.56)
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

    // Add hover effects for try again button
    tryAgainBtn.on("pointerover", () => {
      this.tweens.add({
        targets: tryAgainBtn,
        scale: 0.54,
        duration: 100,
        ease: "Power2",
      });
    });

    tryAgainBtn.on("pointerout", () => {
      this.tweens.add({
        targets: tryAgainBtn,
        scale: 0.5,
        duration: 100,
        ease: "Power2",
      });
    });

    // Add click handler for try again button
    tryAgainBtn.on("pointerdown", () => {
      this.fnfetchAPI(window.trackingType + "TryAgain");
      global.retryCount++;
      this.cameras.main.fadeOut(500, 0, 0, 0);
      setTimeout(() => {
        this.scene.start("MainMenu");
      }, 500);
      /* this.smoke.destroy();
      this.clickBG = false;
      this.meatName = "";
      this.tempTextFloat.destroy();
      this.tempTextFloat = null;
      this.tapCount = 0;
      this.image = this.add.image(
        canvasWidth / 2,
        canvasHeight / 2,
        "background"
      );
      this.image.setOrigin(0.5);
      this.image.setScale(1.4 * 0.55);
      this.image.alpha = 0;
      // Fade out everything
      const elements = [
        wellDoneText,
        tipsText,
        linkText,
        tryAgainBtn,
        learnBtn,
      ];
      this.tweens.add({
        targets: elements,
        alpha: 0,
        duration: 500,
        ease: "Power2",
        onComplete: () => {
          // Clean up elements
          elements.forEach((element) => element.destroy());

          // Reset game state
          this.isGameStarted = false;
          this.isCooking = false;
          this.cookingProgress = 0;

          // Reset and remove progress bar
          const progressContainer = document.querySelector(
            ".cooking-progress-container"
          );
          if (progressContainer) {
            progressContainer.remove();
          }

          // Show background image again
          if (this.image) {
            this.image.setAlpha(1);
          }

          // Show selection page again
          this.showSelectionPage();
        },
      }); */
    });

    // Make elements initially invisible and fade them in
    const elements = [wellDoneText, tipsText, linkText, tryAgainBtn];
    learnBtn.setAlpha(0);
    learnBtn.y += 50; // Start from below
    elements.forEach((element, index) => {
      element.setAlpha(0);
      // Slight offset for each element
      element.y += index * 20;
    });

    // Fade in elements sequentially
    this.tweens.add({
      targets: elements,
      alpha: 1,
      y: "-=20",
      duration: 500,
      ease: "Back.easeOut",
      delay: this.tweens.stagger(200),
      onComplete: () => {
        // Add subtle floating animation
        elements.forEach((element) => {
          this.tweens.add({
            targets: element,
            y: "+=5",
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
          });
        });

        // Separate learn button animation
        this.tweens.add({
          targets: learnBtn,
          alpha: 1,
          y: "-=50",
          duration: 700,
          ease: "Back.easeOut",
          onComplete: () => {
            // Add floating animation for learn button
            this.tweens.add({
              targets: learnBtn,
              y: "+=8",
              duration: 2500,
              yoyo: true,
              repeat: -1,
              ease: "Sine.easeInOut",
            });
          },
        });
      },
    });
  }

  fnfetchAPI(trackingURL) {
    fetch(trackingURL, { method: "GET" })
      .then((response) => console.log("Tracking sent:", response.status))
      .catch((error) => console.error("Tracking error:", error));
  }
}
