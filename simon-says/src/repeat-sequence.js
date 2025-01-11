import { sequenceShow } from './sequence-show.js';
import { disabledButtons } from './control-buttons.js';
import { enableButtons } from './control-buttons.js';
import { saveSequence } from './sequence-show.js';
import { inputKeyboard } from './input-keyboard.js';
import { getActiveLevel } from './start-game.js';

export function repeatSequence() {
  const repeat = document.getElementById('Repeat-the-sequence');
  const inputText = document.querySelector('input[placeholder]');

  repeat.addEventListener('click', async () => {
    inputText.value = '';
    let sequence = saveSequence();
    disabledButtons();
    await sequenceShow(sequence);
    repeat.setAttribute('name', 'disabled'); //set attribute to control button state
    enableButtons();
    const activeLevel = getActiveLevel();
    inputKeyboard(activeLevel, sequence);
  });
}
