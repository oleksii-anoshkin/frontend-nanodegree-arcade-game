// -------------------------------------------------------------------------
// Timings variables
const LOW_TIMING = 400;
const MEDIUM_TIMING = LOW_TIMING * 2; // 800
const HIGH_TIMING = LOW_TIMING * 4; // 1600
const RELOAD_TIMING = LOW_TIMING * 10; // 4000

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

// An array of character images
const PLAYER_SPRITES_SRC = [
  "images/char-boy.png",
  "images/char-cat-girl.png",
  "images/char-horn-girl.png",
  "images/char-pink-girl.png",
  "images/char-princess-girl.png",
];

// Game start/end popup variables
const GAME_DATA = {
  ELEM_TAG: "div",
  CONT_PARENT_CLASS: "wrap",
  CONT_CLASS: "start-menu",
  BOX_CLASS: "start-menu__box",
  TITLE_TAG: "h2",
  TITLE_CLASS: "menu__title",
  TITLE_TEXT: "Choose a character:",
  CHARACTERS_CLASS: "menu__characters",
  IMG_CLASS: "menu__characters-img",
  IMG_SET: "set",
  IMG_TAB: true,
  BTN_CLASS: "menu__start-btn",
  BTN_TEXT: "Start the game",
  BTN_TAB: true,
  PREPEND_ADD_METHOD: "prepend",
  APPEND_ADD_METHOD: "append",
  DELETE_METHOD: "firstChild",
  END_GAME: {
    TITLE_WIN_TEXT: "You won! Game Over!",
    TITLE_LOSE_TEXT: "Game Over!",
    DELETE_METHOD: "lastChild",
    SCORE_CLASS: "menu__score",
    SCORE_TEXT: "Your score:",
  },
};
// -------------------------------------------------------------------------
// Levels data
const FIRST_STAGE = {
  MIN_LEVEL: 1,
  MAX_LEVEL: 5,
};
const SECOND_STAGE = {
  MIN_LEVEL: 6,
  MAX_LEVEL: 10,
};
const THIRD_STAGE = {
  MIN_LEVEL: 11,
  MAX_LEVEL: 15,
};
const FOURTH_STAGE = {
  MIN_LEVEL: 16,
  MAX_LEVEL: 20,
};

// Engine variables
const COL_WIDTH = 100;
const ROW_HEIGHT = 82;
const NUM_COLS = 5;
const NUM_ROWS = [6, 6 + 4, 6 + 8];
const HEIGHT_CORRECTION = 4;
const CANVAS_WIDTH = COL_WIDTH * NUM_COLS;
const CANVAS_HEIGHT = NUM_ROWS.map(
  (item) => item * ROW_HEIGHT + (item * ROW_HEIGHT) / HEIGHT_CORRECTION
);
const LEVEL_IMAGES = {
  WATER: "images/water-block.png",
  STONE: "images/stone-block.png",
  GRASS: "images/grass-block.png",
  GRASS_POSITION: [[1, 2], [1], [1, 6], [1, 6, 10]],
};
// -------------------------------------------------------------------------
// Heart variables
const HEART_DATA = {
  START_X: [10, 110, 210, 310, 410], // !!!
  START_Y: [372, 700], // !!!
  SPRITE_WIDTH: 52, // !!!
  SPRITE_HEIGTH: 88, // !!!
  CLASS: "info-bar__heart",
  SRC: "images/heart–mini.png",
};
// -------------------------------------------------------------------------
