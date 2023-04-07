// -------------------------------------------------------------------------
// Global variables
const allEnemies = [];
const allRocks = [];
let jevel = {};
let heart = {};
let player = {};
let score = 0;

// Timings variables
const LOW_TIMING = 400;
const MEDIUM_TIMING = LOW_TIMING * 2; // 800
const HIGH_TIMING = LOW_TIMING * 4; // 1600
const RELOAD_TIMING = LOW_TIMING * 10; // 4000

// Sprite variables
const SPRITE_WIDTH = 100;
const SPRITE_HEIGTH = 168;

// Levels data
let level = 1;
let maxLevel = 1;
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

// Reset level data
const RESET_LEVEL = [
  FIRST_STAGE.MIN_LEVEL,
  SECOND_STAGE.MIN_LEVEL,
  THIRD_STAGE.MIN_LEVEL,
  FOURTH_STAGE.MIN_LEVEL,
];
const LEVEL_BONUS = 10;
const DATA_SCORE = [
  LEVEL_BONUS,
  LEVEL_BONUS * 2,
  LEVEL_BONUS * 4,
  LEVEL_BONUS * 8,
];
const RESET_SCORE = [
  LEVEL_BONUS * 2,
  LEVEL_BONUS * 4,
  LEVEL_BONUS * 7,
  LEVEL_BONUS * 10,
];

// Speed variables
const START_GAME_SPEED = 10;
const GAME_SPEED_STEP = 1;
const RESET_SPEED = [
  START_GAME_SPEED,
  START_GAME_SPEED * 1.5,
  START_GAME_SPEED * 2,
  START_GAME_SPEED * 2.5,
];
let gameSpeed = START_GAME_SPEED;

// Scroll data
const SCROLL_CLAAS = "canvas";
const SCROLL_BEHAVIOR = "smooth";
const SCROLL_BLOCK = "end";

// -------------------------------------------------------------------------
// Popups animation variables
const POPUP_DATA = {
  ELEM_TAG: "div",
  ELEM_CLASS: ["level-up", "win", "game-over"],
  PARENT_CLASS: "wrap",
  ADD_METHOD: "prepend",
  DELETE_METHOD: "firstChild",
  TIMING: [MEDIUM_TIMING, HIGH_TIMING, MEDIUM_TIMING], // [800, 1600, 800]
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
// Engine variables
const COL_WIDTH = SPRITE_WIDTH; // 100
const ROW_HEIGHT_CORRECTION = 2;
const ROW_HEIGHT = SPRITE_HEIGTH / 2 - ROW_HEIGHT_CORRECTION; // 82
const NUM_COLS = 5;
const BASIC_ROWS = 6;
const NUM_ROWS = [BASIC_ROWS, BASIC_ROWS + 4, BASIC_ROWS + 8]; // [6, 10, 14]
const CANVAS_HEIGHT_CORRECTION = 200;
const CANVAS_WIDTH = COL_WIDTH * NUM_COLS; // 500
const CANVAS_HEIGHT = NUM_ROWS.map(
  (item) => item * ROW_HEIGHT + CANVAS_HEIGHT_CORRECTION
);
const LEVEL_IMAGES = {
  WATER: "images/water-block.png",
  STONE: "images/stone-block.png",
  GRASS: "images/grass-block.png",
  GRASS_POSITION: [[4, 5], [5], [4, 9], [4, 8, 13]],
};

// -------------------------------------------------------------------------
// Canvas variables
const CANVAS_DATA = {
  BORDER_BOT: [ROW_HEIGHT * 5, ROW_HEIGHT * 9, ROW_HEIGHT * 13],
  BORDER_TOP: 0,
  BORDER_LEFT: 0,
  BORDER_RIGHT: COL_WIDTH * 4,
  VERT_MOVE: ROW_HEIGHT,
  HORZ_MOVE: COL_WIDTH,
};
const HIDDEN_SIZE = 0;
const HIDDEN_POS = 100;

// Player variables
const PLAYER_DATA = {
  START_Y: [ROW_HEIGHT * 5, ROW_HEIGHT * 9, ROW_HEIGHT * 13],
  SPRITE_WIDTH: SPRITE_WIDTH,
  SPRITE_HEIGTH: SPRITE_HEIGTH,
};
let playerSpriteSrc = PLAYER_SPRITES_SRC[0];

// Enemy variables
const ENEMY_SPEED = 10;
const ENEMY_DATA = {
  START_Y: [
    [ROW_HEIGHT, ROW_HEIGHT * 2, ROW_HEIGHT * 3], // [82, 164, 246]
    [ROW_HEIGHT, ROW_HEIGHT * 2, ROW_HEIGHT * 3, ROW_HEIGHT * 4], // [82, 164, 246, 328]
    [
      ROW_HEIGHT,
      ROW_HEIGHT * 2,
      ROW_HEIGHT * 3,
      ROW_HEIGHT * 5,
      ROW_HEIGHT * 6,
      ROW_HEIGHT * 7,
      ROW_HEIGHT * 8,
    ], // [82, 164, 246, 410, 492, 574, 656]
    [
      ROW_HEIGHT,
      ROW_HEIGHT * 2,
      ROW_HEIGHT * 3,
      ROW_HEIGHT * 5,
      ROW_HEIGHT * 6,
      ROW_HEIGHT * 7,
      ROW_HEIGHT * 9,
      ROW_HEIGHT * 10,
      ROW_HEIGHT * 11,
      ROW_HEIGHT * 12,
    ], // [82, 164, 246, 410, 492, 574, 738, 820, 902, 984]
  ],
  SPRITE_WIDTH: SPRITE_WIDTH,
  SPRITE_HEIGTH: SPRITE_HEIGTH,
  SPRITES: ["images/enemy-bug-right.png", "images/enemy-bug-left.png"],
};

// Rocks variables
const ROCKS_DATA = {
  START_Y: [ROW_HEIGHT * 4, ROW_HEIGHT * 8], // [328, 656]\
  SPRITE: "images/rock.png",
  SPRITE_WIDTH: SPRITE_WIDTH,
  SPRITE_HEIGTH: SPRITE_HEIGTH,
};

// Jewelry variables
const JEWELRY_SCORE = LEVEL_BONUS * 4; // 40
const JEWELRY_DATA = {
  START_X: [0, COL_WIDTH, COL_WIDTH * 2, COL_WIDTH * 3, COL_WIDTH * 4], // [0, 100, 200, 300, 400]
  START_Y: [ROW_HEIGHT * 4, ROW_HEIGHT * 8], // [328, 656]
  SPRITE_WIDTH: SPRITE_WIDTH,
  SPRITE_HEIGTH: SPRITE_HEIGTH,
  SPRITES: [
    "images/gem-blue.png",
    "images/gem-green.png",
    "images/gem-orange.png",
    "images/key.png",
    "images/star.png",
  ],
  SPRITES_SCORE: [
    JEWELRY_SCORE,
    JEWELRY_SCORE,
    JEWELRY_SCORE,
    JEWELRY_SCORE * 2,
    JEWELRY_SCORE * 3,
  ], // [40, 40, 40, 80, 120]
};

// Heart variables
let life = 2;
const MAX_LIFE = 4;
const MIN_LIFE = 1;
const HEART_SCORE = LEVEL_BONUS * 10; // 100
const HEART_DATA = {
  START_X: [0, COL_WIDTH, COL_WIDTH * 2, COL_WIDTH * 3, COL_WIDTH * 4], // [0, 100, 200, 300, 400]
  START_Y: [ROW_HEIGHT * 4, ROW_HEIGHT * 8], // [328, 656]
  SPRITE_WIDTH: SPRITE_WIDTH, // 100
  SPRITE_HEIGTH: SPRITE_HEIGTH, // 168
  CLASS: "info-bar__heart",
  SRC_MINI: "images/heart–mini.png",
  SRC: "images/heart.png",
};

// -------------------------------------------------------------------------
