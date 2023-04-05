// Infobar variables
const TEXT_ARR = {
  TEXTS: ["score", "level", "max level"],
  CLASSES: ["info-bar__score", "info-bar__level", "info-bar__max-level"],
};

const HEART_INFO = {
  HEART_CLASS: "info-bar__heart",
  HEART_SRC: "images/heart–mini.png",
};

// Info bar
function showInfoBar() {
  // Сheck the presence of the element on the page and delete it before creating a new instance.
  const infoBar = document.getElementsByClassName("info-bar__box");

  if (infoBar.length) {
    deleteWrapElement("lastChild");
  }

  // Create a container
  const infoBarBox = document.createElement("ul");
  infoBarBox.setAttribute("class", "info-bar__box");
  document.querySelector(".wrap").append(infoBarBox);

  // Create elements
  // Сalculate and create the required number of hearts.
  createHearts(HEART_INFO.HEART_SRC, HEART_INFO.HEART_CLASS, life);
  // Calculate and create text lines showing level, max level and score.
  createTextLines(TEXT_ARR, score, level, maxLevel);
}
