// Timings variables
const SHORT_CLOSE_TIMING = 800;
const MEDIUM_CLOSE_TIMING = 1500;
const RELOAD_TIMING = 5000;

// Infobar variables
const TEXT_ARR = {
  TEXTS: ["score", "level", "max level"],
  CLASSES: ["info-bar__score", "info-bar__level", "info-bar__max-level"],
};

const HEART_INFO = {
  HEART_CLASS: "info-bar__heart",
  HEART_SRC: "images/heart–mini.png",
};

// Level up popup
function levelUpPopup() {
  // Create a popup container
  const levelUpPopup = document.createElement("div");
  levelUpPopup.setAttribute("class", "level-up");
  document.querySelector(".wrap").prepend(levelUpPopup);
  deletePopupAnimation(SHORT_CLOSE_TIMING, "firstChild");
}

// Win popup
function winPopup() {
  // Create a popup container
  const winPopup = document.createElement("div");
  winPopup.setAttribute("class", "win");
  document.querySelector(".wrap").prepend(winPopup);
  deletePopupAnimation(MEDIUM_CLOSE_TIMING, "firstChild");
}

// Game over popup
function gameOverPopup() {
  // Create a popup container
  const gameOverPopup = document.createElement("div");
  gameOverPopup.setAttribute("class", "game-over");
  document.querySelector(".wrap").prepend(gameOverPopup);
  deletePopupAnimation(SHORT_CLOSE_TIMING, "firstChild");
}

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
  createTextLines(TEXT_ARR);
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

  setTimeout(() => {
    location.reload();
  }, RELOAD_TIMING);
}
