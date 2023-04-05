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
