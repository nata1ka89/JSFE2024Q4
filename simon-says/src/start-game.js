import { sequenceGeneration } from './sequence-show.js';
import { sequenceShow } from './sequence-show.js';
import { inputKeyboard } from './input-keyboard.js';
import { disabledButtons } from './control-buttons.js';
import { enableButtons } from './control-buttons.js';

export function startGame() {
  const start = document.getElementById('Start');

  start.addEventListener('click', prepareGame);
}

export function getActiveLevel() {
  const levelElement = document.querySelector('.button-level.button-active');
  return levelElement ? levelElement.id : 'Easy';
}

async function prepareGame() {
  const start = document.getElementById('Start');
  const repeat = document.getElementById('Repeat-the-sequence');
  const newGame = document.getElementById('New-game');
  const containerRound = document.querySelector('.container-round');
  const input = document.getElementsByTagName('input')[0];
  const buttonLevel = document.querySelectorAll('.button-level');

  containerRound.classList.remove('hidden');
  repeat.classList.remove('hidden');
  newGame.classList.remove('hidden');
  start.classList.add('hidden');
  input.classList.remove('hidden');

  buttonLevel.forEach(button => {
    button.disabled = true;
  });
  const activeLevel = getActiveLevel();
  const sequence = sequenceGeneration(activeLevel);
  disabledButtons();
  await sequenceShow(sequence);
  enableButtons();
  inputKeyboard(activeLevel, sequence);
}
