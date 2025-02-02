import { createGameArray, gameEnd } from './game-end.js';
import { countCluesColumn, countCluesRow } from './count-clues.js';
import { updateCell, createTopClues, createLeftClues } from './create-main.js';
import { template5 } from './template-5x5.js';
import { template10 } from './template-10x10.js';
import { template15 } from './template-15x15.js';
import { startWatch, setTime } from './stop-watch.js';
import resetGame from './reset-game.js';
import { updateListPictures } from './create-header.js';

// сохраняем время, состояние поля, выбранную картинку
export function saveGame() {
  const gameField = document.querySelectorAll('.cell');
  const activeButton = document.querySelector('.button-active');
  const template = activeButton.id === 'Easy' ? template5 : activeButton.id === 'Medium' ? template10 : template15;
  const gameArray = createGameArray(gameField, template);

  localStorage.setItem('activeButton', activeButton.id);
  localStorage.setItem('field', gameArray);

  const watch = document.querySelector('.watch ');
  const watchText = watch.innerText;
  localStorage.setItem('watch', watchText);

  const select = document.querySelector('.select');
  localStorage.setItem('picture', select.value);
}

export function continueGame() {
  resetGame();
  // установить выбранную картинку и подсказки
  const select = document.querySelector('.select');
  const nameTemplate = localStorage.getItem('picture');
  const tab = document.querySelectorAll('.button-level');
  const activeButton = localStorage.getItem('activeButton');
  tab.forEach((element) => {
    element.classList.remove('button-active');
    if (element.id === activeButton) {
      element.classList.add('button-active');
    }
  });

  const template = activeButton === 'Easy' ? template5 : activeButton === 'Medium' ? template10 : template15;
  const pictures = Object.keys(template);
  updateListPictures(pictures);
  if (nameTemplate) {
    select.value = nameTemplate;

    const arrCluesRow = countCluesRow(template[nameTemplate]);
    const arrCluesColumn = countCluesColumn(template[nameTemplate]);
    createTopClues(arrCluesRow.arr, arrCluesRow.size, arrCluesColumn.size);
    createLeftClues(arrCluesColumn.arr);
  }

  // установить сохраненное состаяние поля
  updateCell(template, nameTemplate);
  const valueString = localStorage.getItem('field');
  if (valueString) {
    const numArray = valueString.split(',').map(Number);

    const gameField = document.querySelectorAll('.cell');

    for (let i = 0; i < numArray.length; i += 1) {
      if (numArray[i] === 1) {
        gameField[i].classList.add('black-cell');
      }
      const close = gameField[i].querySelector('.close');
      if (numArray[i] === 2) {
        close.classList.remove('hidden');
      }
    }
  }

  // установить сохраненный таймер

  const watch = document.querySelector('.watch ');
  const saveWatch = localStorage.getItem('watch');
  if (saveWatch) {
    const [savedMin, savedSec] = saveWatch.split(':').map(Number);
    setTime(savedMin, savedSec);
    watch.innerText = saveWatch;
    startWatch();
  }
  const gameField = document.querySelectorAll('.cell');
  gameEnd(gameField, template, nameTemplate);
}
