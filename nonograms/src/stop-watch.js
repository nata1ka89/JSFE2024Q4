let min = 0;
let sec = 0;
let intervalID;

export function setTime(minutes, seconds) {
  min = minutes;
  sec = seconds;
}

function updateWatch() {
  const watch = document.querySelector('.watch ');
  sec += 1;
  min += Math.floor(sec / 60);
  sec = Math.floor(sec % 60);
  watch.innerText = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

export function startWatch() {
  if (!intervalID) {
    intervalID = window.setInterval(updateWatch, 1000);
  }
}

export function stopWatch() {
  clearInterval(intervalID);
}

export function clearWatch() {
  stopWatch();
  intervalID = null;
  min = 0;
  sec = 0;
  const watch = document.querySelector('.watch ');
  watch.innerText = '00:00';
}
