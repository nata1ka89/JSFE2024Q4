import { countCluesColumn, countCluesRow } from './src/count-clues.js';
import { createGameArray, gameEnd } from './src/game-end.js';
import { template5 } from './src/template-5x5.js';
import createElement from './src/create-element.js';
import createHeader from './src/create-header.js';
import resetGame from './src/reset-game.js';
import { startWatch } from './src/stop-watch.js';
import { saveGame, continueGame } from './src/save-game.js';

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

export function createLeftClues(data) {
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

export function createTopClues(data) {
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

createElement({
  tag: 'span',
  parent: main,
  classes: ['watch'],
  text: '00:00',
});

function createGameButton() {
  // create Game button
  const divGame = createElement({
    tag: 'div',
    classes: ['container-button'],
    parent: main,
  });

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

document.addEventListener('DOMContentLoaded', () => {
  let arrCluesRow = countCluesRow(template5.Stroller);
  let arrCluesColumn = countCluesColumn(template5.Stroller);
  createTopClues(arrCluesRow);
  createCell();
  createLeftClues(arrCluesColumn);
  createGameArray();
  createHeader();
  createGameButton();

  // выбор картинки

  const select = document.querySelector('.select');
  select.addEventListener('change', () => {
    const nameTemplate = select.value;

    resetGame();

    arrCluesRow = countCluesRow(template5[nameTemplate]);
    arrCluesColumn = countCluesColumn(template5[nameTemplate]);
    createTopClues(arrCluesRow);
    createLeftClues(arrCluesColumn);
  });

  gameEnd();

  const reset = document.getElementById('Reset-game');
  reset.addEventListener('click', resetGame);

  const start = document.querySelector('.field');
  start.addEventListener('click', startWatch);

  const saveButton = document.getElementById('Save-game');
  saveButton.addEventListener('click', saveGame);

  const continueButton = document.getElementById('Continue-last-game');
  continueButton.addEventListener('click', continueGame);
});
