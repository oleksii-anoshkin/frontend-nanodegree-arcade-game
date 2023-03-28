function createObjects() {
  // variables
  const canvasData = {
    borderBot: 420,
    borderTop: 10,
    borderLeft: 10,
    borderRight: 410,
    verticalMovement: 82,
    horizontalMovement: 100,
  };

  const playerData = {
    startX: Math.floor(Math.random() * 5) * 100 + 10,
    startY: 420,
    spriteWidth: 80,
    spriteHeigth: 132,
  };

  // let score = 0;
  // let level = 0;
  // let maxLevel = 0;
  // let gameSpeed = 1;
  // let frame = 0;
  // let collisionsCount = 0;

  /*
// Enemies our player must avoid
let Enemy = function (x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/

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
    if (key === "up" && this.y > canvasData.borderTop) {
      this.y -= canvasData.verticalMovement;
    } else if (key === "down" && this.y < canvasData.borderBot) {
      this.y += canvasData.verticalMovement;
    } else if (key === "left" && this.x > canvasData.borderLeft) {
      this.x -= canvasData.horizontalMovement;
    } else if (key === "right" && this.x < canvasData.borderRight) {
      this.x += canvasData.horizontalMovement;
    }
  };

  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies

  // Place the player object in a variable called player
  player = new Player(
    playerData.startX,
    playerData.startY,
    playerData.spriteWidth,
    playerData.spriteHeigth,
    spriteSrc
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
}
