import { countCluesColumn, countCluesRow } from './src/count-clues.js';
import { createGameArray, gameEnd } from './src/game-end.js';
import { template5 } from './src/template-5x5.js';
import createHeader from './src/create-header.js';
import {
  createCell, createTopClues, createLeftClues, createContainer, createGameButton,
} from './src/create-main.js';
import resetGame from './src/reset-game.js';
import { startWatch } from './src/stop-watch.js';
import { saveGame, continueGame } from './src/save-game.js';

createHeader();
createContainer();
createGameButton();
let arrCluesRow = countCluesRow(template5.Stroller);
let arrCluesColumn = countCluesColumn(template5.Stroller);
createTopClues(arrCluesRow);
createCell();
createLeftClues(arrCluesColumn);
createGameArray();

// выбор картинки
document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('.select');
  if (select) {
    select.addEventListener('change', () => {
      const nameTemplate = select.value;

      resetGame();

      arrCluesRow = countCluesRow(template5[nameTemplate]);
      arrCluesColumn = countCluesColumn(template5[nameTemplate]);
      createTopClues(arrCluesRow);
      createLeftClues(arrCluesColumn);
    });
  }
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
