import { countCluesColumn, countCluesRow } from './src/count-clues.js';
import { createGameArray, gameEnd } from './src/game-end.js';
import { template5 } from './src/template-5x5.js';
import createElement from './src/create-element.js';
import createHeader from './src/create-header.js';

const bodyElement = document.body;

// Main
const main = createElement({
  tag: 'main',
  parent: bodyElement,
});

// создание елементов игры

createElement({
  tag: 'span',
  parent: main,
  classes: ['text'],
  text: '',
});

const container = createElement({
  tag: 'div',
  parent: main,
  classes: ['container'],
});
const containerTop = createElement({
  tag: 'div',
  parent: container,
  classes: ['container-top'],
});
const containerBottom = createElement({
  tag: 'div',
  parent: container,
  classes: ['container-bottom'],
});
const topNumber = createElement({
  tag: 'div',
  parent: containerTop,
  classes: ['top-number'],
});
const leftNumber = createElement({
  tag: 'div',
  parent: containerBottom,
  classes: ['left-number'],
});
const field = createElement({
  tag: 'div',
  parent: containerBottom,
  classes: ['field'],
});

function createCell() {
  template5.Stroller.forEach((row) => {
    const rowElement = createElement({
      tag: 'div',
      parent: field,
      classes: ['row'],
    });

    row.forEach(() => {
      const cellElement = createElement({
        tag: 'div',
        parent: rowElement,
        classes: ['cell'],
      });
      createElement({
        tag: 'span',
        parent: cellElement,
        classes: ['close', 'hidden'],
        text: '✖',
      });
    });
  });
}

function createLeftClues(data) {
  leftNumber.innerHTML = '';
  data.forEach((row) => {
    const rowElement = createElement({
      tag: 'div',
      parent: leftNumber,
      classes: ['row-number'],
    });

    row.forEach((cell) => {
      createElement({
        tag: 'div',
        parent: rowElement,
        classes: ['cell-number'],
        text: cell,
      });
    });
  });
}

function createTopClues(data) {
  topNumber.innerHTML = '';
  createElement({
    tag: 'div',
    parent: topNumber,
    classes: ['empty-square'],
  });
  data.forEach((row) => {
    const rowElement = createElement({
      tag: 'div',
      parent: topNumber,
      classes: ['row-number-top'],
    });

    row.forEach((cell) => {
      createElement({
        tag: 'div',
        parent: rowElement,
        classes: ['cell-number'],
        text: cell,
      });
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  let arrCluesRow = countCluesRow(template5.Stroller);
  let arrCluesColumn = countCluesColumn(template5.Stroller);
  createTopClues(arrCluesRow);
  createCell();
  createLeftClues(arrCluesColumn);
  createGameArray();
  createHeader();

  // выбор картинки

  const select = document.querySelector('.select');
  select.addEventListener('change', () => {
    const nameTemplate = select.value;

    arrCluesRow = countCluesRow(template5[nameTemplate]);
    arrCluesColumn = countCluesColumn(template5[nameTemplate]);
    createTopClues(arrCluesRow);
    createLeftClues(arrCluesColumn);
  });

  gameEnd();
});
