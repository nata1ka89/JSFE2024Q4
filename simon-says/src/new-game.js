import { startGame } from './start-game.js';
import { disabledButtons } from './control-buttons.js';

export function restartGame() {
  const newGame = document.getElementById('New-game');
  const start = document.getElementById('Start');
  const repeat = document.getElementById('Repeat-the-sequence');
  const next = document.getElementById('Next');
  const containerRound = document.querySelector('.container-round');
  const input = document.getElementsByTagName('input')[0];
  const buttonLevel = document.querySelectorAll('.button-level');
  const inputText = document.querySelector('input[placeholder]');

  newGame.addEventListener('click', () => {
    start.classList.remove('hidden');
    repeat.classList.add('hidden');
    newGame.classList.add('hidden');
    next.classList.add('hidden');
    containerRound.classList.add('hidden');
    input.classList.add('hidden');
    buttonLevel.forEach(button => {
      button.disabled = false;
    });
    disabledButtons();
    let roundElement = document.getElementById('round');
    let round = parseInt(roundElement.textContent);
    round = 1;
    roundElement.textContent = round;
    inputText.value = '';

    startGame();
  });
}
