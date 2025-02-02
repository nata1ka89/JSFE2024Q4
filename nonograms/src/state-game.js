// установить флаг статуса игры
let isGameFinish = false;
export function setGameFinish(state) {
  isGameFinish = state;
}

export function getGameFinish() {
  return isGameFinish;
}

// установить флаг статуса звука
let isAudioState = true;
export function setGameAudio() {
  const buttonAudio = document.querySelector('.button-audio');
  if (buttonAudio.classList.contains('button-audioOff')) {
    isAudioState = false;
  } else {
    isAudioState = true;
  }
  return isAudioState;
}
