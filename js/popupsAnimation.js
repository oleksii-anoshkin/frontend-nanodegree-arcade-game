// -------------------------------------------------------------------
// Popups variables
POPUP_DATA = {
  ELEM_TAG: "div",
  ELEM_CLASS: ["level-up", "win", "game-over"],
  PARENT_CLASS: ".wrap",
  ADD_METHOD: "prepend",
  DELETE_METHOD: "firstChild",
  TIMING: [MEDIUM_TIMING, HIGH_TIMING, MEDIUM_TIMING],
};

// Create the popups class with animation
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

// Create popup animation element
PopupAnimation.prototype.create = function () {
  const elem = document.createElement(this.elemTag);
  elem.setAttribute("class", this.elemClass);
  document.querySelector(this.parentClass)[this.addMethod](elem);
};

// Delete popup animation element
PopupAnimation.prototype.delete = function () {
  setTimeout(() => {
    const parent = document.querySelector(this.parentClass);
    parent.removeChild(parent[this.deleteMethod]);
  }, this.timing);
};

// Show popup with animation
PopupAnimation.prototype.render = function () {
  this.create();
  this.delete();
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
