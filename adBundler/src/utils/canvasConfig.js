/**
 * Canvas configuration values
 */

// Canvas dimensions from main.js
export const DEFAULT_WIDTH = 320 * 3;
export const DEFAULT_HEIGHT = 480 * 3;

/**
 * Get canvas dimensions for the current scene
 * @param {Phaser.Scene} scene - The current Phaser scene
 * @param {boolean} useRootCanvas - Whether to use the root canvas dimensions
 * @returns {Object} An object containing canvasWidth and canvasHeight
 */
export function getCanvasDimensions(scene, useRootCanvas) {
  if (useRootCanvas) {
    return {
      canvasWidth: scene.game.canvas.width,
      canvasHeight: scene.game.canvas.height
    };
  } else {
    return {
      canvasWidth: scene.sys.game.canvas.width,
      canvasHeight: scene.sys.game.canvas.height
    };
  }
}