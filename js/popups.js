// Timings variables
const SHORT_CLOSE_TIMING = 800;
const MEDIUM_CLOSE_TIMING = 1500;
const RELOAD_TIMING = 5000;

// Infobar variables
const TEXT_ARR = {
  SCORE: "score",
  LEVEL: "level",
  MAX_LEVEL: "max level",
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
  for (let i = 0; i <= 3; i += 1) {
    let infoBarItem = document.createElement("li");
    if (i === 0) {
      infoBarItem.setAttribute("class", "info-bar__imgs");
      for (let i = 1; i <= life; i += 1) {
        let heart = document.createElement("img");
        heart.setAttribute("class", "info-bar__heart");
        heart.setAttribute("src", `${TEXT_ARR.HEART_SRC}`);
        infoBarItem.append(heart);
      }
      document.querySelector(".info-bar__box").append(infoBarItem);
    } else if (i > 0 && i <= 3) {
      infoBarItem.setAttribute("class", "info-bar__text");
      if (i === 1) {
        infoBarItem.insertAdjacentHTML(
          "afterbegin",
          `${TEXT_ARR.SCORE}:<span class="info-bar__score">${score}</span>`
        );
      } else if (i === 2) {
        infoBarItem.insertAdjacentHTML(
          "afterbegin",
          `${TEXT_ARR.LEVEL}:<span class="info-bar__level">${level}</span>`
        );
      } else {
        infoBarItem.insertAdjacentHTML(
          "afterbegin",
          `${TEXT_ARR.MAX_LEVEL}:<span class="info-bar__max-level">${maxLevel}</span>`
        );
      }
      document.querySelector(".info-bar__box").append(infoBarItem);
    }
  }
}

// Finish game popup
function finishGame() {
  // We remove the playing field and info bar.
  let wrap = document.querySelector(".wrap");
  wrap.removeChild(wrap.lastChild);
  wrap.removeChild(wrap.lastChild);

  // Create a container
  let startMenu = document.createElement("div");
  startMenu.setAttribute("class", "start-menu");
  document.querySelector(".wrap").append(startMenu);

  let startMenuBox = document.createElement("div");
  startMenuBox.setAttribute("class", "start-menu__box");
  document.querySelector(".start-menu").prepend(startMenuBox);

  // Сreate a title.
  let menuTitle = document.createElement("h2");
  menuTitle.setAttribute("class", "menu__title");
  if (life) {
    menuTitle.insertAdjacentHTML("afterbegin", "You won! Game Over!");
  } else {
    menuTitle.insertAdjacentHTML("afterbegin", "Game Over!");
  }
  document.querySelector(".start-menu__box").prepend(menuTitle);

  // Сreate character images.
  let menuImgs = document.createElement("div");
  menuImgs.setAttribute("class", "menu__characters");
  document.querySelector(".start-menu__box").append(menuImgs);

  let characterImg = document.createElement("img");
  characterImg.setAttribute("class", "menu__finish-img");
  characterImg.setAttribute("src", `${playerSpriteSrc}`);
  menuImgs.append(characterImg);

  // Сreate a score title.
  let scoreTitle = document.createElement("h2");
  scoreTitle.setAttribute("class", "menu__score");
  scoreTitle.insertAdjacentHTML("afterbegin", `Your score: ${score}`);
  document.querySelector(".start-menu__box").append(scoreTitle);

  setTimeout(() => {
    location.reload();
  }, RELOAD_TIMING);
}
