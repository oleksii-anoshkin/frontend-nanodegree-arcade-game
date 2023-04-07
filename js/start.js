// -------------------------------------------------------------------------
// Show start popup
startGame(GAME_DATA);

// Add listeners
document.addEventListener("click", function (e) {
  // Select character image
  if (e.target.className.includes(GAME_DATA.IMG_CLASS)) {
    setCharacter(e);
  }
  
  // React to pressing the button and starting the game
  if (e.target.className.includes(GAME_DATA.BTN_CLASS)) {
    // Delete start popup
    deleteElement(GAME_DATA.CONT_PARENT_CLASS, GAME_DATA.DELETE_METHOD);

    // Create game objects
    createObjects();

    // Start game engine
    Engine(window);

    // Show info bar
    bar.render();
  }
});

document.addEventListener("keyup", function (e) {
  // Select character image
  if (e.key === "Enter" && e.target.className.includes(GAME_DATA.IMG_CLASS)) {
    setCharacter(e);
  }

  // React to pressing the button and starting the game.
  if (e.key === "Enter" && e.target.className.includes(GAME_DATA.BTN_CLASS)) {
    // Delete start popup
    deleteElement(GAME_DATA.CONT_PARENT_CLASS, GAME_DATA.DELETE_METHOD);
    
    // Create game objects
    createObjects();

    // Start game engine
    Engine(window);

    // Show info bar
    bar.render();
  }
});

// -------------------------------------------------------------------------
