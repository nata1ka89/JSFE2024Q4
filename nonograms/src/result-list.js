import createElement from './create-element.js';

export function showPopup() {
  const main = document.querySelector('body > main');
  // контейнер с результатами
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
    id: 'button-pop-up',
  });
  imgClose.src = './assets/image/close.svg';
  imgClose.alt = 'exit';

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
  const theadText = ['#', 'Picture', 'Level', 'Time'];

  theadText.forEach((th) => {
    createElement({
      tag: 'th',
      parent: tr,
      classes: ['pop-up-head'],
      text: th,
    });
  });

  createElement({
    tag: 'tbody',
    parent: table,
  });
}

export function saveResult() {
  // сохранить результат
  const select = document.querySelector('.select');
  const activeButton = document.querySelector('.button-active');
  const watch = document.querySelector('.watch ');
  const watchText = watch.innerText;
  const resultArray = watchText.split(':');
  const resultNumber = parseInt(resultArray[0] * 60) + parseInt(resultArray[1]);

  const currentGameResult = {
    pictureResult: select.value,
    activeButtonResult: activeButton.id,
    watchResult: watchText,
    timeSecond: resultNumber,
  };

  const result = JSON.parse(localStorage.getItem('gameResultNonogramsNK')) || [];
  result.push(currentGameResult);
  result.sort((a, b) => a.timeSecond - b.timeSecond);

  if (result.length > 5) {
    result.pop();
  }

  localStorage.setItem('gameResultNonogramsNK', JSON.stringify(result));
}
export function writeResult() {
  // записать результаты
  const result = JSON.parse(localStorage.getItem('gameResultNonogramsNK')) || [];
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  result.forEach((el, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${el.pictureResult}</td>
    <td>${el.activeButtonResult}</td>
    <td>${el.watchResult}</td>
  `;
    tbody.appendChild(tr);
  });
}
