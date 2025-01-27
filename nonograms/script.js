import { countCluesColumn, countCluesRow } from './src/count-clues.js';
import createGameArray from './src/game-end.js';
import { stroller } from './src/template-5x5.js';
import createElement from './src/create-element.js';
import createHeader from './src/create-header.js';

const bodyElement = document.body;

// Main
const main = createElement({
  tag: 'main',
  parent: bodyElement,
});

// создание елементов игры

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
  stroller.forEach((row) => {
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

const arrCluesRow = countCluesRow(stroller);
const arrCluesColumn = countCluesColumn(stroller);

function createLeftClues() {
  arrCluesColumn.forEach((row) => {
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

function createTopClues() {
  createElement({
    tag: 'div',
    parent: topNumber,
    classes: ['empty-square'],
  });
  arrCluesRow.forEach((row) => {
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

createTopClues(arrCluesRow);
createCell();
createLeftClues(arrCluesColumn);
createGameArray();
createHeader();
