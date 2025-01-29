import { clearWatch, startWatch } from './stop-watch.js';

export default function resetGame() {
  const gameField = document.querySelectorAll('.cell');
  gameField.forEach((element) => {
    element.classList.remove('black-cell');
    const close = element.querySelector('.close');
    close.classList.add('hidden');
  });

  clearWatch();

  const start = document.querySelector('.field');
  start.addEventListener('click', startWatch);
}
