import { countCluesColumn, countCluesRow } from './src/count-clues.js';

const bodyElement = document.body;

function createElement(options) {
  const {
    tag = '', text = '', parent, classes = [], id = '',
  } = options;

  const element = document.createElement(tag);
  element.textContent = text;

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  if (id !== '') {
    element.id = id;
  }

  if (parent != null) {
    parent.appendChild(element);
  }

  return element;
}

// create table
const container = createElement({
  tag: 'div',
  parent: bodyElement,
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

const tableData = [
  [0, 1, 1, 0, 0],
  [1, 1, 0, 0, 1],
  [1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0],
  [1, 0, 0, 1, 0],
];

function createCell() {
  tableData.forEach((row) => {
    const rowElement = createElement({
      tag: 'div',
      parent: field,
      classes: ['row'],
    });

    row.forEach((cell) => {
      const cellElement = createElement({
        tag: 'div',
        parent: rowElement,
        classes: ['cell'],
      });
    });
  });
}

const arrCluesRow = countCluesRow(tableData);
const arrCluesColumn = countCluesColumn(tableData);

function createLeftClues() {
  arrCluesColumn.forEach((row) => {
    const rowElement = createElement({
      tag: 'div',
      parent: leftNumber,
      classes: ['row-number'],
    });

    row.forEach((cell) => {
      const cellElement = createElement({
        tag: 'div',
        parent: rowElement,
        classes: ['cell-number'],
        text: cell,
      });
    });
  });
}

function createTopClues() {
  const emptyElement = createElement({
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
      const cellElement = createElement({
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

const gameField = document.querySelectorAll('.cell');

gameField.forEach((element) => {
  element.addEventListener('click', () => {
    element.classList.toggle('black-cell');
  });
});
