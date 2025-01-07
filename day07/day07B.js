const fs = require('fs');
const input = String(fs.readFileSync('input.txt'));
const inputLines = input.split('\n');

let globalTotal = 0;
const concatStuff = function (a, b) {
  return Number(String(a) + String(b));
};

for (let inputLine of inputLines) {
  const splitSides = inputLine.split(':');
  const proposedTotal = Number(splitSides[0]);
  const equationNumbers = splitSides[1]
    .split(' ')
    .filter(function (entry) {
      if (!entry) {
        return false;
      }
      return true;
    })
    .map(Number);

  function generateCombinations(equations) {
    const length = equations - 1;
    const combinations = [];

    function recursionCombo(current) {
      if (current.length === length) {
        combinations.push([...current]);
        return;
      }
      recursionCombo(current.concat('*'));
      recursionCombo(current.concat('+'));
      recursionCombo(current.concat('|'));
    }

    recursionCombo([]);
    return combinations;
  }

  // Example usage:
  const operatorOrder = generateCombinations(equationNumbers.length);

  totals = [];
  for (let operator of operatorOrder) {
    let currentTotal = equationNumbers[0];
    for (let i = 0; i < equationNumbers.length; i++) {
      if (operator[i] == '*') {
        currentTotal *= equationNumbers[i + 1];
      } else if (operator[i] == '+') {
        currentTotal += equationNumbers[i + 1];
      } else if (operator[i] == '|') {
        currentTotal = concatStuff(currentTotal, equationNumbers[i + 1]);
      }
    }
    totals.push(currentTotal);
  }

  if (totals.includes(proposedTotal)) {
    globalTotal += proposedTotal;
  }
}

console.log(globalTotal);
