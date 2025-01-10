//keypress event depending on difficulty level
import { sequenceShow } from './sequence-show.js';
import { nextLevel } from './next-level.js';

export function inputKeyboard(activeLevel, sequence) {
  let userInput = '';
  const inputText = document.querySelector('input[placeholder]');
  let validCharacters;
  let keyPress = false; //keypress processing flag
  let inputBlocked = false;

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

  //event of pressing a key on a virtual keyboard
  document.addEventListener('keydown', event => {
    if (!keyPress && !inputBlocked) {
      keyPress = true;
      const key = event.key.toUpperCase();
      if (validCharacters.includes(key)) {
        console.log(key);
        processInput(key);
      }
    }
  });

  //event of pressing a key on a physical keyboard
  const allButtons = document.querySelectorAll('.button');
  allButtons.forEach(button => {
    button.addEventListener('click', () => {
      const key = button.id;
      processInput(key);
    });
  });

  function processInput(input) {
    const audioFalse = document.querySelector('.audioFalse');
    const audioTrue = document.querySelector('.audioTrue');

    userInput += input;
    inputText.value = userInput;
    sequenceShow(input);
    if (userInput === sequence) {
      console.log('Correct sequence!');
      audioTrue.play();
      inputBlocked = true;
      nextLevel();
      /* setTimeout(() => {
        userInput = '';
        inputText.value = '';
        return;
      }, 1000);*/
    }
    if (userInput[userInput.length - 1] !== sequence[userInput.length - 1]) {
      console.log('Incorrect sequence!');

      audioFalse.play();
      inputBlocked = true;
      /*setTimeout(() => {
        userInput = '';
        inputText.value = '';
        return;
      }, 1000);*/
    }
    keyPress = false;
  }
}
