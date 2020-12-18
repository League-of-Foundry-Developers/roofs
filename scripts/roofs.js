import RoofsLayer from "./RoofsLayer.js";
import config from "./config.js";
import { log } from "./helpers.js";

/**
 * Load templates and config
 */
Hooks.once("init", async () => {
  log("Initializing", true);
  config();
  loadTemplates(["modules/roofs/templates/hud.hbs"]);
});

/**
 * Add RoofsLayer to canvas
 */
Hooks.once("canvasInit", () => {
  const index = canvas.stage.getChildIndex(canvas.lighting);
  canvas.roofs = canvas.stage.addChildAt(new RoofsLayer(), index);
  const layers = canvas.layers;
  layers.push(canvas.roofs);
  Object.defineProperty(canvas, "layers", {
    get: function () {
      return layers;
    },
  });
});

Hooks.on("canvasReady", () => {
  canvas.roofs.zIndex = canvas.lighting.zIndex + 1;
});

/**
 *  Apply patches to core methods
 */
Hooks.once("ready", () => {
  RoofsLayer._patchDrag();
  RoofsLayer._patchSight();
});

/**
 * Pass hooks to RoofsLayer
 */
Hooks.on("canvasReady", RoofsLayer.init);
Hooks.on("updateTile", RoofsLayer._onUpdateTile);
Hooks.on("preDeleteTile", RoofsLayer._onPreDeleteTile);
Hooks.on("renderTileHUD", RoofsLayer.extendTileHUD);
Hooks.on("updateToken", RoofsLayer._onUpdateToken);
Hooks.on("hoverTile", RoofsLayer._onHoverTile);

window.RoofsLayer = RoofsLayer;
