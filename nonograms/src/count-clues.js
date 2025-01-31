// сделать длину массивов подсказок одинаковой

function Filling(data, length) {
  data.forEach((element) => {
    if (element.length < length) {
      while (element.length !== length) {
        element.unshift(null);
      }
    }
  });
  return data;
}

// подсчет черных клеток для подсказок слева

export function countCluesColumn(data) {
  const arrColumn = [];
  let length = 2;
  data.forEach((row) => {
    const arr = [];
    let count = 0;
    row.forEach((cell) => {
      if (cell === 1) {
        count += 1;
      } else if (count > 0) {
        arr.push(count);
        count = 0;
        if (length < arr.length) {
          length = arr.length;
        }
      }
    });

    if (count > 0) {
      arr.push(count);
      if (length < arr.length) {
        length = arr.length;
      }
    }
    arrColumn.push(arr);
  });
  Filling(arrColumn, length);
  return arrColumn;
}

// подсчет черных клеток для подсказок вверху

export function countCluesRow(data) {
  const arrRow = [];
  let length = 2;
  for (let j = 0; j < data[0].length; j += 1) {
    const arr = [];
    let count = 0;
    for (let i = 0; i < data.length; i += 1) {
      if (data[i][j] === 1) {
        count += 1;
      } else if (count > 0) {
        arr.push(count);
        count = 0;
        if (length < arr.length) {
          length = arr.length;
        }
      }
    }
    if (count > 0) {
      arr.push(count);
      if (length < arr.length) {
        length = arr.length;
      }
    }
    arrRow.push(arr);
  }
  Filling(arrRow, length);
  return arrRow;
}
