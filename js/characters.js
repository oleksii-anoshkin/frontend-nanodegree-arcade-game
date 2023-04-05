// An array of character images.
const PLAYER_SPRITES_SRC = [
  "images/char-boy.png",
  "images/char-cat-girl.png",
  "images/char-horn-girl.png",
  "images/char-pink-girl.png",
  "images/char-princess-girl.png",
];

// Start the game.
// Choosing a character before starting the game.
(function startMenu() {
  // Сreate a character selection window.
  const startMenu = document.createElement("div");
  startMenu.setAttribute("class", "start-menu");
  document.querySelector(".wrap").prepend(startMenu);

  const startMenuBox = document.createElement("div");
  startMenuBox.setAttribute("class", "start-menu__box");
  document.querySelector(".start-menu").prepend(startMenuBox);

  // Сreate a title.
  const menuTitle = document.createElement("h2");
  menuTitle.setAttribute("class", "menu__title");
  menuTitle.insertAdjacentHTML("afterbegin", "Choose a character:");
  document.querySelector(".start-menu__box").prepend(menuTitle);

  // Сreate character images container.
  const menuImgs = document.createElement("div");
  menuImgs.setAttribute("class", "menu__characters");
  document.querySelector(".start-menu__box").append(menuImgs);

  // Сreate all character images.
  PLAYER_SPRITES_SRC.forEach((imgSrc) => {
    const characterImg = document.createElement("img");
    characterImg.setAttribute("class", "menu__characters-img");
    characterImg.setAttribute("tabindex", "0");
    characterImg.setAttribute("src", `${imgSrc}`);
    menuImgs.append(characterImg);
  });

  // Select one of the default images.
  document.querySelector(".menu__characters-img").className += " set";

  // Сreate a start btn.
  const startBtn = document.createElement("div");
  startBtn.setAttribute("class", "menu__start-btn");
  startBtn.setAttribute("tabindex", "0");
  startBtn.insertAdjacentHTML("afterbegin", "Start the game");
  document.querySelector(".start-menu__box").append(startBtn);

  // Add listeners
  document.addEventListener("click", function (e) {
    // Select character image.
    if (e.target.className.includes("menu__characters-img")) {
      setCharacter(e);
    }
    // React to pressing the button and starting the game.
    if (e.target.className.includes("menu__start-btn")) {
      deleteWrapElement("firstChild");
      createObjects();
      Engine(window);
      bar.render();
    }
  });

  document.addEventListener("keyup", function (e) {
    // Select character image.
    if (
      e.key === "Enter" &&
      e.target.className.includes("menu__characters-img")
    ) {
      setCharacter(e);
    }
    // React to pressing the button and starting the game.
    if (e.key === "Enter" && e.target.className.includes("menu__start-btn")) {
      deleteWrapElement("firstChild");
      createObjects();
      Engine(window);
      bar.render();
    }
  });
})();
