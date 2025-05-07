import { p as t } from "./phaser-C2RWnc_5.js";
!(function () {
  const t = document.createElement("link").relList;
  if (!(t && t.supports && t.supports("modulepreload"))) {
    for (const t of document.querySelectorAll('link[rel="modulepreload"]'))
      e(t);
    new MutationObserver((t) => {
      for (const i of t)
        if ("childList" === i.type)
          for (const t of i.addedNodes)
            "LINK" === t.tagName && "modulepreload" === t.rel && e(t);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function e(t) {
    if (t.ep) return;
    t.ep = !0;
    const e = (function (t) {
      const e = {};
      return (
        t.integrity && (e.integrity = t.integrity),
        t.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
        "use-credentials" === t.crossOrigin
          ? (e.credentials = "include")
          : "anonymous" === t.crossOrigin
          ? (e.credentials = "omit")
          : (e.credentials = "same-origin"),
        e
      );
    })(t);
    fetch(t.href, e);
  }
})();
class e extends t.Scene {
  constructor() {
    super("Boot");
  }
  preload() {
    this.load.image("background", window.trackingPath + "/beachbg.png");
  }
  create() {
    this.scene.start("Preloader");
  }
}
function i(t, e) {
  const i = /Mobi|Android/i.test(navigator.userAgent),
    s = /iPhone/i.test(navigator.userAgent),
    a = window.innerWidth,
    h = window.innerHeight;
  let l, n;
  (l = t.game.canvas.width), (n = t.game.canvas.height);
  const o = document.getElementsByTagName("canvas")[0],
    r = (Math.abs(parseFloat(o.style.marginTop || 0)) / a) * l + (s ? 130 : 0),
    p = (Math.abs(parseFloat(o.style.marginLeft || 0)) / h) * n;
  let c = (h / (a + 2 * p)) * 0.85;
  return i
    ? {
        canvasWidth: l,
        canvasHeight: n,
        scaleFactor: c,
        topMarginOffset: r,
        leftMarginOffsetPercentage: p,
        isMobileDevice: i,
        isIphoneDevice: s,
      }
    : ((c = 1.4),
      {
        canvasWidth: l,
        canvasHeight: n,
        scaleFactor: c,
        topMarginOffset: 0,
        leftMarginOffsetPercentage: 0,
      });
}
class s extends t.Scene {
  constructor() {
    super("MainMenu");
  }
  create() {
    const {
        canvasWidth: t,
        canvasHeight: e,
        scaleFactor1: s,
        topMarginOffset: a,
        leftMarginOffsetPercentage: h,
        isMobileDevice: l,
        isIphoneDevice: n,
      } = i(this),
      o = 1.4;
    (this.bgMusic = this.sound.add("backgroundmp3", { volume: 0.2, loop: !0 })),
      (this.sc = 2),
      (this.sc2 = 4),
      (this.scaleFactor = o),
      (this.canvasWidth = t),
      (this.canvasHeight = e),
      (this.clickBG = !1),
      (this.image = this.add.image(t / 2, 0.5 * e, "background")),
      this.image.setOrigin(0.5),
      this.image.setScale(3.15),
      (this.image.alpha = 0),
      this.tweens.add({
        targets: this.image,
        alpha: 1,
        duration: 800,
        ease: "Power2",
        onComplete: () => {
          this.tweens.add({
            targets: this.image,
            scale: 3.15,
            duration: 3200,
            ease: "Linear",
            repeat: -1,
            yoyo: !0,
          });
        },
      }),
      (this.logo = this.add.image(t / 2, 0.2 * e, "logo2")),
      this.logo.setOrigin(0.5).setDepth(160),
      this.logo.setScale(0.65 * o),
      (this.logo.alpha = 0),
      (this.disneyET2 = this.add.image(
        this.canvasWidth / 2,
        0.2 * this.canvasHeight,
        "disneyET"
      )),
      this.disneyET2.setOrigin(0.5).setDepth(161),
      this.disneyET2.setScale(0.5 * this.scaleFactor),
      (this.disneyET2.alpha = 1),
      (this.disneyET2.y = this.logo.y + 0.55 * this.logo.displayHeight),
      this.tweens.add({
        targets: [this.logo, this.disneyET2],
        alpha: 1,
        duration: 800,
        ease: "Power2",
      }),
      (this.subtext = this.add.image(t / 2, 0.45 * e, "subtext")),
      this.subtext.setOrigin(0.5),
      this.subtext.setScale(0.7),
      (this.subtext.alpha = 0),
      this.tweens.add({
        targets: this.subtext,
        alpha: 1,
        duration: 800,
        ease: "Power2",
      }),
      (this.taptoplay = this.add.image(t / 2, 0.6 * e, "taptoplay")),
      this.taptoplay.setOrigin(0.5),
      this.taptoplay.setScale(0.42),
      (this.taptoplay.alpha = 0),
      this.tweens.add({
        targets: this.taptoplay,
        alpha: 1,
        y: this.subtext.y + 0.9 * this.subtext.height,
        duration: 800,
        ease: "Power2",
        onComplete: () => {
          this.tweens.add({
            targets: this.taptoplay,
            scaleX: 0.33 * o,
            scaleY: 0.33 * o,
            duration: 400,
            ease: "Power2",
            repeat: -1,
            yoyo: !0,
          }),
            (this.fullScreenTap = this.add.rectangle(
              0,
              0,
              this.canvasWidth,
              this.canvasHeight,
              16777215,
              0.01
            )),
            this.fullScreenTap.setOrigin(0, 0),
            this.fullScreenTap.setInteractive(),
            this.fullScreenTap.on("pointerdown", () => this.onTapToPlay()),
            this.fullScreenTap.setDepth(140);
        },
      }),
      (this.liloSit = this.add.sprite(0.3 * t, 0.95 * e, "lilosit2")),
      this.liloSit.setOrigin(0.5, 1),
      this.liloSit.setScale(0.21 * this.sc2),
      (this.liloSit.depth = 2),
      (this.liloSit.alpha = 0),
      this.tweens.add({
        targets: this.liloSit,
        alpha: 1,
        duration: 800,
        ease: "Power2",
        onComplete: () => {},
      }),
      (this.pineapples = []);
    let r = 0;
    const p = 0.5 * t,
      c = 0.9 * e,
      d = [
        {
          x: 0.15 * -t + 0.5 * t,
          y: 0.04 * e,
          scale: 0.27,
          angle: -30,
          depth: 1,
        },
        { x: 0.1 * -t + 0.5 * t, y: 0.02 * e, scale: 0.3, angle: 10, depth: 1 },
        { x: 0.15 * t + 0.5 * t, y: 0.1 * e, scale: 0.32, angle: 80, depth: 1 },
        {
          x: 0.25 * -t + 0.5 * t,
          y: 0.08 * e,
          scale: 0.28,
          angle: 90,
          depth: 1,
        },
        {
          x: 0.1 * -t + 0.5 * t,
          y: 0.05 * e,
          scale: 0.32,
          angle: -80,
          depth: 1,
        },
        { x: 0.05 * -t + 0.5 * t, y: 0, scale: 0.3, angle: 90, depth: 1 },
        {
          x: 0.15 * -t + 0.5 * t,
          y: 0.05 * e,
          scale: 0.29,
          angle: 45,
          depth: 1,
        },
        {
          x: 0.1 * -t + 0.5 * t,
          y: 0.05 * e,
          scale: 0.29,
          angle: 120,
          depth: 1,
        },
        {
          x: 0.12 * -t + 0.5 * t,
          y: 0.05 * e,
          scale: 0.29,
          angle: 240,
          depth: 1,
        },
        {
          x: 0.1 * -t + 0.5 * t,
          y: 0.05 * e,
          scale: 0.32,
          angle: 70,
          depth: 1,
        },
        { x: 0 * t + 0.5 * t, y: 0.05 * e, scale: 0.32, angle: -100, depth: 1 },
        {
          x: 0.1 * t + 0.5 * t,
          y: 0.15 * e,
          scale: 0.32,
          angle: -30,
          depth: 3,
        },
      ];
    r = d.length;
    for (let i = 0; i < r; i++) {
      const t = d[i],
        e = this.add.image(p + t.x, c + t.y, "pineapple");
      e.setOrigin(0.5, 1),
        e.setScale(o * t.scale * this.sc),
        e.setAngle(t.angle),
        (e.alpha = 0),
        (e.depth = t.depth),
        this.pineapples.push(e),
        this.tweens.add({
          targets: e,
          alpha: 1,
          duration: 800,
          delay: 50 * i,
          ease: "Power2",
        });
    }
    (this.graphics = this.add.graphics()),
      this.graphics.fillStyle(16711680, 1),
      this.graphics.setDepth(100);
  }
  onTapToPlay() {
    this.bgMusic.play(),
      this.fullScreenTap.disableInteractive(),
      this.fullScreenTap.destroy(),
      this.fnfetchAPI(window.trackingType + "StartPlayableClicked"),
      this.isTransitioning ||
        ((this.isTransitioning = !0),
        this.tweens.add({
          targets: this.taptoplay,
          scaleX: 1.2 * this.taptoplay.scaleX,
          scaleY: 1.2 * this.taptoplay.scaleY,
          duration: 100,
          yoyo: !0,
          onComplete: () => {
            this.removeElementsInReverseOrder();
          },
        }));
  }
  addElementsagainInOrder() {
    this.pineapples.slice().forEach((t, e) => {
      this.tweens.add({
        targets: t,
        alpha: 1,
        y: t.y - 50,
        duration: 300,
        ease: "Power2",
        delay: 50 * e,
      });
    });
  }
  removePineapples() {
    this.pineapples
      .slice()
      .reverse()
      .forEach((t, e) => {
        this.tweens.add({
          targets: t,
          alpha: 0,
          y: t.y + 50,
          duration: 100,
          ease: "Power2",
          delay: 50 * e,
        });
      });
  }
  removeElementsInReverseOrder() {
    this.removePineapples();
    const t = 50 * this.pineapples.length + 100;
    this.tweens.add({
      targets: this.liloSit,
      alpha: 0,
      y: this.liloSit.y - 50,
      duration: 300,
      ease: "Power2",
      delay: t,
      onComplete: () => {},
    }),
      this.tweens.add({
        targets: this.taptoplay,
        alpha: 0,
        y: this.taptoplay.y - 50,
        duration: 300,
        ease: "Power2",
        delay: t + 150,
      }),
      this.tweens.add({
        targets: this.subtext,
        alpha: 0,
        y: this.subtext.y - 50,
        duration: 300,
        ease: "Power2",
        delay: t + 300,
      }),
      this.tweens.add({
        targets: [this.logo, this.disneyET2],
        alpha: 0,
        y: this.logo.y - 50,
        duration: 300,
        ease: "Power2",
        delay: t + 450,
        onComplete: () => {
          this.time.removeAllEvents(),
            this.logo.setTexture("logo2"),
            this.logo.setScale(0.5 * this.scaleFactor),
            (this.logo.alpha = 0),
            this.tweens.add({
              targets: this.logo,
              alpha: 1,
              y: this.logo.y - 50,
              duration: 300,
              ease: "Power2",
              onComplete: () => {
                (this.disneyET2.y =
                  this.logo.y + 0.55 * this.logo.displayHeight),
                  this.tweens.add({
                    targets: this.disneyET2,
                    alpha: 1,
                    duration: 100,
                    ease: "Power2",
                    onComplete: () => {
                      this.fnstartGame();
                    },
                  });
              },
            });
        },
      });
  }
  fnstartGame() {
    (this.liloSit.visible = !0),
      (this.liloSit.x = this.canvasWidth / 2),
      this.liloSit.setTexture("lilo2"),
      this.liloSit.setScale(0.16 * this.scaleFactor * this.sc2),
      (this.liloSit.alpha = 0),
      (this.liloSit.y = this.canvasHeight + this.liloSit.displayHeight),
      (this.score = 0),
      (this.gameActive = !0),
      (this.fallingPineapples = []),
      (this.pineapplePhrases = [
        "Nom nom!",
        "Yum!",
        "Ohana snack!",
        "More pineapple!",
        "Stitch happy!",
        "Tasty!",
      ]),
      this.tweens.add({
        targets: this.liloSit,
        alpha: 1,
        y: this.canvasHeight + 0.4 * this.liloSit.displayHeight,
        duration: 200,
        ease: "Power2",
        onComplete: () => {
          this.fnaddLeafUI(),
            (this.gameTime = 15),
            this.timeValue.setText(this.gameTime.toString().padStart(2, "0")),
            (this.gameTimer = this.time.addEvent({
              delay: 1e3,
              callback: this.updateGameTimer,
              callbackScope: this,
              loop: !0,
            }));
          const t = {
            fontFamily: "BukaBird",
            fontSize: 30 * this.scaleFactor,
            fill: "#FFFFFF",
            align: "center",
            stroke: "#000000",
            strokeThickness: 6,
          };
          (this.dragInstruction = this.add.text(
            0.5 * this.canvasWidth,
            0.5 * this.canvasHeight,
            "DRAG THE STITCH\nTO COLLECT PINEAPPLES",
            t
          )),
            this.dragInstruction.setOrigin(0.5).setDepth(140),
            (this.dragInstruction.alpha = 0),
            this.tweens.add({
              targets: [this.dragInstruction],
              alpha: 1,
              duration: 500,
              ease: "Power2",
              onComplete: () => {
                this.time.delayedCall(3e3, () => {
                  this.tweens.add({
                    targets: [this.dragInstruction],
                    alpha: 0,
                    duration: 500,
                    ease: "Power2",
                  });
                });
              },
            }),
            this.setupLiloMovement(),
            this.startSpawningPineapples();
        },
      });
  }
  fnaddLeafUI() {
    (this.leaf1 = this.add.image(
      this.canvasWidth / 2,
      0.1 * this.canvasHeight,
      "leaf1"
    )),
      this.leaf1.setOrigin(0.5),
      this.leaf1.setScale(0.7 * this.scaleFactor).setDepth(130),
      (this.leaf1.alpha = 1),
      (this.leaf1.x = this.canvasWidth - 0.22 * this.leaf1.displayWidth),
      (this.leaf2 = this.add.image(
        this.canvasWidth / 2,
        0.1 * this.canvasHeight,
        "leaf1"
      )),
      this.leaf2.setOrigin(0.5),
      this.leaf2.setScale(0.7 * this.scaleFactor).setDepth(130),
      (this.leaf2.alpha = 1),
      (this.leaf2.flipX = !0),
      (this.leaf2.x = 0.18 * this.leaf1.displayWidth);
    const t = {
      fontFamily: "BukaBird",
      fontSize: 36 * this.scaleFactor,
      fill: "#FFFFFF",
      align: "center",
      stroke: "#1F2A1A",
      strokeThickness: 15,
    };
    (this.timeText = this.add.text(
      this.leaf2.x,
      this.leaf2.y - 0.1 * this.leaf2.displayHeight,
      "TIME",
      t
    )),
      this.timeText.setOrigin(0.5).setDepth(131);
    const e = {
      fontFamily: "BukaBird",
      fontSize: 36 * this.scaleFactor,
      fill: "#FFFFFF",
      align: "center",
      stroke: "#1F2A1A",
      strokeThickness: 15,
    };
    (this.scoreText = this.add.text(
      this.leaf1.x,
      this.leaf1.y - 0.1 * this.leaf1.displayHeight,
      "SCORE",
      e
    )),
      this.scoreText.setOrigin(0.5).setDepth(131);
    const i = {
        fontFamily: "BukaBird",
        fontSize: 48 * this.scaleFactor,
        fill: "#EFFF17",
        align: "center",
        stroke: "#1F2A1A",
        strokeThickness: 15,
      },
      s = {
        fontFamily: "BukaBird",
        fontSize: 48 * this.scaleFactor,
        fill: "#EFFF17",
        align: "center",
        stroke: "#1F2A1A",
        strokeThickness: 15,
      };
    (this.scoreValue = this.add.text(
      this.leaf1.x,
      this.leaf1.y + 0.01 * this.leaf1.displayHeight,
      "00",
      i
    )),
      this.scoreValue.setOrigin(0.5).setDepth(131),
      (this.timeValue = this.add.text(
        this.leaf2.x,
        this.leaf2.y + 0.01 * this.leaf2.displayHeight,
        "00",
        s
      )),
      this.timeValue.setOrigin(0.5).setDepth(131);
  }
  updateGameTimer() {
    if (
      this.gameActive &&
      (this.gameTime--,
      this.timeValue &&
        this.timeValue.setText(this.gameTime.toString().padStart(2, "0")),
      this.gameTime <= 0)
    ) {
      if (
        ((this.gameActive = !1),
        this.fnfetchAPI(window.trackingType + "PlayableEndClicked"),
        this.gameTimer.remove(),
        this.pineappleSpawnTimer && this.pineappleSpawnTimer.remove(),
        this.fallingPineapples && this.fallingPineapples.length > 0)
      ) {
        for (let t = 0; t < this.fallingPineapples.length; t++) {
          const e = this.fallingPineapples[t];
          e &&
            e.active &&
            this.tweens.add({
              targets: e,
              alpha: 0,
              scale: 0,
              duration: 300,
              ease: "Power2",
              onComplete: () => {
                e.destroy();
              },
            });
        }
        this.fallingPineapples = [];
      }
      this.liloSit &&
        this.liloSit.active &&
        this.tweens.add({
          targets: this.liloSit,
          alpha: 0,
          y: this.liloSit.y + 100,
          duration: 500,
          ease: "Power2",
          onComplete: () => {
            this.liloSit.visible = !1;
          },
        });
      const t = [
        this.leaf1,
        this.leaf2,
        this.timeText,
        this.timeValue,
        this.scoreText,
        this.scoreValue,
      ];
      this.tweens.add({
        targets: t,
        alpha: 0,
        duration: 400,
        ease: "Power2",
        onComplete: () => {
          t.forEach((t) => {
            t && t.active && (t.visible = !1);
          });
        },
      });
      const e = {
        fontFamily: "BukaBird",
        fontSize: 45 * this.scaleFactor,
        fill: "#EFFF17",
        align: "center",
        stroke: "#E10E14",
        strokeThickness: 15,
      };
      (this.finalScore = this.add.text(
        this.canvasWidth / 2,
        0.5 * this.canvasHeight,
        `${this.score.toString().padStart(2, "0")}`,
        e
      )),
        this.finalScore.setOrigin(0.5).setDepth(150),
        (this.finalScore.alpha = 0),
        this.tweens.add({
          targets: this.finalScore,
          alpha: 1,
          duration: 800,
          ease: "Power2",
        }),
        (this.subtext2 = this.add.image(
          this.canvasWidth / 2,
          0.3 * this.canvasHeight,
          "subtext2"
        )),
        this.subtext2.setOrigin(0.5),
        this.subtext2.setScale(0.7 * this.scaleFactor).setDepth(150),
        (this.subtext2.alpha = 0),
        (this.subtext2.y = this.logo.y + 0.9 * this.logo.displayHeight),
        this.tweens.add({
          targets: this.subtext2,
          alpha: 1,
          duration: 800,
          ease: "Power2",
        }),
        (this.finalScore.x =
          this.subtext2.x + 0.1 * this.subtext2.displayWidth),
        (this.subtext3 = this.add.image(
          this.canvasWidth / 2,
          0.4 * this.canvasHeight,
          "subtext3"
        )),
        this.subtext3.setOrigin(0.5),
        this.subtext3.setScale(0.7 * this.scaleFactor).setDepth(150),
        (this.subtext3.alpha = 0),
        (this.subtext3.y = this.subtext2.y + 0.9 * this.subtext2.displayHeight),
        this.tweens.add({
          targets: this.subtext3,
          alpha: 1,
          duration: 800,
          ease: "Power2",
        }),
        (this.finalScore.x =
          this.subtext2.x - 0.08 * this.subtext2.displayWidth),
        (this.finalScore.y =
          this.subtext2.y + 0.3 * this.subtext2.displayHeight),
        (this.playagain = this.add.image(
          this.canvasWidth / 2,
          0.5 * this.canvasHeight,
          "playagain"
        )),
        this.playagain.setOrigin(0.5),
        this.playagain.setScale(0.3 * this.scaleFactor),
        (this.playagain.alpha = 0),
        this.playagain.setDepth(160),
        this.playagain.setInteractive({ useHandCursor: !0 }),
        this.playagain.on("pointerdown", this.onPlayAgain, this),
        this.playagain.on("pointerover", () => {
          this.playagain.setScale(0.33 * this.scaleFactor);
        }),
        this.playagain.on("pointerout", () => {
          this.playagain.setScale(0.3 * this.scaleFactor);
        }),
        (this.watchTrailer = this.add.image(
          this.canvasWidth / 2,
          0.6 * this.canvasHeight,
          "watchtrailer"
        )),
        this.watchTrailer.setOrigin(0.5),
        this.watchTrailer.setScale(0.3 * this.scaleFactor),
        (this.watchTrailer.alpha = 0),
        this.watchTrailer.setDepth(160),
        this.watchTrailer.setInteractive({ useHandCursor: !0 }),
        this.watchTrailer.on("pointerdown", this.onWatchTrailer, this),
        this.watchTrailer.on("pointerover", () => {
          this.watchTrailer.setScale(0.33 * this.scaleFactor);
        }),
        this.watchTrailer.on("pointerout", () => {
          this.watchTrailer.setScale(0.3 * this.scaleFactor);
        }),
        this.tweens.add({
          targets: this.playagain,
          alpha: 1,
          duration: 800,
          ease: "Power2",
        }),
        this.tweens.add({
          targets: this.watchTrailer,
          alpha: 1,
          duration: 800,
          ease: "Power2",
        }),
        (this.lilojump = this.add.sprite(
          0.3 * this.canvasWidth,
          0.95 * this.canvasHeight,
          "lilosit2"
        )),
        this.lilojump.setOrigin(0.5, 1),
        this.lilojump.setScale(0.15 * this.scaleFactor * this.sc2),
        (this.lilojump.depth = 200),
        (this.lilojump.alpha = 0),
        this.tweens.add({
          targets: this.lilojump,
          alpha: 1,
          duration: 800,
          ease: "Power2",
          onComplete: () => {},
        }),
        this.addElementsagainInOrder();
    }
  }
  onWatchTrailer() {
    this.pineappleSpawnTimer &&
      (this.pineappleSpawnTimer.remove(), (this.pineappleSpawnTimer = null)),
      this.gameTimer && (this.gameTimer.remove(), (this.gameTimer = null)),
      this.events.off("update", this.updatePineapples, this),
      (this.score = 0),
      (this.gameTime = 0),
      (this.gameActive = !0),
      this.fallingPineapples &&
        this.fallingPineapples.length > 0 &&
        (this.fallingPineapples.forEach((t) => {
          t && t.active && t.destroy();
        }),
        (this.fallingPineapples = [])),
      this.removePineapples(),
      this.tweens.add({
        targets: this.lilojump,
        alpha: 0,
        y: this.lilojump.y - 50,
        duration: 300,
        ease: "Power2",
      }),
      this.tweens.add({
        targets: [this.playagain, this.watchTrailer],
        alpha: 0,
        y: this.playagain.y - 50,
        duration: 300,
        ease: "Power2",
        onComplete: () => {
          this.playagain && this.playagain.active && this.playagain.destroy(),
            this.watchTrailer &&
              this.watchTrailer.active &&
              this.watchTrailer.destroy();
        },
      }),
      this.tweens.add({
        targets: [this.subtext2, this.subtext3],
        alpha: 0,
        y: this.subtext2.y - 50,
        duration: 300,
        ease: "Power2",
        onComplete: () => {
          this.subtext2 && this.subtext2.active && this.subtext2.destroy(),
            this.subtext3 && this.subtext3.active && this.subtext3.destroy();
        },
      }),
      this.tweens.add({
        targets: this.finalScore,
        alpha: 0,
        y: this.finalScore.y - 50,
        duration: 300,
        ease: "Power2",
        onComplete: () => {
          this.finalScore &&
            this.finalScore.active &&
            this.finalScore.destroy();
        },
      }),
      this.tweens.add({
        targets: this.logo,
        alpha: 0,
        y: this.logo.y - 50,
        duration: 300,
        ease: "Power2",
        onComplete: () => {
          this.logo && this.logo.active && this.logo.destroy(),
            this.fnCTAFinal();
        },
      });
  }
  fnCTAFinal() {
    this.fnfetchAPI(window.trackingType + "OnFinalScreen"),
      (this.logo3 = this.add.image(
        this.canvasWidth / 2,
        0.2 * this.canvasHeight,
        "logo2"
      )),
      this.logo3.setOrigin(0.5).setDepth(161),
      this.logo3.setScale(0.65 * this.scaleFactor),
      (this.logo3.alpha = 0),
      (this.disneyET = this.add.image(
        this.canvasWidth / 2,
        0.2 * this.canvasHeight,
        "disneyET"
      )),
      this.disneyET.setOrigin(0.5).setDepth(161),
      this.disneyET.setScale(0.5 * this.scaleFactor),
      (this.disneyET.alpha = 1),
      (this.disneyET.y = this.logo3.y + 0.45 * this.logo3.displayHeight),
      (this.watchTrailer2 = this.add.image(
        this.canvasWidth / 2,
        0.35 * this.canvasHeight,
        "watchTrailer2"
      )),
      this.watchTrailer2.setOrigin(0.5).setDepth(161),
      this.watchTrailer2.setScale(0.45 * this.scaleFactor),
      (this.watchTrailer2.y = 0.4 * this.canvasHeight),
      this.watchTrailer2.setInteractive({ useHandCursor: !0 }),
      this.tweens.add({
        targets: this.watchTrailer2,
        scale: 0.48 * this.scaleFactor,
        duration: 800,
        yoyo: !0,
        repeat: -1,
        ease: "Sine.easeInOut",
      }),
      this.tweens.add({
        targets: this.logo3,
        alpha: 1,
        y: this.logo3.y - 50,
        duration: 800,
        ease: "Power2",
      }),
      (this.liloSit = this.add.sprite(
        0.5 * this.canvasWidth,
        this.canvasHeight,
        "lilosit2"
      )),
      this.liloSit.setOrigin(0.5, 1),
      this.liloSit.setScale(0.24 * this.scaleFactor * this.sc2).setDepth(161),
      (this.liloSit.alpha = 0),
      this.tweens.add({
        targets: this.liloSit,
        alpha: 1,
        duration: 800,
        ease: "Power2",
        onComplete: () => {},
      }),

      (this.fullScreenInteractive = this.add.zone(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      )),
      this.fullScreenInteractive.setOrigin(0, 0),
      this.fullScreenInteractive.setInteractive({ useHandCursor: !0 }),
      this.fullScreenInteractive.setDepth(161),
      this.fullScreenInteractive.on("pointerdown", () => {
        this.fnfetchAPI(window.trackingType + "WatchTrailerClicked"),
          window.open(window.landingPageUrl, "_blank");
      });
  }
  startSpawningPineapples() {
    this.pineappleSpawnTimer && this.pineappleSpawnTimer.remove(),
      this.events.off("update", this.updatePineapples, this),
      (this.pineappleGridState = { lastUsedCells: [], maxCellHistory: 4 }),
      (this.pineappleSpawnTimer = this.time.addEvent({
        delay: 800,
        callback: this.spawnPineapple,
        callbackScope: this,
        loop: !0,
      }));
    const t = [1, 5, 3, 7, 0, 4];
    for (let e = 0; e < t.length; e++)
      this.time.delayedCall(200 * e, () => {
        this.gameActive && this.spawnPineappleInCell(t[e]);
      });
    this.events.on("update", this.updatePineapples, this);
  }
  spawnPineappleInCell(t) {
    if (!this.gameActive) return;
    (t = Phaser.Math.Clamp(t, 0, 7)),
      this.pineappleGridState &&
        (this.pineappleGridState.lastUsedCells.push(t),
        this.pineappleGridState.lastUsedCells.length,
        this.pineappleGridState.maxCellHistory);
    const e = this.canvasWidth / 8,
      i = this.liloSit.displayWidth / 2,
      s = this.canvasWidth - this.liloSit.displayWidth / 2,
      a = t * e + e / 2,
      h = Phaser.Math.Between(0.2 * -e, 0.2 * e),
      l = Phaser.Math.Clamp(a + h, i, s),
      n = Phaser.Math.Between(-180, -80),
      o = this.add.image(l, n, "pineapple"),
      r = Phaser.Math.FloatBetween(0.22, 0.23) * this.scaleFactor * this.sc;
    o.setScale(r),
      o.setOrigin(0.5, 0.5),
      (o.speed = [8, 10, 12, 14][Phaser.Math.Between(0, 3)]),
      (o.rotation = Phaser.Math.Between(-20, 20) * (Math.PI / 180)),
      (o.spinSpeed = Phaser.Math.FloatBetween(-0.02, 0.02)),
      (o.gridCell = t),
      this.fallingPineapples.push(o);
  }
  spawnPineapple() {
    if (!this.gameActive) return;
    let t;
    this.liloSit.displayWidth, this.canvasWidth;
    let e = 0;
    do {
      (t = Phaser.Math.Between(0, 7)), e++;
    } while (
      this.pineappleGridState &&
      this.pineappleGridState.lastUsedCells.includes(t) &&
      e < 10
    );
    this.spawnPineappleInCell(t);
  }
  updatePineapples() {
    if (!this.gameActive || !this.fallingPineapples) return;
    if (this.fallingPineapples.length > 30) {
      const t = this.fallingPineapples.length - 30;
      for (let e = 0; e < t; e++) this.fallingPineapples[e].destroy();
      this.fallingPineapples.splice(0, t);
    }
    const t = {};
    for (let e = this.fallingPineapples.length - 1; e >= 0; e--) {
      const i = this.fallingPineapples[e];
      if (
        ((i.y += i.speed),
        i.spinSpeed && (i.rotation += i.spinSpeed),
        i.y > this.canvasHeight + 100)
      ) {
        i.destroy(), this.fallingPineapples.splice(e, 1);
        continue;
      }
      const s = `${Math.floor(i.y / 100)}_${i.gridCell}`;
      t[s] && i.y < 0.5 * this.canvasHeight
        ? Math.abs(t[s] - i.y) < 80 &&
          (i.y < t[s]
            ? (i.speed = Math.max(i.speed - 0.5, 6))
            : (i.speed = Math.min(i.speed + 0.5, 16)))
        : (t[s] = i.y),
        this.checkCollision(i, this.graphics) &&
          this.applyPineappleHitEffect(i, e);
    }
  }
  checkCollision(t, e) {
    const i = t.getBounds(),
      s = new Phaser.Geom.Rectangle(
        i.x + 0.25 * i.width,
        i.y + 0.25 * i.height,
        0.5 * i.width,
        0.5 * i.height
      );
    let a;
    return (
      (a =
        e instanceof Phaser.GameObjects.Graphics
          ? new Phaser.Geom.Rectangle(
              this.liloSit.x - this.liloSit.displayWidth / 8,
              this.liloSit.y - 0.6 * this.liloSit.displayHeight,
              0.2 * this.liloSit.displayWidth,
              0.1 * this.liloSit.displayHeight
            )
          : e.getBounds()),
      Phaser.Geom.Rectangle.Overlaps(s, a)
    );
  }
  applyPineappleHitEffect(t, e) {
    if (t.isHit) return;
    (t.isHit = !0),
      this.liloSit.setAlpha(1),
      (this.score += 1),
      this.scoreValue &&
        this.scoreValue.setText(this.score.toString().padStart(2, "0"));
    const i = this.liloSit.y;
    this.tweens.add({
      targets: t,
      y: t.y - 80,
      x: t.x + Phaser.Math.Between(-50, 50),
      alpha: 0,
      duration: 300,
      ease: "Back.easeOut",
      onComplete: () => {
        t.destroy();
      },
    }),
      this.fallingPineapples.splice(e, 1);
    const s = {
        fontFamily: "BukaBird",
        fontSize: 60 * this.scaleFactor,
        fill: "#EFFF17",
        align: "center",
        stroke: "#C40000",
        strokeThickness: 10,
      },
      a =
        this.pineapplePhrases[
          Math.floor(Math.random() * this.pineapplePhrases.length)
        ],
      h = this.add.text(this.liloSit.x, 0.8 * this.canvasHeight, a, s);
    h.setOrigin(0.5).setDepth(120),
      this.tweens.add({
        targets: h,
        y: h.y - 0.1 * this.liloSit.displayHeight,
        alpha: 0,
        duration: 1e3,
        ease: "Power2",
        onComplete: () => {
          h.destroy();
        },
      }),
      this.tweens.add({
        targets: this.liloSit,
        y: i + 15,
        duration: 120,
        ease: "Bounce.easeIn",
        onComplete: () => {
          this.tweens.add({
            targets: this.liloSit,
            y: i,
            duration: 300,
            ease: "Elastic.easeOut",
            onComplete: () => {},
          });
        },
      });
  }
  setupLiloMovement() {
    (this.walkBobbing = !1),
      (this.walkBobTime = 0),
      (this.walkBobBaseY = this.liloSit.y),
      (this.isDragging = !1),
      this.liloSit.setInteractive({ draggable: !0 }),
      this.input.on("dragstart", (t, e) => {
        e === this.liloSit &&
          ((this.isDragging = !0),
          (this.walkBobbing = !0),
          (this.walkBobTime = 0));
      }),
      this.input.on("drag", (t, e, i, s) => {
        if (e === this.liloSit) {
          const s = this.liloSit.width * Math.abs(this.liloSit.scaleX) * 0.5,
            a = this.canvasWidth - s;
          (e.x = Phaser.Math.Clamp(i, s, a)),
            t.prevPosition.x < t.position.x
              ? (this.liloSit.scaleX = -Math.abs(this.liloSit.scaleX))
              : t.prevPosition.x > t.position.x &&
                (this.liloSit.scaleX = Math.abs(this.liloSit.scaleX)),
            (this.walkBobTime += 0.25);
          const h = 2;
          e.y = this.walkBobBaseY + Math.sin(this.walkBobTime) * h;
        }
      }),
      this.input.on("dragend", (t, e) => {
        e === this.liloSit &&
          ((this.isDragging = !1),
          (this.walkBobbing = !1),
          (this.liloSit.y = this.walkBobBaseY));
      }),
      this.events.on("update", this.updateLiloPosition, this);
  }
  updateLiloPosition() {
    this.liloSit &&
      this.graphics &&
      (this.graphics.clear(),
      this.graphics.fillStyle(16711680, 0),
      this.graphics.fillRect(
        this.liloSit.x - this.liloSit.displayWidth / 8,
        this.liloSit.y - 0.6 * this.liloSit.displayHeight,
        0.2 * this.liloSit.displayWidth,
        0.1 * this.liloSit.displayHeight
      )),
      !this.isDragging &&
        this.walkBobbing &&
        ((this.walkBobbing = !1), (this.liloSit.y = this.walkBobBaseY));
  }
  animatePineapples() {
    this.pineapples.forEach((t, e) => {
      t.x;
      const i = t.y,
        s = t.angle;
      (t.y = i - 200 - 100 * Math.random()),
        (t.angle = s + (Math.random() > 0.5 ? 180 : -180)),
        this.tweens.add({
          targets: t,
          y: i,
          angle: s,
          duration: 800 + 150 * e,
          ease: "Bounce.easeOut",
          delay: 120 * e,
        });
    });
  }
  animateLiloSit() {
    const t = () => {
      const e =
        "lilosit1" === this.liloSit.texture.key ? "lilosit2" : "lilosit1";
      this.liloSit.setTexture(e), this.time.delayedCall(500, t);
    };
    t();
  }
  onPlayAgain() {
    this.fnfetchAPI(window.trackingType + "PlayAgainClicked"),
      this.pineappleSpawnTimer &&
        (this.pineappleSpawnTimer.remove(), (this.pineappleSpawnTimer = null)),
      this.gameTimer && (this.gameTimer.remove(), (this.gameTimer = null)),
      this.events.off("update", this.updatePineapples, this),
      (this.score = 0),
      (this.gameTime = 0),
      (this.gameActive = !0),
      this.fallingPineapples &&
        this.fallingPineapples.length > 0 &&
        (this.fallingPineapples.forEach((t) => {
          t && t.active && t.destroy();
        }),
        (this.fallingPineapples = [])),
      this.removePineapples(),
      this.tweens.add({
        targets: this.lilojump,
        alpha: 0,
        y: this.lilojump.y - 50,
        duration: 300,
        ease: "Power2",
      }),
      this.tweens.add({
        targets: [this.playagain, this.watchTrailer],
        alpha: 0,
        y: this.playagain.y - 50,
        duration: 300,
        ease: "Power2",
        onComplete: () => {
          this.playagain && this.playagain.active && this.playagain.destroy(),
            this.watchTrailer &&
              this.watchTrailer.active &&
              this.watchTrailer.destroy();
        },
      }),
      this.tweens.add({
        targets: [this.subtext2, this.subtext3],
        alpha: 0,
        y: this.subtext2.y - 50,
        duration: 300,
        ease: "Power2",
        onComplete: () => {
          this.subtext2 && this.subtext2.active && this.subtext2.destroy(),
            this.subtext3 && this.subtext3.active && this.subtext3.destroy();
        },
      }),
      this.tweens.add({
        targets: this.finalScore,
        alpha: 0,
        y: this.finalScore.y - 50,
        duration: 300,
        ease: "Power2",
        onComplete: () => {
          this.finalScore &&
            this.finalScore.active &&
            this.finalScore.destroy(),
            this.fnstartGame();
        },
      });
  }
  fnfetchAPI(t) {
    fetch(t, { method: "GET" })
      .then((t) => console.log("Tracking sent:", t.status))
      .catch((t) => console.error("Tracking error:", t));
  }
}
class a extends t.Scene {
  constructor() {
    super("Preloader");
  }
  init() {
    const {
      canvasWidth: t,
      canvasHeight: e,
      scaleFactor: s,
      topMarginOffset: a,
      leftMarginOffsetPercentage: h,
      isMobileDevice: l,
      isIphoneDevice: n,
    } = i(this);
    (this.canvasWidth = t), (this.canvasHeight = e), (this.scaleFactor = s);
  }
  createLoadingUI() {
    this.add
      .text(
        this.canvasWidth / 2,
        this.canvasHeight / 2 - 50 * this.scaleFactor,
        "LOADING...",
        {
          fontFamily: "BukaBird",
          fontSize: 28 * this.scaleFactor,
          color: "#FFFFFF",
          align: "center",
          stroke: "#E10E14",
          strokeThickness: 5,
        }
      )
      .setOrigin(0.5);
    const t = 0.6 * this.canvasWidth,
      e = 25 * this.scaleFactor,
      i = 12 * this.scaleFactor;
    (this.loadingBarContainer = this.add.graphics()),
      this.loadingBarContainer.lineStyle(3 * this.scaleFactor, 14749204, 1),
      this.loadingBarContainer.fillStyle(3355443, 1),
      this.loadingBarContainer.fillRoundedRect(
        this.canvasWidth / 2 - t / 2,
        this.canvasHeight / 2 - e / 2,
        t,
        e,
        i
      ),
      this.loadingBarContainer.strokeRoundedRect(
        this.canvasWidth / 2 - t / 2,
        this.canvasHeight / 2 - e / 2,
        t,
        e,
        i
      ),
      (this.loadingBarGraphics = this.add.graphics()),
      (this.barWidth = t),
      (this.barHeight = e),
      (this.borderRadius = i),
      (this.barX = this.canvasWidth / 2 - t / 2),
      (this.barY = this.canvasHeight / 2 - e / 2),
      (this.percentText = this.add.text(
        this.canvasWidth / 2,
        this.canvasHeight / 2 + 40 * this.scaleFactor,
        "0%",
        {
          fontFamily: "BukaBird",
          fontSize: 22 * this.scaleFactor,
          color: "#FFFFFF",
          align: "center",
          stroke: "#000000",
          strokeThickness: 3,
        }
      )),
      this.percentText.setOrigin(0.5);
  }
  preload() {
    this.load.on("progress", (t) => {}),
      this.load.on("complete", () => {}),
      this.load.setPath(window.trackingPath),
      this.load.image("logo2", "logo2.png"),
      this.load.image("disneyET", "disneyET.png"),
      this.load.image("subtext", "subtext.png"),
      this.load.image("subtext2", "subtext2.png"),
      this.load.image("subtext3", "subtext3.png"),
      this.load.image("taptoplay", "taptoplay.png"),
      this.load.image("playagain", "playagain.png"),
      this.load.image("watchtrailer", "watchtrailer.png"),
      this.load.image("lilo2", "lilo2.png"),
      this.load.image("lilosit2", "lilosit2.png"),
      this.load.image("pineapple", "pineapple.png"),
      this.load.image("leaf1", "leaf1.png"),
      this.load.image("playagain", "playagain.png"),
      this.load.image("watchtrailer", "watchtrailer.png"),
      this.load.image("watchTrailer2", "watchTrailer2.png"),
      this.load.audio("backgroundmp3", "background.mp3");
  }
  create() {
    this.scene.start("MainMenu");
  }
}
const h = {
  type: Phaser.AUTO,
  width: 960,
  height: 1440,
  parent: "game-container",
  background: "transparent",
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  fps: { target: 60, forceSetTimeOut: !0 },
  transparent: !0,
  scene: [e, a, s],
};
new Phaser.Game(h);
