import { template5 } from './template-5x5.js';
import { template10 } from './template-10x10.js';
import { template15 } from './template-15x15.js';
import resetGame from './reset-game.js';
import { setGameFinish } from './state-game.js';

export default function showSolution() {
  resetGame();
  setGameFinish(true);
  const activeButton = document.querySelector('.button-active');
  const template = activeButton.id === 'Easy' ? template5 : activeButton.id === 'Medium' ? template10 : template15;

  const select = document.querySelector('.select');
  const nameTemplate = select.value;
  const arrSolution = template[nameTemplate].flat();
  const gameField = document.querySelectorAll('.cell');
  for (let i = 0; i < arrSolution.length; i += 1) {
    if (arrSolution[i] === 1) {
      gameField[i].classList.add('black-cell');
    }
    if (arrSolution[i] === 0) {
      gameField[i].classList.remove('black-cell');
    }
    const close = gameField[i].querySelector('.close');
    close.classList.add('hidden');
  }
}
