import createElement from './create-element.js';

const bodyElement = document.body;

// Header
const header = createElement({
  tag: 'header',
  parent: bodyElement,
});

export default function createHeader() {
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

  // переключение кнопок сложности
  const tab = document.querySelectorAll('.button-level');
  tab.forEach((element) => {
    element.addEventListener('click', () => {
      tab.forEach((el) => {
        if (el !== element) {
          el.classList.remove('button-active');
        }
      });
      element.classList.add('button-active');
    });
  });
}
