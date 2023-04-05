// -------------------------------------------------------------------
// Create class of popup with animation
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

// Render popup with animation
PopupAnimation.prototype.render = function () {
  // Create popup with animation
  createElement(this.elemTag, this.elemClass, this.parentClass, this.addMethod);
  // Delete popup with animation
  setTimeout(() => {
    deleteElement(this.parentClass, this.deleteMethod);
  }, this.timing);
};

// Create all popup windows with animation
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
