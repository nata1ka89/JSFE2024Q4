import { sequenceGeneration } from './sequence-show.js';
import { sequenceShow } from './sequence-show.js';
import { inputKeyboard } from './input-keyboard.js';

export function startGame() {
  const start = document.getElementById('Start');
  const repeat = document.getElementById('Repeat-the-sequence');
  const newGame = document.getElementById('New-game');
  const containerRound = document.querySelector('.container-round');
  const input = document.getElementsByTagName('input')[0];
  const buttonLevel = document.querySelectorAll('.button-level');

  start.addEventListener('click', () => {
    containerRound.classList.remove('hidden');
    repeat.classList.remove('hidden');
    newGame.classList.remove('hidden');
    start.classList.add('hidden');
    input.classList.remove('hidden');

    buttonLevel.forEach(button => {
      button.disabled = true;
    });

    const activeLevel = document.querySelector(
      '.button-level.button-active'
    ).id;

    let sequence = sequenceGeneration(activeLevel);
    sequenceShow(sequence);
    inputKeyboard(activeLevel, sequence);
  });
}
