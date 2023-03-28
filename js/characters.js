let spriteSrc = "images/char-boy.png";
let player = {};

// Choosing a character before starting the game.
(function startMenu() {
  // An array of character images
  const srcImgs = {
    boy: "images/char-boy.png",
    cat: "images/char-cat-girl.png",
    horn: "images/char-horn-girl.png",
    pink: "images/char-pink-girl.png",
    princess: "images/char-princess-girl.png",
  };

  // Сreate a character selection window.
  let startMenu = document.createElement("div");
  startMenu.setAttribute("class", "start-menu");
  document.querySelector(".wrap").prepend(startMenu);

  let startMenuBox = document.createElement("div");
  startMenuBox.setAttribute("class", "start-menu__box");
  document.querySelector(".start-menu").prepend(startMenuBox);

  // Сreate a title.
  let menuTitle = document.createElement("h2");
  menuTitle.setAttribute("class", "menu__title");
  menuTitle.insertAdjacentHTML("afterbegin", "Choose a character:");
  document.querySelector(".start-menu__box").prepend(menuTitle);

  // Сreate character images.
  let menuImgs = document.createElement("div");
  menuImgs.setAttribute("class", "menu__characters");
  document.querySelector(".start-menu__box").append(menuImgs);

  for (let key in srcImgs) {
    let characterImg = document.createElement("img");
    characterImg.setAttribute("class", "menu__characters-img");
    characterImg.setAttribute("tabindex", "0");
    characterImg.setAttribute("src", `${srcImgs[key]}`);
    menuImgs.append(characterImg);
  }

  document.querySelector(".menu__characters-img").className += " set";

  // Сreate a start btn.
  let startBtn = document.createElement("div");
  startBtn.setAttribute("class", "menu__start-btn");
  startBtn.setAttribute("tabindex", "0");
  startBtn.insertAdjacentHTML("afterbegin", "Start the game");
  document.querySelector(".start-menu__box").append(startBtn);

  // Character image selection function.
  function setCharacter(e) {
    let imgs = document.querySelectorAll(".menu__characters-img");

    for (let img of imgs) {
      img.classList.remove("set");
    }

    e.target.className += " set";
    spriteSrc = e.target.getAttribute("src");
  }

  // Add listeners
  document.addEventListener("click", function (e) {
    if (e.target.className.includes("menu__characters-img")) {
      setCharacter(e);
    }
    if (e.target.className.includes("menu__start-btn")) {
      document.querySelector(".start-menu").classList.add("hidden");
      createObjects();
      Engine(window);
    }
  });

  document.addEventListener("keyup", function (e) {
    if (
      e.key === "Enter" &&
      e.target.className.includes("menu__characters-img")
    ) {
      setCharacter(e);
    }
    if (e.key === "Enter" && e.target.className.includes("menu__start-btn")) {
      document.querySelector(".start-menu").classList.add("hidden");
      createObjects();
      Engine(window);
    }
  });
})(this);
