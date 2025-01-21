// подсчет черных клеток для подсказок слева

export function countCluesColumn(data) {
  let arrColumn = [];
  data.forEach((row) => {
    const arr = [];
    let count = 0;
    row.forEach((cell) => {
      if (cell === 1) {
        count += 1;
      } else if (count > 0) {
        arr.push(count);
        count = 0;
      }
    });

    if (count > 0) {
      arr.push(count);
    }
    arrColumn.push(arr);
  });
  Filling(arrColumn)
}

// подсчет черных клеток для подсказок вверху

export function countCluesRow(data) {
  let arrRow = [];
  for (let j = 0; j < data[0].length; j++) {
    const arr = [];
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i][j] === 1) {
        count += 1;
      } else if (count > 0) {
        arr.push(count);
        count = 0;
      }
    }
    if (count > 0) {
      arr.push(count);
    }
    arrRow.push(arr);

  }
  Filling(arrRow);
}

// сделать длину массивов подсказок одинаковой

function Filling(data) {
  let length = 0;
  data.forEach(element => {
    if (element.length > length) {
      length = element.length
    }
  });

  data.forEach(element => {
    if (element.length < length) {
      while (element.length !== length) {
        element.unshift(null);
      }
    }
  });
}