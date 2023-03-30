// Global variables
let allEnemies = [];
let player = {};
let score = 0;
let level = 1;
let maxLevel = 1;
let life = 2;
let maxLife = 4;
let gameSpeed = 6;
let playerSpriteSrc = "images/char-boy.png";

// Canvas variables
const CANVAS_DATA = {
  BORDER_BOT: [420, 748, 1076],
  BORDER_TOP: 10,
  BORDER_LEFT: 10,
  BORDER_RIGHT: 410,
  VERT_MOVE: 82,
  HORZ_MOVE: 100,
};

// Player variables
const PLAYER_DATA = {
  START_X: Math.floor(Math.random() * 5) * 100 + 10,
  START_Y: [420, 748, 1076],
  SPRITE_WIDTH: 80,
  SPRITE_HEIGTH: 132,
};

// Enemy variables
// const enemyData = {
//   startX: [
//     [150, 450],
//     [0, 300],
//     [300, 0],
//   ],
//   startY: [72, 154, 236],
//   spriteWidth: 92,
//   spriteHeigth: 152,
// };

// The function of creating game objects.
function createObjects() {
  // Enemies our player must avoid
  let Enemy = function (x, y, width, height, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
  };

  // // Update the enemy's position, required method for game
  // // Parameter: dt, a time delta between ticks
  // Enemy.prototype.update = function (dt) {
  //   // You should multiply any movement by the dt parameter
  //   // which will ensure the game runs at the same speed for
  //   // all computers.
  //   this.x += this.speed * dt * gameSpeed;
  //   if (this.x > canvasWidth + this.width) {
  //     this.x = 0 - this.width;
  //   }
  // };

  // // Draw the enemy on the screen, required method for game
  // Enemy.prototype.render = function () {
  //   ctx.drawImage(
  //     Resources.get(this.sprite),
  //     this.x,
  //     this.y,
  //     this.width,
  //     this.height
  //   );
  // };

  // Now write your own player class
  let Player = function (x, y, width, height, sprite) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  };

  // This class requires an update(), render() and
  // a handleInput() method.
  Player.prototype.update = function () {};

  Player.prototype.render = function () {
    ctx.drawImage(
      Resources.get(this.sprite),
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  Player.prototype.handleInput = function (key) {
    if (key === "up" && this.y > CANVAS_DATA.BORDER_TOP) {
      this.y -= CANVAS_DATA.VERT_MOVE;
      if (this.y === CANVAS_DATA.BORDER_TOP) {
        if (level === 20) {
          winPopup();
          setTimeout(() => {
            finishGame();
          }, 1500);
        } else {
          levelUpPopup();

          setTimeout(() => {
            level++;
            gameSpeed += 2;
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

            infoBar();
          }, 400);

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
        this.y += CANVAS_DATA.VERT_MOVE;
      } else if (
        level >= 11 &&
        level <= 15 &&
        this.y < CANVAS_DATA.BORDER_BOT[1]
      ) {
        this.y += CANVAS_DATA.VERT_MOVE;
      } else if (level >= 16 && this.y < CANVAS_DATA.BORDER_BOT[2]) {
        this.y += CANVAS_DATA.VERT_MOVE;
      }
    } else if (key === "left" && this.x > CANVAS_DATA.BORDER_LEFT) {
      this.x -= CANVAS_DATA.HORZ_MOVE;
    } else if (key === "right" && this.x < CANVAS_DATA.BORDER_RIGHT) {
      this.x += CANVAS_DATA.HORZ_MOVE;
    }
  };

  Player.prototype.mauseInput = function (x, y) {
    if (y < this.y && this.y - y >= 50 && this.y > CANVAS_DATA.BORDER_TOP) {
      this.y -= CANVAS_DATA.VERT_MOVE;
      window.scrollBy(0, (CANVAS_DATA.VERT_MOVE * -1) / 2);
      if (this.y === CANVAS_DATA.BORDER_TOP) {
        if (level === 20) {
          winPopup();
          setTimeout(() => {
            finishGame();
          }, 1500);
        } else {
          levelUpPopup();

          setTimeout(() => {
            level++;
            gameSpeed += 2;
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

            infoBar();
          }, 400);

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
        this.y += CANVAS_DATA.VERT_MOVE;
        window.scrollBy(0, CANVAS_DATA.VERT_MOVE / 2);
      } else if (
        level >= 11 &&
        level <= 15 &&
        this.y < CANVAS_DATA.BORDER_BOT[1]
      ) {
        this.y += CANVAS_DATA.VERT_MOVE;
        window.scrollBy(0, CANVAS_DATA.VERT_MOVE / 2);
      } else if (level >= 16 && this.y < CANVAS_DATA.BORDER_BOT[2]) {
        this.y += CANVAS_DATA.VERT_MOVE;
        window.scrollBy(0, CANVAS_DATA.VERT_MOVE / 2);
      }
    } else if (
      x < this.x &&
      this.x - x >= 40 &&
      this.x > CANVAS_DATA.BORDER_LEFT
    ) {
      this.x -= CANVAS_DATA.HORZ_MOVE;
    } else if (
      x > this.x &&
      x - this.x >= 40 &&
      this.x < CANVAS_DATA.BORDER_RIGHT
    ) {
      this.x += CANVAS_DATA.HORZ_MOVE;
    }
  };

  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // enemyData.startY.forEach((location) => {
  //   allEnemies.push(
  //     new Enemy(
  //       enemyData.startX,
  //       location,
  //       enemyData.spriteWidth,
  //       enemyData.spriteHeigth,
  //       gameSpeed
  //     )
  //   );
  // });

  // Place the player object in a variable called player
  player = new Player(
    PLAYER_DATA.START_X,
    PLAYER_DATA.START_Y[0],
    PLAYER_DATA.SPRITE_WIDTH,
    PLAYER_DATA.SPRITE_HEIGTH,
    playerSpriteSrc
  );

  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener("keyup", function (e) {
    const allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down",
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });

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

  // function createEnemyArray(level) {
  //   if (level >= 0 && level <= 5) {
  //     for (let i = 0; i <= 2; i += 1) {
  //       for (let j = 0; j <= 1; j += 1) {
  //         allEnemies.push(
  //           new Enemy(
  //             enemyData.startX[i][j],
  //             enemyData.startY[i],
  //             spriteWidth,
  //             spriteHeigth,
  //             gameSpeed
  //           )
  //         );
  //       }
  //     }
  //   }
  //   // } else if (level >= 6 && level <= 10) {
  //   // } else if (level >= 11 && level <= 15) {
  //   // } else if (level >= 16 && level <= 20) {
  //   // } else if (level >= 21 && level <= 25) {
  //   // }
  // }
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
    case level > 0 && level <= 5:
      return 5;

    case level >= 6 && level <= 10:
      return 10;

    case level >= 11 && level <= 15:
      return 20;

    case level >= 16 && level <= 20:
      return 30;
  }
}
