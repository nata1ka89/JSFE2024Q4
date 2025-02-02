import createElement from './create-element.js';

const bodyElement = document.body;

// Header
const header = createElement({
  tag: 'header',
  parent: bodyElement,
});

export function createButtonLevel() {
  // создание кнопок уровней сложности
  const divLevel = createElement({
    tag: 'div',
    classes: ['container-level'],
    parent: header,
  });

  const levels = ['Easy', 'Medium', 'Hard'];

  levels.forEach((level) => {
    const buttonLevel = createElement({
      tag: 'button',
      text: level,
      parent: divLevel,
      classes: ['button-level'],
      id: level,
    });
    if (level === 'Easy') {
      buttonLevel.classList.add('button-active');
    }
  });
}
export function createListPictures(pictures) {
  const divPictures = createElement({
    tag: 'div',
    parent: header,
    classes: ['container-picture'],
  });
  // кнопка звука
  createElement({
    tag: 'button',
    classes: ['button-audio'],
    parent: divPictures,
  });

  const selectPictures = createElement({
    tag: 'select',
    parent: divPictures,
    classes: ['select'],
  });
  pictures.forEach((picture) => {
    createElement({
      tag: 'option',
      parent: selectPictures,
      classes: ['options'],
      text: picture,
      value: picture,
    });
  });
}

export function updateListPictures(pictures) {
  // создание списка картинок
  const selectPictures = document.querySelector('.select');
  selectPictures.innerHTML = '';

  pictures.forEach((picture) => {
    createElement({
      tag: 'option',
      parent: selectPictures,
      classes: ['options'],
      text: picture,
      value: picture,
    });
  });
}
