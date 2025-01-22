export default function createGameArray() {
  document.addEventListener('DOMContentLoaded', () => {
    const gameField = document.querySelectorAll('.cell');
    // создать массив ответов пользователя
    function fillGameArray() {
      const useArr = [];
      let arr = [];
      gameField.forEach((element) => {
        if (element.classList.contains('black-cell')) {
          arr.push(1);
        } else {
          arr.push(0);
        }
        if (arr.length === 5) {
          useArr.push(arr);
          arr = [];
        }
      });
      console.log(useArr);
      return useArr;
    }

    gameField.forEach((element) => {
      element.addEventListener('click', () => {
        element.classList.toggle('black-cell');
        fillGameArray();
      });
    });
  });
}
