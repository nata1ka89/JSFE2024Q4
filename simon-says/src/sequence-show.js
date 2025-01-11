export function sequenceGeneration(activeLevel) {
  let sequence = '';
  let characters;
  let roundElement = document.getElementById('round');
  let round = parseInt(roundElement.textContent);
  let length = round * 2;

  switch (activeLevel) {
    case 'Easy':
      characters = '1234567890';
      break;
    case 'Medium':
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      break;
    case 'Hard':
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      break;
    default:
      length;
  }

  for (var i = 0; i < length; i++) {
    sequence += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return sequence;
}

export function sequenceShow(sequence) {
  return new Promise(resolve => {
    sequence.split('').forEach((char, index) => {
      setTimeout(
        () => {
          const charId = document.getElementById(char);
          if (charId) {
            charId.classList.add('button-active');
          }
          setTimeout(() => {
            charId.classList.remove('button-active');
            if (index === sequence.length - 1) {
              resolve();
            }
          }, 500);
        },
        500 * index * 2
      );
    });
  });
}
