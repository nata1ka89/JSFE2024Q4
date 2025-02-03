import { template5 } from './template-5x5.js';
import { template10 } from './template-10x10.js';
import { template15 } from './template-15x15.js';
import { countCluesColumn, countCluesRow } from './count-clues.js';
import { updateListPictures } from './create-header.js';
import { updateCell, createTopClues, createLeftClues } from './create-main.js';
import resetGame from './reset-game.js';
import { gameEnd } from './game-end.js';

export default function randomGame() {
  resetGame();
  const pictures5 = Object.keys(template5);
  const pictures10 = Object.keys(template10);
  const pictures15 = Object.keys(template15);

  const allPictures = pictures5.concat(pictures10, pictures15);
  const randomIndex = Math.floor(Math.random() * allPictures.length);
  const randomPicture = allPictures[randomIndex];
  const select = document.querySelector('.select');
  const tab = document.querySelectorAll('.button-level');
  let activeButton;
  let template;
  let picture;
  if (pictures5.includes(randomPicture)) {
    activeButton = 'Easy';
    template = template5;
    picture = pictures5;
  }
  if (pictures10.includes(randomPicture)) {
    activeButton = 'Medium';
    template = template10;
    picture = pictures10;
  }
  if (pictures15.includes(randomPicture)) {
    activeButton = 'Hard';
    template = template15;
    picture = pictures15;
  }

  tab.forEach((element) => {
    element.classList.remove('button-active');
    if (element.id === activeButton) {
      element.classList.add('button-active');
    }
  });
  updateListPictures(picture);
  select.value = randomPicture;
  const arrCluesRow = countCluesRow(template[randomPicture]);
  const arrCluesColumn = countCluesColumn(template[randomPicture]);
  createTopClues(arrCluesRow.arr, arrCluesRow.size, arrCluesColumn.size);
  createLeftClues(arrCluesColumn.arr);
  updateCell(template, randomPicture);
  const gameField = document.querySelectorAll('.cell');

  gameEnd(gameField, template, randomPicture);
}
