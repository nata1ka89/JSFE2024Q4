const bodyElement = document.body;

function createElement(options) {
  const { tag = '', text = '', parent, classes = [], id = '' } = options;

  const element = document.createElement(tag);
  element.textContent = text;

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  if (id !== '') {
    element.id = id;
  }

  if (parent != null) {
    parent.appendChild(element);
  }

  return element;
}

// Header
const header = createElement({
  tag: 'header',
  parent: bodyElement
});

function createHeader() {
  //create level button
  const divLevel = createElement({
    tag: 'div',
    classes: ['container-level'],
    parent: header
  });

  const levels = ['Easy', 'Medium', 'Hard'];

  levels.forEach(level => {
    const buttonLevel = createElement({
      tag: 'button',
      text: level,
      parent: divLevel,
      classes: ['button-level'],
      id: level
    });
  });

  //create round
  const divRound = createElement({
    tag: 'div',
    classes: ['container-round'],
    parent: header
  });

  const textSpan = createElement({
    tag: 'span',
    text: 'Round',
    parent: divRound
  });
  const count = createElement({
    tag: 'span',
    text: '1',
    parent: divRound
  });
}
// Main
const main = createElement({
  tag: 'main',
  parent: bodyElement
});

// create Keyboard num
function createKeyboardNum() {
  const container = createElement({
    tag: 'div',
    parent: main,
    classes: ['keyboard-num']
  });

  const num = [...'1234567890'];

  num.forEach(element => {
    const button = createElement({
      tag: 'button',
      text: element,
      parent: container,
      classes: ['button']
    });
    button.addEventListener('click', () => {
      button.classList.toggle('button-active');
    });
  });
}

// create Keyboard letter
function createKeyboardLetter() {
  const container = createElement({
    tag: 'div',
    parent: main,
    classes: ['keyboard-letter']
  });

  const letter = [...'QWERTYUIOPASDFGHJKLZXCVBNM'];

  letter.forEach(element => {
    const button = createElement({
      tag: 'button',
      text: element,
      parent: container,
      classes: ['button']
    });
    button.addEventListener('click', () => {
      button.classList.toggle('button-active');
    });
  });
}

// create "Start" button,"Repeat the sequence" button, "New game" button

function createGameButton() {
  //create Game button
  const divGame = createElement({
    tag: 'div',
    classes: ['container-game'],
    parent: main
  });

  const buttonsGame = ['Repeat the sequence', 'New game', 'Start'];

  buttonsGame.forEach(button => {
    const buttonId = button.replace(/\s+/g, '-');
    const buttonGame = createElement({
      tag: 'button',
      text: button,
      parent: divGame,
      classes: ['button-game'],
      id: buttonId
    });
  });
}

createHeader();
createKeyboardNum();
createKeyboardLetter();
createGameButton();
