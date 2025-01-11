export function disabledButtons() {
  const allButtons = document.querySelectorAll('.button');
  allButtons.forEach(button => {
    button.classList.remove('button-active');
    button.disabled = true;
  });

  const newGame = document.getElementById('New-game');
  newGame.disabled = true;

  const repeat = document.getElementById('Repeat-the-sequence');
  repeat.disabled = true;
}

export function enableButtons() {
  const allButtons = document.querySelectorAll('.button');
  allButtons.forEach(button => {
    button.classList.remove('button-active');
    button.disabled = false;
  });

  const newGame = document.getElementById('New-game');
  newGame.disabled = false;

  const repeat = document.getElementById('Repeat-the-sequence');
  if (repeat.getAttribute('name') === 'disabled') {
    repeat.disabled = true;
  } else {
    repeat.disabled = false;
  }
}
