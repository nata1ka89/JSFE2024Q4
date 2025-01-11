//keypress event depending on difficulty level
import { sequenceShow } from './sequence-show.js';
import { nextLevel } from './next-level.js';

let keyPress = false; //keypress processing flag
let inputBlocked = true;
let userInput = '';

export function inputKeyboard(activeLevel, sequence) {
  keyPress = false; //keypress processing flag
  inputBlocked = false;
  userInput = '';
  let validCharacters;
  switch (activeLevel) {
    case 'Easy':
      validCharacters = '1234567890';
      break;
    case 'Medium':
      validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      break;
    case 'Hard':
      validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      break;
    default:
      validCharacters = '';
  }
  setupEventListeners(validCharacters, sequence);
  console.log(sequence);
}

let keydownHandler;
let buttonClickHandler;
function setupEventListeners(validCharacters, sequence) {
  // Remove old event handlers
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
  }
  if (buttonClickHandler) {
    const allButtons = document.querySelectorAll('.button');
    allButtons.forEach(button => {
      button.removeEventListener('click', buttonClickHandler);
    });
  }
  // Add new event handlers
  keydownHandler = event => {
    if (!keyPress && !inputBlocked) {
      keyPress = true;
      const key = event.key.toUpperCase();
      if (validCharacters.includes(key)) {
        console.log(key);
        processInput(key, sequence);
      }
    }
  };

  buttonClickHandler = event => {
    if (!inputBlocked) {
      const key = event.target.id;
      processInput(key, sequence);
    }
  };

  //event of pressing a key on a physical keyboard
  document.addEventListener('keydown', keydownHandler);

  //event of pressing a key on a virtual keyboard
  const allButtons = document.querySelectorAll('.button');
  allButtons.forEach(button => {
    button.addEventListener('click', buttonClickHandler);
  });
}

function processInput(input, sequence) {
  const audioFalse = document.querySelector('.audioFalse');
  const audioTrue = document.querySelector('.audioTrue');
  const inputText = document.querySelector('input[placeholder]');

  userInput += input;
  inputText.value = userInput;
  sequenceShow(input);
  if (userInput === sequence) {
    console.log('Correct sequence!');
    audioTrue.play();
    inputBlocked = true;
    nextLevel();
  }
  if (userInput[userInput.length - 1] !== sequence[userInput.length - 1]) {
    console.log('Incorrect sequence!');

    audioFalse.play();
    inputBlocked = true;
  }
  keyPress = false;
}
