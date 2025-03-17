import audioPath from '../assets/audio-end.mp3';
export function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}

export function playSound(): void {
  const audio = new Audio(audioPath);
  void audio.play();
}
