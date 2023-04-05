// Infobar variables
const TEXT_ARR = {
  TEXTS: ["score", "level", "max level"],
  CLASSES: ["info-bar__score", "info-bar__level", "info-bar__max-level"],
};

const HEART_INFO = {
  HEART_CLASS: "info-bar__heart",
  HEART_SRC: "images/heart–mini.png",
};

// -------------------------------------------------------------------
// Timings variables
const LOW_TIMING = 400;
const MEDIUM_TIMING = 800;
const HIGH_TIMING = 1500;
const RELOAD_TIMING = 5000;

// Popups variables
POPUP_DATA = {
  ELEM_TAG: "div",
  ELEM_CLASS: ["level-up", "win", "game-over"],
  PARENT_CLASS: ".wrap",
  ADD_METHOD: "prepend",
  DELETE_METHOD: "firstChild",
  TIMING: [MEDIUM_TIMING, HIGH_TIMING, MEDIUM_TIMING],
};

// Create the popup class with animation
const PopupAnimation = function (
  elemTag,
  elemClass,
  parentClass,
  addMethod,
  deleteMethod,
  timing
) {
  this.elemTag = elemTag;
  this.elemClass = elemClass;
  this.parentClass = parentClass;
  this.addMethod = addMethod;
  this.timing = timing;
  this.deleteMethod = deleteMethod;
};

// Show popup with animation
PopupAnimation.prototype.render = function () {
  createBoxElement(
    this.elemTag,
    this.elemClass,
    this.parentClass,
    this.addMethod
  );
  deletePopupAnimation(this.timing, this.deleteMethod, this.parentClass);
};

// Creation of the necessary number of pop-up windows with animation.
let counter = 0;
[levelUpPopup, winPopup, gameOverPopup] = POPUP_DATA.ELEM_CLASS.map(
  (elemClass) => {
    return new PopupAnimation(
      POPUP_DATA.ELEM_TAG,
      elemClass,
      POPUP_DATA.PARENT_CLASS,
      POPUP_DATA.ADD_METHOD,
      POPUP_DATA.DELETE_METHOD,
      POPUP_DATA.TIMING[counter++]
    );
  }
);
// -------------------------------------------------------------------

// Info bar
function showInfoBar() {
  // Сheck the presence of the element on the page and delete it before creating a new instance.
  const infoBar = document.getElementsByClassName("info-bar__box");

  if (infoBar.length) {
    deleteWrapElement("lastChild");
  }

  // Create a container
  const infoBarBox = document.createElement("ul");
  infoBarBox.setAttribute("class", "info-bar__box");
  document.querySelector(".wrap").append(infoBarBox);

  // Create elements
  // Сalculate and create the required number of hearts.
  createHearts(HEART_INFO.HEART_SRC, HEART_INFO.HEART_CLASS, life);
  // Calculate and create text lines showing level, max level and score.
  createTextLines(TEXT_ARR, score, level, maxLevel);
}

// Finish game popup
function finishGame() {
  // We remove the playing field and info bar.
  deleteWrapElement("lastChild");
  deleteWrapElement("lastChild");

  // Create a container
  const startMenu = document.createElement("div");
  startMenu.setAttribute("class", "start-menu");
  document.querySelector(".wrap").append(startMenu);

  const startMenuBox = document.createElement("div");
  startMenuBox.setAttribute("class", "start-menu__box");
  document.querySelector(".start-menu").prepend(startMenuBox);

  // Сreate a title.
  const menuTitle = document.createElement("h2");
  menuTitle.setAttribute("class", "menu__title");
  if (life) {
    // If the character's lives are over and equal to 0, the game stops
    menuTitle.insertAdjacentHTML("afterbegin", "You won! Game Over!");
  } else {
    menuTitle.insertAdjacentHTML("afterbegin", "Game Over!");
  }
  document.querySelector(".start-menu__box").prepend(menuTitle);

  // Сreate character images.
  const menuImgs = document.createElement("div");
  menuImgs.setAttribute("class", "menu__characters");
  document.querySelector(".start-menu__box").append(menuImgs);

  const characterImg = document.createElement("img");
  characterImg.setAttribute("class", "menu__finish-img");
  characterImg.setAttribute("src", `${playerSpriteSrc}`);
  menuImgs.append(characterImg);

  // Сreate a score title.
  const scoreTitle = document.createElement("h2");
  scoreTitle.setAttribute("class", "menu__score");
  scoreTitle.insertAdjacentHTML("afterbegin", `Your score: ${score}`);
  document.querySelector(".start-menu__box").append(scoreTitle);

  // We update the page after a while so that you can start a new game.
  setTimeout(() => {
    location.reload();
  }, RELOAD_TIMING);
}
