import { countCluesColumn, countCluesRow } from './src/count-clues.js';
import { createGameArray, gameEnd } from './src/game-end.js';
import { template5 } from './src/template-5x5.js';
import { template10 } from './src/template-10x10.js';
import { createButtonLevel, createListPictures } from './src/create-header.js';
import {
  createCell, createTopClues, createLeftClues, createContainer, createGameButton,
} from './src/create-main.js';
import resetGame from './src/reset-game.js';
import { startWatch } from './src/stop-watch.js';
import { saveGame, continueGame } from './src/save-game.js';

createButtonLevel();
createContainer();
createGameButton();

document.addEventListener('DOMContentLoaded', () => {
  const activeButton = document.querySelector('.button-active');
  const template = activeButton.id === 'Easy' ? template5 : template10;
  const pictures = Object.keys(template);
  console.log(pictures);

  createListPictures(pictures);

  const select = document.querySelector('.select');
  const nameTemplate = select.value;

  createCell(template, nameTemplate);
  let arrCluesRow = countCluesRow(template[nameTemplate]);
  let arrCluesColumn = countCluesColumn(template[nameTemplate]);
  createTopClues(arrCluesRow);
  createLeftClues(arrCluesColumn);
  createGameArray();

  // выбор картинки

  select.addEventListener('change', () => {
    resetGame();

    arrCluesRow = countCluesRow(template[nameTemplate]);
    arrCluesColumn = countCluesColumn(template[nameTemplate]);
    createTopClues(arrCluesRow);
    createLeftClues(arrCluesColumn);
  });

  gameEnd();

  const reset = document.getElementById('Reset-game');
  reset.addEventListener('click', resetGame);

  const start = document.querySelector('.field');
  start.addEventListener('click', startWatch);

  const saveButton = document.getElementById('Save-game');
  saveButton.addEventListener('click', saveGame);

  const continueButton = document.getElementById('Continue-last-game');
  continueButton.addEventListener('click', continueGame);
});
