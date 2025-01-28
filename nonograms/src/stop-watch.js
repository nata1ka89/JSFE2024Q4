let min = 0;
let sec = 0;
let intervalID;

function updateWatch() {
  const watch = document.querySelector('.watch ');
  sec += 1;
  min += Math.floor(sec / 60);
  sec = Math.floor(sec % 60);
  watch.innerText = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

export function startWatch() {
  const start = document.querySelector('.field');
  intervalID = window.setInterval(updateWatch, 1000);
  start.removeEventListener('click', startWatch);
}

export function stopWatch() {
  clearInterval(intervalID);
}
