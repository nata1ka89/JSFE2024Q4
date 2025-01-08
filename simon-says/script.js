const bodyElement = document.body;

function createElement(options) {
  const { tag = '', text = '', parent, classes = [] } = options;

  const element = document.createElement(tag);
  element.textContent = text;

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  if (parent != null) {
    parent.appendChild(element);
  }

  return element;
}

function createKeyboardNum() {
  const container = createElement({
    tag: 'div',
    parent: bodyElement,
    classes: ['keyboard-num']
  });

  const num = [...'1234567890'];

  num.forEach(element => {
    const button = createElement({
      tag: 'button',
      text: element,
      parent: container,
      classes: ['button']
    });
  });
}

function createKeyboardLetter() {
  const container = createElement({
    tag: 'div',
    parent: bodyElement,
    classes: ['keyboard-letter']
  });

  const letter = [...'QWERTYUIOPASDFGHJKLZXCVBNM'];

  letter.forEach(element => {
    const button = createElement({
      tag: 'button',
      text: element,
      parent: container,
      classes: ['button']
    });
  });
}

createKeyboardNum();
createKeyboardLetter();
