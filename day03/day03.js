const fs = require('fs');
const input = String(fs.readFileSync('input.txt'));

const authenticate = function (input) {
  const re = /mul\(\d{1,3},\d{1,3}\)/g;

  const equations = [...input.matchAll(re)].map(function (entry) {
    return entry[0];
  });

  return equations
    .map(function (entry) {
      let reSplit = /\d{1,3}/g;
      const numbers = [...entry.matchAll(reSplit)].map(function (entry) {
        return Number(entry[0]);
      });
      return numbers.reduce((a, b) => a * b, 1);
    })
    .reduce(function (a, b) {
      return a + b;
    });
};

console.log('Part 1:', authenticate(input));

const authenticatePart2 = function (input) {
  const re = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g;

  const equations = [...input.matchAll(re)].map(function (entry) {
    return entry[0];
  });

  let accept = true;

  return equations
    .map(function (entry) {
      if (!accept && entry[0] === 'm') {
        return 0;
      } else if (!accept && entry === 'do()') {
        accept = true;
        return 0;
      } else if (!accept && entry === "don't()") {
        return 0;
      } else if (accept && entry === "don't()") {
        accept = false;
        return 0;
      } else if (accept && entry == 'do()') {
        return 0;
      }

      let reSplit = /\d{1,3}/g;
      const numbers = [...entry.matchAll(reSplit)].map(function (entry) {
        return Number(entry[0]);
      });
      return numbers.reduce((a, b) => a * b, 1);
    })
    .reduce(function (a, b) {
      return a + b;
    });
};

console.log('Part 2:', authenticatePart2(input));
