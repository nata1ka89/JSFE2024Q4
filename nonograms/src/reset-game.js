export default function resetGame() {
  const gameField = document.querySelectorAll('.cell');
  gameField.forEach((element) => {
    element.classList.remove('black-cell');
  });
}
