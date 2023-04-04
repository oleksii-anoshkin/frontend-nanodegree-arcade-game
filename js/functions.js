// Other functions
// Character image selection function.
function setCharacter(e) {
  const imgs = document.querySelectorAll(".menu__characters-img");

  imgs.forEach((img) => img.classList.remove("set"));
  e.target.className += " set";
  playerSpriteSrc = e.target.getAttribute("src");
}

// Delete wrap element
function deleteWrapElement(position) {
  const wrap = document.querySelector(".wrap");
  wrap.removeChild(wrap[position]);
}

// Delete popup animation
function deletePopupAnimation(timing, position) {
  setTimeout(() => {
    const wrap = document.querySelector(".wrap");
    wrap.removeChild(wrap[position]);
  }, timing);
}
