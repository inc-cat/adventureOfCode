const fs = require('fs');
const input = String(fs.readFileSync('input.txt'));

const inputParse = function (input) {
  const lines = input.split('\n');
  const lineChars = lines[0].length;
  const borderedLines = lines.map(function (line) {
    return `A${line}A`;
  });

  const matrix = [
    'A'.repeat(lineChars + 2),
    ...borderedLines,
    'A'.repeat(lineChars + 2),
  ].map(function (line) {
    return line.split('');
  });

  let startPosition;
  for (let i = 0; i < matrix.length; i++) {
    for (let ii = 0; ii < matrix[i].length; ii++) {
      if (matrix[i][ii] === '^') {
        startPosition = [i, ii];
      }
    }
  }

  return [matrix, startPosition];
};

const parsedInput = inputParse(input);
let inputMatrix = structuredClone(parsedInput[0]);
let direction = 'up';
let coordinates = {
  row: Number(parsedInput[1][0]),
  column: Number(parsedInput[1][1]),
};
let moves = 0;
let completedMoves = [];

while (true) {
  completedMoves.push([coordinates.row, coordinates.column]);
  inputMatrix[coordinates.row][coordinates.column] = 'X';

  if (direction === 'up') {
    if (inputMatrix[coordinates.row - 1][coordinates.column] === 'A') {
      moves++;
      break;
    } else if (inputMatrix[coordinates.row - 1][coordinates.column] === '#') {
      direction = 'right';
      coordinates.column++;
    } else {
      coordinates.row--;
    }
    moves++;
  } else if (direction === 'right') {
    if (inputMatrix[coordinates.row][coordinates.column + 1] === 'A') {
      moves++;
      break;
    } else if (inputMatrix[coordinates.row][coordinates.column + 1] === '#') {
      direction = 'down';
      coordinates.row++;
    } else {
      coordinates.column++;
    }
    moves++;
  } else if (direction === 'down') {
    if (inputMatrix[coordinates.row + 1][coordinates.column] === 'A') {
      moves++;
      break;
    } else if (inputMatrix[coordinates.row + 1][coordinates.column] === '#') {
      direction = 'left';
      coordinates.column--;
    } else {
      coordinates.row++;
    }
    moves++;
  } else if (direction === 'left') {
    if (inputMatrix[coordinates.row][coordinates.column - 1] === 'A') {
      moves++;
      break;
    } else if (inputMatrix[coordinates.row][coordinates.column - 1] === '#') {
      direction = 'up';
      coordinates.row--;
    } else {
      coordinates.column--;
    }
    moves++;
  }
}

function arraysAreEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((val, index) => val === arr2[index])
  );
}

function removeDuplicateArrays(arr) {
  return arr.filter(
    (item, index) =>
      arr.findIndex((other) => arraysAreEqual(item, other)) === index
  );
}

const uniqueArray = removeDuplicateArrays(completedMoves);
console.log(uniqueArray);
