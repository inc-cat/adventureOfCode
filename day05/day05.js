const fs = require('fs');
const input = String(fs.readFileSync('input.txt'));

const lines = input.split('\n');
const splitIndex = lines.indexOf('');

const pageRules = lines.slice(0, splitIndex).map(function (entry) {
  return (splitNumbers = entry.split('|')).map(Number);
});

const updates = input
  .split('\n\n')[1]
  .split('\n')
  .map(function (line) {
    return line.split(',').map(Number);
  });

let acceptedUpdates = [];
let updatesToChange = [];

let matches = 0;
const equality = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
};
for (newUpdate of updates) {
  const loopCycles = newUpdate.length - 1;
  matches = 0;

  for (i = 0; i < loopCycles; i++) {
    let arrayInQuestion = [newUpdate[i], newUpdate[i + 1]];
    if (pageRules.some((arr) => equality(arr, arrayInQuestion))) {
      matches++;
    } else {
      updatesToChange.push(newUpdate);
      break;
    }

    if (matches === loopCycles) {
      acceptedUpdates.push(newUpdate);
    }
  }
  console.log(newUpdate, matches);
}

const middlePages = acceptedUpdates.map(function (entry) {
  let middleIndex = (entry.length - 1) / 2;
  return entry[middleIndex];
});

console.log(
  'Part 1:',
  middlePages.reduce((a, b) => a + b, 0)
);

let fixedUpdates = [];
for (let fixUpdates of updatesToChange) {
  while (true) {
    matches = 0;
    loopCycles = fixUpdates.length - 1;
    for (let i = 0; i < loopCycles; i++) {
      let arrayInQuestion = [fixUpdates[i], fixUpdates[i + 1]];

      if (pageRules.some((arr) => equality(arr, arrayInQuestion))) {
        matches++;
      } else {
        [fixUpdates[i], fixUpdates[i + 1]] = [fixUpdates[i + 1], fixUpdates[i]];
      }
    }
    if (matches === loopCycles) {
      fixedUpdates.push(fixUpdates);
      break;
    }
  }
}

const fixedMiddles = fixedUpdates.map(function (entry) {
  let middleIndex = (entry.length - 1) / 2;
  return entry[middleIndex];
});

console.log(
  'Part 2:',
  fixedMiddles.reduce((a, b) => a + b, 0)
);
