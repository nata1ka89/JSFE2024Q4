import { template5 } from './template-5x5.js';
import { template10 } from './template-10x10.js';
import { stopWatch } from './stop-watch.js';

// сравнение массивов
function compareArray(data, useArr) {
  let result = false;
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      if (useArr[i][j] === 2) {
        useArr[i][j] = 0;
      }
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

// создать массив ответов пользователя
export function createGameArray() {
  const gameField = document.querySelectorAll('.cell');
  const useArr = [];
  let arr = [];
  gameField.forEach((element) => {
    const close = element.querySelector('.close');
    if (element.classList.contains('black-cell')) {
      arr.push(1);
    } else if (!close.classList.contains('hidden')) {
      arr.push(2);
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
export function gameEnd() {
  const span = document.querySelector('.text');
  const gameField = document.querySelectorAll('.cell');
  const audioEnd = document.querySelector('.audioEnd');
  const audioClick = document.querySelector('.audioClick');
  gameField.forEach((element) => {
    element.addEventListener('click', () => {
      const activeButton = document.querySelector('.button-active');
      const template = activeButton.id === 'Easy' ? template5 : template10;
      const select = document.querySelector('.select');
      const nameTemplate = select.value;
      element.classList.toggle('black-cell');
      audioClick.play();
      const useArr = createGameArray();
      const result = compareArray(template[nameTemplate], useArr);
      if (result === true) {
        stopWatch();
        const watch = document.querySelector('.watch ');
        const timeArray = watch.textContent.split(':');
        const sumSec = parseInt(timeArray[0] * 60) + parseInt(timeArray[1]);
        span.innerText = `Great! You have solved the nonogram in ${sumSec} seconds!`;
        audioEnd.play();
      }
    });
    element.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const close = element.querySelector('.close');
      close.classList.toggle('hidden');
      audioClick.play();
      if (element.classList.contains('black-cell')) {
        element.classList.remove('black-cell');
      }
    });
  });
}
