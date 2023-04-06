// -------------------------------------------------------------------------
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

// Text btn function
function createBtn(btnTag, btnClass, btnText, parentClass, addMethod, tab) {
  const btn = document.createElement(btnTag);
  btn.setAttribute("class", btnClass);
  if (tab) btn.setAttribute("tabindex", "0");
  btn.insertAdjacentHTML("afterbegin", btnText);
  document.querySelector(`.${parentClass}`)[addMethod](btn);
}

// Element deletion function
function deleteElement(parentClass, deleteMethod) {
  const parent = document.querySelector(`.${parentClass}`);
  parent.removeChild(parent[deleteMethod]);
}
// -------------------------------------------------------------------------
// Create start popup
// Choosing a character before starting the game
function startGame(obj) {
  // Сreate container
  createElement(
    obj.ELEM_TAG,
    obj.CONT_CLASS,
    obj.CONT_PARENT_CLASS,
    obj.PREPEND_ADD_METHOD
  );
  // Сreate a character selection window
  createElement(
    obj.ELEM_TAG,
    obj.BOX_CLASS,
    obj.CONT_CLASS,
    obj.PREPEND_ADD_METHOD
  );
  // Сreate a title
  createText(
    obj.TITLE_TAG,
    obj.TITLE_CLASS,
    obj.TITLE_TEXT,
    obj.BOX_CLASS,
    obj.PREPEND_ADD_METHOD
  );
  // Сreate character images container
  createElement(
    obj.ELEM_TAG,
    obj.CHARACTERS_CLASS,
    obj.BOX_CLASS,
    obj.APPEND_ADD_METHOD
  );
  // Сreate all character images
  const parentElem = document.querySelector(`.${obj.CHARACTERS_CLASS}`);
  PLAYER_SPRITES_SRC.forEach((imgSrc) => {
    createImg(
      obj.IMG_CLASS,
      imgSrc,
      parentElem,
      obj.APPEND_ADD_METHOD,
      obj.IMG_TAB
    );
  });
  // Select one of the images
  document.querySelector(`.${obj.IMG_CLASS}`).className += ` ${obj.IMG_SET}`;
  // Сreate a start btn
  createBtn(
    obj.ELEM_TAG,
    obj.BTN_CLASS,
    obj.BTN_TEXT,
    obj.BOX_CLASS,
    obj.APPEND_ADD_METHOD,
    obj.BTN_TAB
  );
}

// Character image select
function setCharacter(e) {
  const imgs = document.querySelectorAll(`.${GAME_DATA.IMG_CLASS}`);

  imgs.forEach((img) => img.classList.remove(GAME_DATA.IMG_SET));
  e.target.className += ` ${GAME_DATA.IMG_SET}`;
  playerSpriteSrc = e.target.getAttribute("src");
}

// Finish game
// Create finish popup
function finishGame(obj) {
  // Delete engine and info bar
  deleteElement(obj.CONT_PARENT_CLASS, obj.END_GAME.DELETE_METHOD);
  deleteElement(obj.CONT_PARENT_CLASS, obj.END_GAME.DELETE_METHOD);
  // Сreate container
  createElement(
    obj.ELEM_TAG,
    obj.CONT_CLASS,
    obj.CONT_PARENT_CLASS,
    obj.PREPEND_ADD_METHOD
  );
  // Сreate a character selection window
  createElement(
    obj.ELEM_TAG,
    obj.BOX_CLASS,
    obj.CONT_CLASS,
    obj.PREPEND_ADD_METHOD
  );
  // Сreate a title
  if (life) {
    createText(
      obj.TITLE_TAG,
      obj.TITLE_CLASS,
      obj.END_GAME.TITLE_WIN_TEXT,
      obj.BOX_CLASS,
      obj.PREPEND_ADD_METHOD
    );
  } else {
    // All the character's lifes are spent
    createText(
      obj.TITLE_TAG,
      obj.TITLE_CLASS,
      obj.END_GAME.TITLE_LOSE_TEXT,
      obj.BOX_CLASS,
      obj.PREPEND_ADD_METHOD
    );
  }
  // Сreate character images container
  createElement(
    obj.ELEM_TAG,
    obj.CHARACTERS_CLASS,
    obj.BOX_CLASS,
    obj.APPEND_ADD_METHOD
  );
  // Сreate character images
  const parentElem = document.querySelector(`.${obj.CHARACTERS_CLASS}`);
  createImg(
    obj.IMG_CLASS,
    playerSpriteSrc,
    parentElem,
    obj.APPEND_ADD_METHOD,
    obj.IMG_TAB
  );
  // Сreate a score title
  createText(
    obj.TITLE_TAG,
    obj.END_GAME.SCORE_CLASS,
    (obj.END_GAME.SCORE_TEXT += `${score}`),
    obj.BOX_CLASS,
    obj.APPEND_ADD_METHOD
  );
  // Update the page that start a new game
  setTimeout(() => {
    location.reload();
  }, RELOAD_TIMING);
}
// -------------------------------------------------------------------------
// Set value by level
function setValue(arr, level) {
  switch (true) {
    case level >= FIRST_STAGE.MIN_LEVEL && level <= SECOND_STAGE.MAX_LEVEL:
      return arr[0];

    case level >= THIRD_STAGE.MIN_LEVEL && level <= THIRD_STAGE.MAX_LEVEL:
      return arr[1];

    case level >= FOURTH_STAGE.MIN_LEVEL && level <= FOURTH_STAGE.MAX_LEVEL:
      return arr[2];
  }
}

// Create images array for engine
function createImagesArr() {} // !!!!!!!!!!!!
// -------------------------------------------------------------------------
