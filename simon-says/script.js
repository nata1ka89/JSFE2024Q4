import { startGame } from './src/start-game.js';
import { restartGame } from './src/new-game.js';
import { disabledButtons } from './src/control-buttons.js';
import { repeatSequence } from './src/repeat-sequence.js';

document.addEventListener('DOMContentLoaded', () => {
  startGame();
  restartGame();
  disabledButtons();
  repeatSequence();
});

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
    classes: ['container-round', 'hidden'],
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
    id: 'round',
    parent: divRound
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
  input.placeholder = '';
  input.classList.add('hidden');
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
      classes: ['button'],
      id: element
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
      classes: ['button'],
      id: element
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

  const buttonsGame = ['Repeat the sequence', 'Next', 'New game', 'Start'];

  buttonsGame.forEach(button => {
    const buttonId = button.replace(/\s+/g, '-');
    const buttonGame = createElement({
      tag: 'button',
      text: button,
      parent: divGame,
      classes: ['button-game', 'button-active'],
      id: buttonId
    });

    if (button !== 'Start') {
      buttonGame.classList.add('hidden');
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
  element.addEventListener('click', () => {
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
// add audio files
const audioFalse = document.createElement('audio');
audioFalse.src = './audio/false.mp3';
audioFalse.classList.add('audioFalse');

const audioTrue = document.createElement('audio');
audioTrue.src = './audio/true.mp3';
audioTrue.classList.add('audioTrue');

const audioEnd = document.createElement('audio');
audioEnd.src = './audio/end.mp3';
audioEnd.classList.add('audioEnd');

const audioGameOver = document.createElement('audio');
audioGameOver.src = './audio/gameOver.mp3';
audioGameOver.classList.add('audioGameOver');

main.appendChild(audioTrue);
main.appendChild(audioFalse);
main.appendChild(audioEnd);
main.appendChild(audioGameOver);
