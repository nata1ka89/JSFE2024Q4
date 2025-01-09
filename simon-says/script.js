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
    if (level === 'Easy') {
      buttonLevel.classList.add('button-active');
    }
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
    parent: divRound,
    classes: ['hidden']
  });
  const count = createElement({
    tag: 'span',
    text: '1',
    parent: divRound,
    classes: ['hidden']
  });
}
// Main
const main = createElement({
  tag: 'main',
  parent: bodyElement
});

function createInput() {
  const input = document.createElement('input');
  input.type = 'text';
  input.readOnly = true;
  main.appendChild(input);
}

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
    classes: ['keyboard-letter', 'hidden']
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
    if (button === 'Start') {
      buttonGame.classList.add('button-active');
    }
  });
}

createHeader();
createInput();
createKeyboardNum();
createKeyboardLetter();
createGameButton();

//toggle difficulty buttons
const tab = document.querySelectorAll('.button-level');
const keyboardLetter = document.querySelector('.keyboard-letter');
const keyboardNum = document.querySelector('.keyboard-num');
tab.forEach(element => {
  element.addEventListener('click', event => {
    tab.forEach(el => {
      if (el !== element) {
        el.classList.remove('button-active');
      }
    });
    element.classList.add('button-active');

    if (element.id === 'Medium') {
      keyboardLetter.classList.remove('hidden');
      keyboardNum.classList.add('hidden');
    }
    if (element.id === 'Hard') {
      keyboardLetter.classList.remove('hidden');
      keyboardNum.classList.remove('hidden');
    }
    if (element.id === 'Easy') {
      keyboardLetter.classList.add('hidden');
      keyboardNum.classList.remove('hidden');
    }
  });
});
