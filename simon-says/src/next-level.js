import { sequenceShow } from './sequence-show.js';
import { sequenceGeneration } from './sequence-show.js';
import { inputKeyboard } from './input-keyboard.js';

export function nextLevel() {
  const repeat = document.getElementById('Repeat-the-sequence');
  const next = document.getElementById('Next');
  repeat.classList.add('hidden');
  next.classList.remove('hidden');
  next.addEventListener('click', nextPress);
}

function nextPress() {
  const repeat = document.getElementById('Repeat-the-sequence');
  const next = document.getElementById('Next');
  repeat.classList.remove('hidden');
  next.classList.add('hidden');
  let roundElement = document.getElementById('round');
  let round = parseInt(roundElement.textContent);
  round += 1;
  roundElement.textContent = round;
  const inputText = document.querySelector('input[placeholder]');
  inputText.value = '';
  const activeLevel = document.querySelector('.button-level.button-active').id;
  let sequence = sequenceGeneration(activeLevel);

  sequenceShow(sequence);
  inputKeyboard(activeLevel, sequence);
}
