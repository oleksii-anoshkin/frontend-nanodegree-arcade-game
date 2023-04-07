// -------------------------------------------------------------------
// Engine code
var Engine = function (global) {
  /* Predefine the variables we'll be using within this scope,
   * create the canvas element, grab the 2D context for that canvas
   * set the canvas element's height/width and add it to the DOM. */
  var doc = global.document,
    win = global.window,
    canvas = doc.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    lastTime,
    rowImages,
    numRows,
    numCols,
    row,
    col;

  canvas.setAttribute("class", "canvas");
  doc.body.appendChild(canvas);

  /* This function serves as the kickoff point for the game loop itself
   * and handles properly calling the update and render methods.*/
  function main() {
    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;

    win.requestAnimationFrame(main);
  }

  /*This function does some initial setup that should only occur once,
   * particularly setting the lastTime variable that is required for
   * the game loop.*/
  function init() {
    lastTime = Date.now();
    main();
  }

  /* This function is called by main (our game loop) and itself calls
   * all of the functions which may need to update entity's data. */
  function update(dt) {
    updateEntities(dt);
  }

  /* This is called by the update function and loops through all of
   * the objects within your allEnemies array as defined in app.js
   * and calls their update() methods. */
  function updateEntities(dt) {
    allEnemies.forEach(function (enemy) {
      enemy.update(dt);
    });

    if (level >= THIRD_STAGE.MIN_LEVEL && level <= FOURTH_STAGE.MAX_LEVEL) {
      jevel.update();
      if (heart.x) heart.update();
    }
  }

  /* This function initially draws the "game level", it will then
   * call the renderEntities function. */
  function render() {
    rowImages = createImagesArr(
      setValue(LEVEL_IMAGES.GRASS_POSITION, level),
      setValue(NUM_ROWS, level)
    );
    numRows = setValue(NUM_ROWS, level);
    numCols = NUM_COLS;
    canvas.width = CANVAS_WIDTH;
    canvas.height = setValue(CANVAS_HEIGHT, level);

    // Before drawing, clear existing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(
          Resources.get(rowImages[row]),
          col * COL_WIDTH,
          row * ROW_HEIGHT
        );
      }
    }

    renderEntities();
  }

  /* This function is called by the render function and is called
   * on each game tick. */
  function renderEntities() {
    allEnemies.forEach(function (enemy) {
      enemy.render();
    });

    switch (true) {
      case level >= THIRD_STAGE.MIN_LEVEL && level <= THIRD_STAGE.MAX_LEVEL:
        allRocks[0].render();
        break;

      case level >= FOURTH_STAGE.MIN_LEVEL && level <= FOURTH_STAGE.MAX_LEVEL:
        allRocks.forEach(function (enemy) {
          enemy.render();
        });
        break;
    }

    if (level >= THIRD_STAGE.MIN_LEVEL && level <= FOURTH_STAGE.MAX_LEVEL) {
      jevel.render();
      if (heart.x) heart.render();
    }

    player.render();
  }

  /* Go ahead and load all of the images we know we're going to
   * need to draw our game level. */
  Resources.load([
    "images/stone-block.png",
    "images/water-block.png",
    "images/grass-block.png",
    "images/enemy-bug-right.png",
    "images/enemy-bug-left.png",
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png",
    "images/heart.png",
    "images/heart–mini.png",
    "images/rock.png",
    "images/gem-blue.png",
    "images/gem-green.png",
    "images/gem-orange.png",
    "images/key.png",
    "images/star.png",
  ]);
  Resources.onReady(init);

  /* Assign the canvas' context object to the global variable
   * (the window bject when run in a browser). */
  global.ctx = ctx;
};

// -------------------------------------------------------------------
