// сделать длину массивов подсказок одинаковой

function Filling(data) {
  const length = 2;
  /* data.forEach((element) => {
    if (element.length > length) {
      length = element.length;
    }
  }); */

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
  Filling(arrColumn);
  return arrColumn;
}

// подсчет черных клеток для подсказок вверху

export function countCluesRow(data) {
  const arrRow = [];
  for (let j = 0; j < data[0].length; j += 1) {
    const arr = [];
    let count = 0;
    for (let i = 0; i < data.length; i += 1) {
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
  return arrRow;
}
