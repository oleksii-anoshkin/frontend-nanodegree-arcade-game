// -------------------------------------------------------------------------
// Basic functions
// Element creation function
function createElement(elemTag, elemClass, parentClass, addMethod) {
  const elem = document.createElement(elemTag);
  elem.setAttribute("class", elemClass);
  document.querySelector(`.${parentClass}`)[addMethod](elem);
}

// Image creation function
function createImg(imgClass, imgSrc, parentElem, addMethod, tab) {
  const img = document.createElement("img");
  img.setAttribute("class", imgClass);
  img.setAttribute("src", imgSrc);
  if (tab) img.setAttribute("tabindex", "0");
  parentElem[addMethod](img);
}

// Text creation function
function createText(textTag, textClass, insertText, parentClass, addMethod) {
  const text = document.createElement(textTag);
  text.setAttribute("class", textClass);
  text.insertAdjacentHTML("afterbegin", insertText);
  document.querySelector(`.${parentClass}`)[addMethod](text);
}

// Element deletion function
function deleteElement(parentClass, deleteMethod) {
  const parent = document.querySelector(`.${parentClass}`);
  parent.removeChild(parent[deleteMethod]);
}

// Other functions
// Character image selection function. // characters.js
function setCharacter(e) {
  const imgs = document.querySelectorAll(".menu__characters-img");

  imgs.forEach((img) => img.classList.remove("set"));
  e.target.className += " set";
  playerSpriteSrc = e.target.getAttribute("src");
}

// Delete wrap element // characters.js
function deleteWrapElement(position) {
  const wrap = document.querySelector(".wrap");
  wrap.removeChild(wrap[position]);
}
// -------------------------------------------------------------------------
