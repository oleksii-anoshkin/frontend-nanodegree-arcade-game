// -------------------------------------------------------------------
// The function of creating game objects.
function createObjects() {
  // Enemies our player must avoid
  let Enemy = function (x, y, width, height, speed, sprite) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.sprite = sprite;
  };

  // Update the enemy's position, required method for game
  Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt * gameSpeed;

    if (this.x > CANVAS_WIDTH) this.x = -this.width;
    if (this.x < -this.width) this.x = CANVAS_WIDTH;

    this.checkCollisions();
  };

  /* Resets the game's characteristics to the given ones when
   * the character comes into contact with the enemy. */
  Enemy.prototype.levelDown = function () {
    // Reset the position of the character.
    player.x = randomX();
    player.y = setValue(PLAYER_DATA.START_Y, level);

    // Set score.
    score - setValue(RESET_SCORE, level) < 0
      ? (score = 0)
      : (score = setValue(RESET_SCORE, level));

    // Set other settings.
    gameSpeed = setValue(RESET_SPEED, level);
    life -= 1;

    // Update game objects.
    player.updateRocks(ROCKS_DATA);
    player.updateJewelry(JEWELRY_DATA);
    player.updateHeart(HEART_DATA);
    player.updateEnemies(ENEMY_DATA);

    // Reduce the level.
    level = setValue(RESET_LEVEL, level);

    // Update the info bar.
    bar.render();

    // Page scroll down
    scrollDown(SCROLL_CLAAS, SCROLL_BEHAVIOR, SCROLL_BLOCK);
  };

  // Game over if the character has too few lives.
  Enemy.prototype.gameOver = function () {
    // Reset the position of the character.
    player.x = randomX();
    player.y = setValue(PLAYER_DATA.START_Y, level);

    // Set other settings.
    life -= 1;

    // Update the info bar.
    bar.render();

    // Show animation
    gameOverPopup.render();

    // Show finish popup
    setTimeout(() => {
      finishGame(GAME_DATA);
    }, MEDIUM_TIMING);
  };

  /* Method that checks the interaction between the character
   * and the enemies. */
  Enemy.prototype.checkCollisions = function () {
    if (
      player.x > this.x - ENEMY_DATA.SPRITE_WIDTH / 2 &&
      player.y === this.y &&
      player.x < this.x + ENEMY_DATA.SPRITE_WIDTH / 2 &&
      player.y === this.y
    ) {
      life > MIN_LIFE ? this.levelDown() : this.gameOver();
    }
  };

  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function () {
    ctx.drawImage(
      Resources.get(this.sprite),
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  // -------------------------------------------------------------------
  // Now write your own player class
  let Player = function (x, y, width, height, sprite) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  };

  // Draw the player on the screen
  Player.prototype.render = function () {
    ctx.drawImage(
      Resources.get(this.sprite),
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  // Arrow control
  Player.prototype.handleInput = function (key) {
    if (key === "up" && this.y > CANVAS_DATA.BORDER_TOP) {
      // Check the interaction with rocks.
      if (player.checkRocksCollisions(this.x, this.y, "up") === true) {
        this.y -= CANVAS_DATA.VERT_MOVE;
      }

      if (this.y === CANVAS_DATA.BORDER_TOP) {
        // Ending the game after passing the 20th level.
        if (level === 20) {
          score += 100;
          bar.render();
          winPopup.render();
          setTimeout(() => {
            finishGame(GAME_DATA);
          }, 1600);
        } else {
          // Raise the level.
          levelUpPopup.render();

          setTimeout(() => {
            level++;
            gameSpeed += GAME_SPEED_STEP;
            maxLevel = countMaxLevel(level);
            score += countLevelScore(level);

            this.x = Math.floor(Math.random() * 5) * 100 + 10;

            if (level > 0 && level <= 10) {
              this.y = PLAYER_DATA.START_Y[0];
            } else if (level >= 11 && level <= 15) {
              this.y = PLAYER_DATA.START_Y[1];
            } else {
              this.y = PLAYER_DATA.START_Y[2];
            }

            this.updateRocks(ROCKS_DATA);
            this.updateJewelry(JEWELRY_DATA);
            this.updateHeart(HEART_DATA);
            this.updateEnemies(ENEMY_DATA);

            bar.render();
          }, 400);

          // We scroll down the page when the height of the screen is too high.
          setTimeout(() => {
            document.querySelector(".canvas").scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }, 800);
        }
      }
    } else if (key === "down") {
      if (level > 0 && level <= 10 && this.y < CANVAS_DATA.BORDER_BOT[0]) {
        if (player.checkRocksCollisions(this.x, this.y, "down") === true) {
          this.y += CANVAS_DATA.VERT_MOVE;
        }
      } else if (
        level >= 11 &&
        level <= 15 &&
        this.y < CANVAS_DATA.BORDER_BOT[1]
      ) {
        if (player.checkRocksCollisions(this.x, this.y, "down") === true) {
          this.y += CANVAS_DATA.VERT_MOVE;
        }
      } else if (level >= 16 && this.y < CANVAS_DATA.BORDER_BOT[2]) {
        if (player.checkRocksCollisions(this.x, this.y, "down") === true) {
          this.y += CANVAS_DATA.VERT_MOVE;
        }
      }
    } else if (key === "left" && this.x > CANVAS_DATA.BORDER_LEFT) {
      if (player.checkRocksCollisions(this.x, this.y, "left") === true) {
        this.x -= CANVAS_DATA.HORZ_MOVE;
      }
    } else if (key === "right" && this.x < CANVAS_DATA.BORDER_RIGHT) {
      if (player.checkRocksCollisions(this.x, this.y, "right") === true) {
        this.x += CANVAS_DATA.HORZ_MOVE;
      }
    }
  };

  // Mouse control
  Player.prototype.mauseInput = function (x, y) {
    if (y < this.y && this.y - y >= 50 && this.y > CANVAS_DATA.BORDER_TOP) {
      // Check the interaction with rocks.
      if (player.checkRocksCollisions(this.x, this.y, "up") === true) {
        this.y -= CANVAS_DATA.VERT_MOVE;
        window.scrollBy(0, (CANVAS_DATA.VERT_MOVE * -1) / 2);
      }

      if (this.y === CANVAS_DATA.BORDER_TOP) {
        if (level === 20) {
          // Ending the game after passing the 20th level.
          score += 100;
          bar.render();
          winPopup.render();
          setTimeout(() => {
            finishGame(GAME_DATA);
          }, 1500);
        } else {
          // Raise the level.
          levelUpPopup.render();

          setTimeout(() => {
            level++;
            gameSpeed += GAME_SPEED_STEP;
            maxLevel = countMaxLevel(level);
            score += countLevelScore(level);

            this.x = Math.floor(Math.random() * 5) * 100 + 10;

            if (level > 0 && level <= 10) {
              this.y = PLAYER_DATA.START_Y[0];
            } else if (level >= 11 && level <= 15) {
              this.y = PLAYER_DATA.START_Y[1];
            } else {
              this.y = PLAYER_DATA.START_Y[2];
            }

            this.updateRocks(ROCKS_DATA);
            this.updateJewelry(JEWELRY_DATA);
            this.updateHeart(HEART_DATA);
            this.updateEnemies(ENEMY_DATA);

            bar.render();
          }, 400);

          // We scroll down the page when the height of the screen is too high.
          setTimeout(() => {
            document.querySelector(".canvas").scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }, 800);
        }
      }
    } else if (y > this.y && y - this.y >= 50) {
      if (level > 0 && level <= 10 && this.y < CANVAS_DATA.BORDER_BOT[0]) {
        if (player.checkRocksCollisions(this.x, this.y, "down") === true) {
          this.y += CANVAS_DATA.VERT_MOVE;
          window.scrollBy(0, CANVAS_DATA.VERT_MOVE / 2);
        }
      } else if (
        level >= 11 &&
        level <= 15 &&
        this.y < CANVAS_DATA.BORDER_BOT[1]
      ) {
        if (player.checkRocksCollisions(this.x, this.y, "down") === true) {
          this.y += CANVAS_DATA.VERT_MOVE;
          window.scrollBy(0, CANVAS_DATA.VERT_MOVE / 2);
        }
      } else if (level >= 16 && this.y < CANVAS_DATA.BORDER_BOT[2]) {
        if (player.checkRocksCollisions(this.x, this.y, "down") === true) {
          this.y += CANVAS_DATA.VERT_MOVE;
          window.scrollBy(0, CANVAS_DATA.VERT_MOVE / 2);
        }
      }
    } else if (
      x < this.x &&
      this.x - x >= 40 &&
      this.x > CANVAS_DATA.BORDER_LEFT
    ) {
      if (player.checkRocksCollisions(this.x, this.y, "left") === true) {
        this.x -= CANVAS_DATA.HORZ_MOVE;
      }
    } else if (
      x > this.x &&
      x - this.x >= 40 &&
      this.x < CANVAS_DATA.BORDER_RIGHT
    ) {
      if (player.checkRocksCollisions(this.x, this.y, "right") === true) {
        this.x += CANVAS_DATA.HORZ_MOVE;
      }
    }
  };

  // Updating the location of rocks when leveling up
  Player.prototype.updateRocks = function (obj) {
    // Clear array
    allRocks.length = 0;

    // Set new rocks
    if (level >= THIRD_STAGE.MIN_LEVEL && level <= FOURTH_STAGE.MAX_LEVEL) {
      obj.START_Y.forEach((y) =>
        allRocks.push(
          new Rock(
            randomX(),
            y,
            obj.SPRITE_WIDTH,
            obj.SPRITE_HEIGTH,
            obj.SPRITE
          )
        )
      );
    }
  };

  // Checking conflicts with rocks
  Player.prototype.checkRocksCollisions = function (x, y, key) {
    let posX = x;
    let posY = y;

    if (level >= 11 && level <= 20) {
      if (key === "up") {
        let rock = allRocks.find(
          (elem) => elem.y === posY - CANVAS_DATA.VERT_MOVE - 6
        );

        if (rock !== undefined && rock.x === posX) {
          return false;
        }
        return true;
      } else if (key === "down") {
        let rock = allRocks.find(
          (elem) => elem.y === posY + CANVAS_DATA.VERT_MOVE - 6
        );
        if (rock !== undefined && rock.x === posX) {
          return false;
        }
        return true;
      } else if (key === "right") {
        let rock = allRocks.find(
          (elem) => elem.x === posX + CANVAS_DATA.HORZ_MOVE
        );
        if (rock !== undefined && rock.y === posY - 6) {
          return false;
        }
        return true;
      } else if (key === "left") {
        let rock = allRocks.find(
          (elem) => elem.x === posX - CANVAS_DATA.HORZ_MOVE
        );
        if (rock !== undefined && rock.y === posY - 6) {
          return false;
        }
        return true;
      }
    }

    return true;
  };

  // Updating the location of jewelry when leveling up
  Player.prototype.updateJewelry = function (obj) {
    if (level >= THIRD_STAGE.MIN_LEVEL && level <= FOURTH_STAGE.MAX_LEVEL) {
      // Set new jevel
      jevel = new Jewel(
        randomX(),
        // Set y pusition
        level >= FOURTH_STAGE.MIN_LEVEL
          ? obj.START_Y[Math.floor(Math.random() * obj.START_Y.length)]
          : obj.START_Y[0],
        obj.SPRITE_WIDTH,
        obj.SPRITE_HEIGTH,
        obj.SPRITES[Math.floor(Math.random() * obj.SPRITES.length)]
      );

      // Check merge with rock
      const position = randomPosition(checkMarge(jevel, obj.START_X, allRocks));
      if (position) jevel.x = position;
    }
  };

  // Updating the location of heart when leveling up
  Player.prototype.updateHeart = function (obj) {
    if (
      getRandomNumber(THIRD_STAGE.MIN_LEVEL, FOURTH_STAGE.MAX_LEVEL) === level
    ) {
      // Set new Heart
      heart = new Heart(
        randomX(),
        // Set y pusition
        level >= FOURTH_STAGE.MIN_LEVEL
          ? obj.START_Y[Math.floor(Math.random() * obj.START_Y.length)]
          : obj.START_Y[0],
        obj.SPRITE_WIDTH,
        obj.SPRITE_HEIGTH,
        obj.SRC
      );
      console.log(heart);
    }
  };

  // Updating the location of enemies when leveling up
  Player.prototype.updateEnemies = function (obj) {
    if (
      [
        FIRST_STAGE.MIN_LEVEL,
        SECOND_STAGE.MIN_LEVEL,
        THIRD_STAGE.MIN_LEVEL,
        FOURTH_STAGE.MIN_LEVEL,
      ].find((item) => item === level)
    ) {
      // Clear array
      allEnemies.length = 0;

      // Set new enemies
      setValue(obj.START_Y, level).forEach((y) =>
        allEnemies.push(
          new Enemy(
            randomX(),
            y,
            obj.SPRITE_WIDTH,
            obj.SPRITE_HEIGTH,
            setEnemySpeed(y),
            setEnemySprite(y)
          )
        )
      );
    }
  };

  // -------------------------------------------------------------------
  // Rocks
  let Rock = function (x, y, width, height, sprite) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  };

  // Draw rocks on the screen
  Rock.prototype.render = function () {
    ctx.drawImage(
      Resources.get(this.sprite),
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  // -------------------------------------------------------------------
  // Jewelry
  let Jewel = function (x, y, width, height, sprite) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  };

  // Draw jewelry on the screen
  Jewel.prototype.render = function () {
    ctx.drawImage(
      Resources.get(this.sprite),
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  // Updating jewelry information.
  Jewel.prototype.update = function () {
    this.checkCollisions();
  };

  // Updating jewelry information.
  Jewel.prototype.increaseScore = function () {
    // Search index
    const spriteIndex = JEWELRY_DATA.SPRITES.findIndex(
      (item) => item === this.sprite
    );
    // Increase score
    score += JEWELRY_DATA.SPRITES_SCORE[spriteIndex];
  };

  // Checking conflicts with jewelry
  Jewel.prototype.checkCollisions = function () {
    // Increase score
    if (player.x === this.x && player.y === this.y) {
      this.increaseScore();

      // Update the info bar
      bar.render();

      // Hidden jewel
      hiddenObj(this);
    }
  };

  // -------------------------------------------------------------------
  // Heart class
  let Heart = function (x, y, width, height, sprite) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  };

  // Draw heart on the screen
  Heart.prototype.render = function () {
    ctx.drawImage(
      Resources.get(this.sprite),
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  // Updating heart information
  Heart.prototype.update = function () {
    this.checkCollisions();
  };

  // Checking conflicts with heart
  Heart.prototype.checkCollisions = function () {
    if (player.x === this.x && player.y === this.y) {
      // Increase score
      score += HEART_SCORE;

      // Increase life
      if (life < MAX_LIFE) life += 1;

      // Update the info bar
      bar.render();

      // Hidden heart
      hiddenObj(this);
    }
  };

  // -------------------------------------------------------------------
  // Instantiate objects.
  // Place the player object in a variable called player
  player = new Player(
    randomX(),
    setValue(PLAYER_DATA.START_Y, level),
    PLAYER_DATA.SPRITE_WIDTH,
    PLAYER_DATA.SPRITE_HEIGTH,
    playerSpriteSrc
  );

  // Place all enemy objects in an array called allEnemies
  player.updateEnemies(ENEMY_DATA);
  // -------------------------------------------------------------------

  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  // Arrow control
  document.addEventListener("keyup", function (e) {
    const allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down",
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });

  // Mouse control
  document.addEventListener("click", function (e) {
    if (e.target.className === "canvas") {
      // We create the coordinates that we will transfer.
      let x = 0;
      let y = 0;

      // We calculate the coefficient of change in the coordinate value when the screen width changes to less than 540 px.
      let coef = (CANVAS_WIDTH + CANVAS_WIDTH * 0.12) / window.innerWidth;

      // // Calculation of coordinates along the X and Y axes.
      if (window.innerWidth < 540) {
        x = e.pageX * coef - 41 - window.innerWidth * 0.06;
        y = e.pageY * coef - 80;
      } else {
        x = e.pageX - 41 - (window.innerWidth - CANVAS_WIDTH) / 2;
        y = e.pageY - 80;
      }

      // We pass the coordinates to the function.
      player.mauseInput(x, y);
    }
  });
}

// Other functions
// Check and set max level
function countMaxLevel(level) {
  if (level >= maxLevel) {
    return level;
  } else {
    return maxLevel;
  }
}

// Check srore
function countLevelScore(level) {
  switch (true) {
    case level > 0 && level <= 3:
      return 5;

    case level > 3 && level <= 6:
      return 10;

    case level > 6 && level <= 10:
      return 15;

    case level > 10 && level <= 13:
      return 20;

    case level > 13 && level <= 16:
      return 30;

    case level > 16 && level <= 20:
      return 45;
  }
}
