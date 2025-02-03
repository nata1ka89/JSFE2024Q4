import createElement from './create-element.js';

export default function showPopup() {
  const main = document.querySelector("body > main");
  //контейнер с результатами
  const result = createElement({
    tag: 'div',
    parent: main,
    classes: ['background-active', 'pop-up-hidden'],
  });
  const resultContent = createElement({
    tag: 'div',
    parent: result,
    classes: ['pop-up-content'],
  });
  const card = createElement({
    tag: 'div',
    parent: resultContent,
    classes: ['card'],
  });
  const imgClose = createElement({
    tag: 'img',
    parent: card,
    classes: ['exit'],
    id: "button-pop-up"
  });
  imgClose.src = './assets/image/close.svg'
  imgClose.alt = 'exit'

  const info = createElement({
    tag: 'div',
    parent: card,
    classes: ['info-container'],
  });
  createElement({
    tag: 'h3',
    parent: info,
    classes: ['title'],
    text: 'Score',
  });
  const table = createElement({
    tag: 'table',
    parent: info,
    classes: ['table'],
  });
  const thead = createElement({
    tag: 'thead',
    parent: table,
  });
  const tr = createElement({
    tag: 'tr',
    parent: thead,
  });
  let theadText = ['#', 'Picture', 'Level', 'Time'];

  theadText.forEach((th) => {
    createElement({
      tag: 'th',
      parent: tr,
      classes: ['pop-up-head'],
      text: th,
    });
  });

  const tbody = createElement({
    tag: 'tbody',
    parent: table,
  });
  let tbodyText = ['1', '2', '3', '4', '5'];

  tbodyText.forEach((_, index) => {
    const trElement = createElement({
      tag: 'tr',
      parent: tbody,
    });
    for (let i = 0; i < 4; i += 1) {
      createElement({
        tag: 'td',
        parent: trElement,
        text: i === 0 ? tbodyText[index] : '',
      });
    }
  });
}
