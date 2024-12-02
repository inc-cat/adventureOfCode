const fs = require('fs');
const input = String(fs.readFileSync('input.txt'));

const leftAndRight = input.split('\n');

let array1 = [];
let array2 = [];

for (line of leftAndRight) {
  array1.push(Number(line.split('   ')[0]));
  array2.push(Number(line.split('   ')[1]));
}

array1.sort(function (a, b) {
  return a - b;
});

array2.sort(function (a, b) {
  return a - b;
});

let difference = 0;
for (let index = 0; index < array1.length; index++) {
  difference += Math.abs(array1[index] - array2[index]);
}

console.log('Part 1:', difference);

let totalSimilary = 0;
for (leftSide of array1) {
  for (rightSide of array2) {
    if (leftSide === rightSide) {
      totalSimilary += leftSide;
    }
  }
}

console.log('Part 2:', totalSimilary);
