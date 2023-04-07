// -------------------------------------------------------------------
// Create bar class
const Bar = function (
  // General
  elemTag,
  elemClass,
  parentClass,
  addMethod,
  deleteMethod,
  // Items
  itemTag,
  itemClass,
  // Images
  imgClass,
  imgSrc,
  imgTab,
  // Texts
  textClass,
  texts,
  textsClasses
) {
  // General
  this.elemTag = elemTag;
  this.elemClass = elemClass;
  this.parentClass = parentClass;
  this.addMethod = addMethod;
  this.deleteMethod = deleteMethod;
  // Items
  this.itemTag = itemTag;
  this.itemClass = itemClass;
  // Images
  this.imgClass = imgClass;
  this.imgSrc = imgSrc;
  this.imgTab = imgTab;
  // Texts
  this.textClass = textClass;
  this.texts = texts;
  this.textsClasses = textsClasses;
};

// Check bar
Bar.prototype.check = function () {
  const elem = document.getElementsByClassName(this.elemClass);

  if (elem.length) deleteElement(this.parentClass, this.deleteMethod);
};

// Сreate hearts
Bar.prototype.renderHearts = function (life) {
  const item = document.createElement(this.itemTag);
  item.setAttribute("class", this.itemClass);

  for (let i = 1; i <= life; i += 1) {
    createImg(this.imgClass, this.imgSrc, item, this.addMethod, this.imgTab);
  }

  document.querySelector(`.${this.elemClass}`)[this.addMethod](item);
};

// Create text lines
Bar.prototype.renderTexts = function (...values) {
  // values = [score, level, maxLevel]
  for (let i = 0; i <= values.length - 1; i += 1) {
    createText(
      this.itemTag,
      this.textClass,
      `${this.texts[i]}:<span class="${this.textsClasses[i]}">${values[i]}</span>`,
      this.elemClass,
      this.addMethod
    );
  }
};

// Render bar
Bar.prototype.render = function () {
  // Сheck the presence of the element on the page and delete it before creating a new instance
  this.check();

  // Create a bar container
  createElement(this.elemTag, this.elemClass, this.parentClass, this.addMethod);

  // Create bar elements
  // Сreate hearts
  this.renderHearts(life);

  // Create text lines that show score, level and max level
  this.renderTexts(score, level, maxLevel);
};

// Create bar object
const bar = new Bar(
  // General
  BAR_DATA.ELEM_TAG,
  BAR_DATA.ELEM_CLASS,
  BAR_DATA.PARENT_CLASS,
  BAR_DATA.ADD_METHOD,
  BAR_DATA.DELETE_METHOD,
  // Items
  BAR_DATA.ITEM_TAG,
  BAR_DATA.ITEM_CLASS,
  // Images
  HEART_DATA.CLASS,
  HEART_DATA.SRC_MINI,
  BAR_DATA.IMG_TAB,
  // Texts
  BAR_DATA.ITEM_TEXT_CLASS,
  BAR_DATA.TEXTS,
  BAR_DATA.TEXTS_CLASSES
);

// -------------------------------------------------------------------
