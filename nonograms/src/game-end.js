import { tableData, p } from '../script.js';

// сравнение массивов
function compareArray(data, useArr) {
  let result = false;
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      if (data[i][j] === useArr[i][j]) {
        result = true;
      } else {
        result = false;
        break;
      }
    }
    if (!result) {
      break;
    }
  }
  return result;
}

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
      return useArr;
    }
    // при каждом клике проверяет соответствует ли текущее решение картинке
    gameField.forEach((element) => {
      element.addEventListener('click', () => {
        element.classList.toggle('black-cell');
        const useArr = fillGameArray();
        const result = compareArray(tableData, useArr);
        if (result === true) {
          p.innerText = 'Great! You have solved the nonogram!';
        }
      });
    });
  });
}
