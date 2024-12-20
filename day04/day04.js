const fs = require('fs');
const input = String(fs.readFileSync('input.txt'));

const reverse = function (input) {
  return input.split('').reverse().join('');
};

const horizontal = function (input) {
  const leftRightMatches = input.match(/XMAS/gi);
  const rightLeftMatches = reverse(input).match(/XMAS/gi);

  return leftRightMatches.length + rightLeftMatches.length;
};

const vertical = function (input) {
  const breakSplit = input.split('\n');
  const horizontalCharacters = breakSplit[0].length;
  const verticalCharacters = breakSplit.length;

  let lineArray = [];
  let charArray;
  for (let v = 0; v < verticalCharacters; v++) {
    charArray = [];
    for (let h = 0; h < horizontalCharacters; h++) {
      charArray.push(breakSplit[h][v]);
    }
    lineArray.push(charArray);
  }

  const columnLetters = lineArray
    .map(function (line) {
      return line.join('');
    })
    .join('\n');

  const upDownMatches = columnLetters.match(/XMAS/gi);
  const downUpMatches = reverse(columnLetters).match(/XMAS/gi);

  return upDownMatches.length + downUpMatches.length;
};

function coordinatesDiagonal(gridSize) {
  let diagonals = [];

  for (let startCol = 0; startCol < gridSize; startCol++) {
    let diagonal = [];
    let row = 0,
      column = startCol;
    while (row < gridSize && column < gridSize) {
      diagonal.push([row, column]);
      row++;
      column++;
    }
    diagonals.push(diagonal);
  }

  for (let startRow = 1; startRow < gridSize; startRow++) {
    let diagonal = [];
    let row = startRow,
      column = 0;
    while (row < gridSize && column < gridSize) {
      diagonal.push([row, column]);
      row++;
      column++;
    }
    diagonals.push(diagonal);
  }

  for (let startCol = 0; startCol < gridSize; startCol++) {
    let diagonal = [];
    let row = gridSize - 1,
      column = startCol;
    while (row >= 0 && column < gridSize) {
      diagonal.push([row, column]);
      row--;
      column++;
    }
    diagonals.push(diagonal);
  }

  for (let startRow = gridSize - 2; startRow >= 0; startRow--) {
    let diagonal = [];
    let row = startRow,
      column = 0;
    while (row >= 0 && column < gridSize) {
      diagonal.push([row, column]);
      row--;
      column++;
    }
    diagonals.push(diagonal);
  }

  return diagonals;
}

const diagonal = function (input, diagonalCoordinates) {
  const breakSplit = input.split('\n');
  let diagonalLines = [];
  for (x of diagonalCoordinates) {
    let diagonalLetters = [];
    for (y of x) {
      xCoord = y[0];
      yCoord = y[1];
      diagonalLetters.push(breakSplit[xCoord][yCoord]);
    }
    diagonalLines.push(diagonalLetters);
  }

  let newLetters = [];
  for (joiner of diagonalLines) {
    newLetters.push(joiner.join(''));
  }

  return newLetters.join('\n');
};

console.log(horizontal(input)); // horiz
console.log(vertical(input)); //

let a = coordinatesDiagonal(140);
let b = diagonal(input, a);
console.log(horizontal(b));
console.log(390 + 404 + 1603);

//part 2

const xMas = function (input) {
  const lineByLine = input.split('\n');

  xMasMatches = 0;

  for (let row = 0; row < lineByLine.length - 2; row++) {
    for (let col = 0; col < lineByLine[0].length - 2; col++) {
      try {
        if (lineByLine[row][col] !== 'M' && lineByLine[row][col] !== 'S') {
          continue;
        }
      } catch (err) {
        break;
      }
      let topLeftLetter = lineByLine[row][col];
      let topRightLetter = lineByLine[row][col + 2];
      let middleLetter = lineByLine[row + 1][col + 1];
      let bottomLeftLetter = lineByLine[row + 2][col];
      let bottomRightLetter = lineByLine[row + 2][col + 2];

      let xMasAccepted = [
        ['M', 'M', 'A', 'S', 'S'],
        ['M', 'S', 'A', 'M', 'S'],
        ['S', 'S', 'A', 'M', 'M'],
        ['S', 'M', 'A', 'S', 'M'],
      ];

      let letterInput = [
        topLeftLetter,
        topRightLetter,
        middleLetter,
        bottomLeftLetter,
        bottomRightLetter,
      ];

      function isArrayCorrect(arr) {
        return xMasAccepted.some(
          (subArray) =>
            subArray.length === arr.length &&
            subArray.every((val, index) => val === arr[index])
        );
      }

      if (isArrayCorrect(letterInput)) {
        xMasMatches++;
      }
    }
  }
  return xMasMatches;
};

console.log(xMas(input));
