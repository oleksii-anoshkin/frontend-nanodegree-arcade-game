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
// Create images array for engine
function createImagesArr(positions, rows) {
  let imgs = [];
  imgs.push(LEVEL_IMAGES.WATER);

  for (let i = 1; i < rows; i += 1) {
    imgs.push(LEVEL_IMAGES.STONE);
  }

  for (let position of positions) {
    imgs.splice(position, 1, LEVEL_IMAGES.GRASS);
  }

  return imgs;
}

// -------------------------------------------------------------------------
// Set value by level
const LONG_ARRAY = 4;
function setValue(arr, level) {
  switch (true) {
    case level >= FIRST_STAGE.MIN_LEVEL && level <= FIRST_STAGE.MAX_LEVEL:
      return arr[0];

    case level >= SECOND_STAGE.MIN_LEVEL && level <= SECOND_STAGE.MAX_LEVEL:
      return arr.length === LONG_ARRAY ? arr[1] : arr[0];

    case level >= THIRD_STAGE.MIN_LEVEL && level <= THIRD_STAGE.MAX_LEVEL:
      return arr.length === LONG_ARRAY ? arr[2] : arr[1];

    case level >= FOURTH_STAGE.MIN_LEVEL && level <= FOURTH_STAGE.MAX_LEVEL:
      return arr.length === LONG_ARRAY ? arr[3] : arr[2];
  }
}

// Random x position
function randomX() {
  return Math.floor(Math.random() * NUM_COLS) * CANVAS_DATA.HORZ_MOVE;
}

// Hidden object
function hiddenObj(obj) {
  obj.width = HIDDEN_SIZE;
  obj.height = HIDDEN_SIZE;
  obj.x = -HIDDEN_POS;
  obj.y = -HIDDEN_POS;
}

// Set enemy speed
function setEnemySpeed(y) {
  return (y / ROW_HEIGHT) % 2 === 0 ? ENEMY_SPEED : -ENEMY_SPEED;
}

// Set enemy sprite
function setEnemySprite(y) {
  return (y / ROW_HEIGHT) % 2 === 0
    ? ENEMY_DATA.SPRITES[0]
    : ENEMY_DATA.SPRITES[1];
}

// Page scroll down
function scrollDown(elemClass, behavior, block) {
  document.querySelector(`.${elemClass}`).scrollIntoView({
    behavior: behavior,
    block: block,
  });
}

// Create x positions for rocks
function randomRockArrX(yPositions, xPositions) {
  let basicX = [].concat(xPositions);
  const arrX = yPositions.map(() => randomX());

  arrX.forEach((x) => {
    for (let i = arrX.indexOf(x) + 1; i < arrX.length; i += 1) {
      if (x === arrX[i]) {
        basicX = basicX.filter((pos) => pos !== arrX[i]);
        arrX[i] = randomPosition(basicX);
      }
    }
    basicX = basicX.filter((pos) => pos !== x);
  });

  return arrX;
}

// Create x positions for rocks
function RockArrX(yPositions, xPositions) {
  let basicX = [].concat(xPositions);
  const arrX = yPositions.map(() => randomX());

  arrX.forEach((x) => {
    for (let i = arrX.indexOf(x) + 1; i < arrX.length; i += 1) {
      if (x === arrX[i]) {
        basicX = basicX.filter((pos) => pos !== arrX[i]);
        arrX[i] = randomPosition(basicX);
      }
    }
    basicX = basicX.filter((pos) => pos !== x);
  });

  return arrX;
}

// Create x positions for heart and jevel
function ArrX(rocks, jevel, basicPositions) {
  const xPositions = rocks.map((rock) => rock.x);
  if (jevel !== undefined) xPositions[xPositions.length] = jevel;
  let arrX = [].concat(basicPositions);

  basicPositions.forEach((x) =>
    xPositions.forEach((objX) => {
      if (objX === x) {
        arrX = arrX.filter((pos) => pos !== objX);
      }
    })
  );

  return arrX;
}

// Random position
function randomPosition(arrPositions) {
  return Boolean(arrPositions)
    ? arrPositions[Math.floor(Math.random() * arrPositions.length)]
    : undefined;
}

// Random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Update objects
function updateObjects(obj) {
  obj.updateRocks(ROCKS_DATA);
  obj.updateJewelry(JEWELRY_DATA);
  obj.updateHeart(HEART_DATA);
  obj.updateEnemies(ENEMY_DATA);
}

// Check and set max level
function countMaxLevel(level) {
  return level >= maxLevel ? level : maxLevel;
}
// -------------------------------------------------------------------------
