import { clearWatch, startWatch } from './stop-watch.js';
import { setGameFinish } from './state-game.js';

export default function resetGame() {
  setGameFinish(false);
  const saveButton = document.getElementById('Save-game');
  const gameField = document.querySelectorAll('.cell');
  const span = document.querySelector('.text');
  gameField.forEach((element) => {
    element.classList.remove('black-cell');
    const close = element.querySelector('.close');
    close.classList.add('hidden');
  });
  clearWatch();
  span.innerText = '';
  const start = document.querySelector('.field');
  start.addEventListener('click', startWatch);
  saveButton.disabled = false;
}
