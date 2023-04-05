// -------------------------------------------------------------------------
// Global variables
// Timings variables
const LOW_TIMING = 400;
const MEDIUM_TIMING = 800;
const HIGH_TIMING = 1500;
const RELOAD_TIMING = 5000;

// Popups animation variables
const POPUP_DATA = {
  ELEM_TAG: "div",
  ELEM_CLASS: ["level-up", "win", "game-over"],
  PARENT_CLASS: "wrap",
  ADD_METHOD: "prepend",
  DELETE_METHOD: "firstChild",
  TIMING: [MEDIUM_TIMING, HIGH_TIMING, MEDIUM_TIMING],
};

// Bar variables
const BAR_DATA = {
  ELEM_TAG: "ul",
  ELEM_CLASS: "info-bar__box",
  PARENT_CLASS: "wrap",
  ADD_METHOD: "append",
  DELETE_METHOD: "lastChild",
  ITEM_TAG: "li",
  ITEM_CLASS: "info-bar__imgs",
  ITEM_TEXT_CLASS: "info-bar__text",
  IMG_TAB: true,
  TEXTS: ["score", "level", "max level"],
  TEXTS_CLASSES: ["info-bar__score", "info-bar__level", "info-bar__max-level"],
};

// Heart variables
const HEART_DATA = {
  START_X: [10, 110, 210, 310, 410],
  START_Y: [372, 700],
  SPRITE_WIDTH: 52,
  SPRITE_HEIGTH: 88,
  CLASS: "info-bar__heart",
  SRC: "images/heart–mini.png",
};
// -------------------------------------------------------------------------
