//keypress event depending on difficulty level
import { sequenceShow } from './sequence-show.js';

export function inputKeyboard(activeLevel, sequence) {
  let userInput = '';
  const inputText = document.querySelector('input[placeholder]');
  let validCharacters;
  let keyPress = false; //keypress processing flag

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

  document.addEventListener('keydown', 'click', event => {
    if (!keyPress) {
      keyPress = true;
      const key = event.key.toUpperCase();
      if (validCharacters.includes(key)) {
        console.log(key);
        processInput(key);
      }
    }
  });

  function processInput(input) {
    userInput += input;
    inputText.value = userInput;
    sequenceShow(input);
    if (userInput === sequence) {
      console.log('Correct sequence!');
      setTimeout(() => {
        userInput = '';
        inputText.value = '';
        return;
      }, 1000);
    }
    if (userInput[userInput.length - 1] !== sequence[userInput.length - 1]) {
      console.log('Incorrect sequence!');
      setTimeout(() => {
        userInput = '';
        inputText.value = '';
        return;
      }, 1000);
    }
    keyPress = false;
  }
}
