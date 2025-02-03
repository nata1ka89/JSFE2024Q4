import { countCluesColumn, countCluesRow } from './src/count-clues.js';
import { createGameArray, gameEnd } from './src/game-end.js';
import { template5 } from './src/template-5x5.js';
import { template10 } from './src/template-10x10.js';
import { template15 } from './src/template-15x15.js';
import { createButtonLevel, updateListPictures, createListPictures } from './src/create-header.js';
import {
  updateCell,
  createCell, createTopClues, createLeftClues, createContainer, createGameButton,
} from './src/create-main.js';
import resetGame from './src/reset-game.js';
import { startWatch } from './src/stop-watch.js';
import { saveGame, continueGame } from './src/save-game.js';
import showSolution from './src/solution.js';
import randomGame from './src/random-game.js';
import showPopup from './src/result-list.js';

createButtonLevel();
let template = template5;
let pictures = Object.keys(template);
createListPictures(pictures);
createContainer();
createGameButton();
showPopup();

const tab = document.querySelectorAll('.button-level');
let select = document.querySelector('.select');
let nameTemplate = select.value;
createCell(template, nameTemplate);
let arrCluesRow = countCluesRow(template[nameTemplate]);
let arrCluesColumn = countCluesColumn(template[nameTemplate]);
createTopClues(arrCluesRow.arr, arrCluesRow.size, arrCluesColumn.size);
createLeftClues(arrCluesColumn.arr);

let gameField = document.querySelectorAll('.cell');

gameEnd(gameField, template, nameTemplate);

createGameArray(gameField, template);
function switchButtons() {
  resetGame();
  const activeButton = document.querySelector('.button-active');
  template = activeButton.id === 'Easy' ? template5 : activeButton.id === 'Medium' ? template10 : template15;
  pictures = Object.keys(template);

  updateListPictures(pictures);
  select = document.querySelector('.select');
  nameTemplate = select.value;
  updateCell(template, nameTemplate);
  gameField = document.querySelectorAll('.cell');
  gameEnd(gameField, template, nameTemplate);

  createGameArray(gameField, template);
  arrCluesRow = countCluesRow(template[nameTemplate]);
  arrCluesColumn = countCluesColumn(template[nameTemplate]);
  createTopClues(arrCluesRow.arr, arrCluesRow.size, arrCluesColumn.size);
  createLeftClues(arrCluesColumn.arr);
}
tab.forEach((element) => {
  element.addEventListener('click', () => {
    tab.forEach((el) => {
      if (el !== element) {
        el.classList.remove('button-active');
      }
    });
    element.classList.add('button-active');
    if (element.id === 'Medium') {
      template = template10;
      switchButtons();
    }
    if (element.id === 'Hard') {
      template = template15;
      switchButtons();
    }
    if (element.id === 'Easy') {
      template = template5;
      switchButtons();
    }
  });
});
select.addEventListener('change', () => {
  resetGame();
  nameTemplate = select.value;
  const activeButton = document.querySelector('.button-active');
  template = activeButton.id === 'Easy' ? template5 : activeButton.id === 'Medium' ? template10 : template15;

  updateCell(template, nameTemplate);
  arrCluesRow = countCluesRow(template[nameTemplate]);
  arrCluesColumn = countCluesColumn(template[nameTemplate]);
  createTopClues(arrCluesRow.arr, arrCluesRow.size, arrCluesColumn.size);
  createLeftClues(arrCluesColumn.arr);
  gameField = document.querySelectorAll('.cell');

  gameEnd(gameField, template, nameTemplate);
  createGameArray(gameField, template);
});

document.addEventListener('DOMContentLoaded', () => {
  const reset = document.getElementById('Reset-game');
  reset.addEventListener('click', resetGame);

  const start = document.querySelector('.field');
  start.addEventListener('click', startWatch);

  const saveButton = document.getElementById('Save-game');
  saveButton.addEventListener('click', () => {
    saveGame();
  });

  const continueButton = document.getElementById('Continue-last-game');
  continueButton.addEventListener('click', continueGame);
  saveButton.disabled = false;

  const buttonAudio = document.querySelector('.button-audio');
  buttonAudio.addEventListener('click', () => {
    buttonAudio.classList.toggle('button-audioOff');
  });

  const solution = document.getElementById('Solution');
  solution.addEventListener('click', () => {
    showSolution();
    saveButton.disabled = true;
  });
  const randomButton = document.getElementById('Random-game');
  randomButton.addEventListener('click', () => {
    randomGame();
  });

  const resultButton = document.querySelector('.button-result');
  const background = document.querySelector('.background-active');
  resultButton.addEventListener('click', () => {
    background.classList.toggle('pop-up-hidden');
    document.body.classList.toggle('no-scroll');
  });
  const imgClose = document.querySelector('.exit');
  imgClose.addEventListener('click', () => {
    background.classList.toggle('pop-up-hidden');
    document.body.classList.toggle('no-scroll');
  });
});
