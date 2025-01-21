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

const tableData = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

function createCeil() {
  tableData.forEach((row) => {
    const rowElement = createElement({
      tag: 'div',
      parent: container,
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

createCeil();

const gameField = document.querySelectorAll('.cell');

gameField.forEach((element) => {
  element.addEventListener('click', () => {
    element.classList.toggle('black-cell');
  });
});
