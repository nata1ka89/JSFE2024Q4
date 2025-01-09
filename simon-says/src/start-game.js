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
    newGame.classList.remove('button-active');
    start.classList.add('hidden');
    input.classList.remove('hidden');

    buttonLevel.forEach(button => {
      button.disabled = true;
    });
  });
}
