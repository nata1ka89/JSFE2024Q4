import createElement from './create-element.js';

export function createContainer() {
  const bodyElement = document.body;

  // Main
  const main = createElement({
    tag: 'main',
    parent: bodyElement,
  });

  const audioEnd = document.createElement('audio');
  audioEnd.src = './audio/end.mp3';
  audioEnd.classList.add('audioEnd');

  const audioClick = document.createElement('audio');
  audioClick.src = './audio/click.mp3';
  audioClick.classList.add('audioClick');

  main.appendChild(audioEnd);
  main.appendChild(audioClick);

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
  createElement({
    tag: 'div',
    parent: containerTop,
    classes: ['top-number'],
  });
  createElement({
    tag: 'div',
    parent: containerBottom,
    classes: ['left-number'],
  });
  createElement({
    tag: 'div',
    parent: containerBottom,
    classes: ['field'],
  });
  createElement({
    tag: 'span',
    parent: main,
    classes: ['watch'],
    text: '00:00',
  });
  createElement({
    tag: 'div',
    classes: ['container-button'],
    parent: main,
  });
}

export function createCell(template, nameTemplate) {
  const field = document.querySelector('.field');
  template[nameTemplate].forEach((row) => {
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

export function createLeftClues(data) {
  const leftNumber = document.querySelector('.left-number');

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

export function createTopClues(data, height, width) {
  const topNumber = document.querySelector('.top-number');

  topNumber.innerHTML = '';
  const widthSquare = 20 * width + 2 * (width - 1);
  const heightSquare = 20 * height + 2 * (height - 1);

  createElement({
    tag: 'div',
    parent: topNumber,
    classes: ['empty-square'],
    styles: {
      width: `${widthSquare}px`,
      height: `${heightSquare}px`,
    },
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

export function createGameButton() {
  // create Game button
  const divGame = document.querySelector('.container-button');

  const buttonsGame = ['Continue last game', 'Save game', 'Reset game'];

  buttonsGame.forEach((button) => {
    const buttonId = button.replace(/\s+/g, '-');
    createElement({
      tag: 'button',
      text: button,
      parent: divGame,
      classes: ['button-game'],
      id: buttonId,
    });
  });
}

export function updateCell(template, nameTemplate) {
  const field = document.querySelector('.field');
  field.innerHTML = '';

  template[nameTemplate].forEach((row) => {
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
