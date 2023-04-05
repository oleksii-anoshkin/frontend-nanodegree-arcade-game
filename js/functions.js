// Other functions
// Character image selection function. // characters.js
function setCharacter(e) {
  const imgs = document.querySelectorAll(".menu__characters-img");

  imgs.forEach((img) => img.classList.remove("set"));
  e.target.className += " set";
  playerSpriteSrc = e.target.getAttribute("src");
}

// Delete wrap element // characters.js // popups.js
function deleteWrapElement(position) {
  const wrap = document.querySelector(".wrap");
  wrap.removeChild(wrap[position]);
}

// Сalculate and create the required number of hearts. // popups.js
function createHearts(src, className, life) {
  const infoBarItem = document.createElement("li");
  infoBarItem.setAttribute("class", "info-bar__imgs");

  for (let i = 1; i <= life; i += 1) {
    const heart = document.createElement("img");
    heart.setAttribute("class", `${className}`);
    heart.setAttribute("src", `${src}`);
    infoBarItem.append(heart);
  }

  document.querySelector(".info-bar__box").append(infoBarItem);
}

// Calculate and create text lines showing level, max level and score. // popups.js
function createTextLines(obj, ...values) {
  for (let i = 0; i <= obj.TEXTS.length - 1; i += 1) {
    const infoBarItem = document.createElement("li");
    infoBarItem.setAttribute("class", "info-bar__text");
    infoBarItem.insertAdjacentHTML(
      "afterbegin",
      `${obj.TEXTS[i]}:<span class="${obj.CLASSES[i]}">${values[i]}</span>`
    );
    document.querySelector(".info-bar__box").append(infoBarItem);
  }
}

// -------------------------------------------------------------------------
// HTML container creation function. // popups.js // characters.js
function createBoxElement(elemTag, elemClass, parentClass, addMethod) {
  const elem = document.createElement(elemTag);
  elem.setAttribute("class", elemClass);
  document.querySelector(parentClass)[addMethod](elem);
}

// Delete popup animation // popups.js
function deletePopupAnimation(timing, deleteMethod, parentClass) {
  setTimeout(() => {
    const wrap = document.querySelector(parentClass);
    wrap.removeChild(wrap[deleteMethod]);
  }, timing);
}
