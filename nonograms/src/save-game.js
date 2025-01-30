import { createGameArray } from './game-end.js';
import { countCluesColumn, countCluesRow } from './count-clues.js';
import { createTopClues, createLeftClues } from './create-main.js';
import { template5 } from './template-5x5.js';
import { template10 } from './template-10x10.js';
import { startWatch, setTime } from './stop-watch.js';
import resetGame from './reset-game.js';

// сохраняем время, состояние поля, выбранную картинку
export function saveGame() {
  const gameArray = createGameArray();
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
  const activeButton = document.querySelector('.button-active');
  const template = activeButton.id === 'Easy' ? template5 : template10;

  if (nameTemplate) {
    select.value = nameTemplate;

    const arrCluesRow = countCluesRow(template[nameTemplate]);
    const arrCluesColumn = countCluesColumn(template[nameTemplate]);
    createTopClues(arrCluesRow);
    createLeftClues(arrCluesColumn);
  }

  // установить сохраненное состаяние поля
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
}
