const fs = require('fs');
const input = String(fs.readFileSync('input.txt'));

let lines = input.split('\n').map(function (line) {
  return line.split(' ').map(function (index) {
    return Number(index);
  });
});

const authenticate = function (entry) {
  let currentEntry = [...entry];
  let currentEntryReversed = [...entry];
  currentEntry.sort(function (a, b) {
    return a - b;
  });
  currentEntryReversed.sort(function (a, b) {
    return b - a;
  });

  if (
    !(
      JSON.stringify(currentEntry) === JSON.stringify(entry) ||
      JSON.stringify(currentEntryReversed) === JSON.stringify(entry)
    )
  ) {
    return false;
  }

  for (let index = 0; index < entry.length - 1; index++) {
    if (Math.abs(entry[index] - entry[index + 1]) === 0) {
      return false;
    }
    if (Math.abs(entry[index] - entry[index + 1]) > 3) {
      return false;
    }
  }
  return true;
};

const test = lines.filter(authenticate);

console.log('Part 1:', test.length);

const removeOne = function (entry) {
  for (let index = 0; index < entry.length; index++) {
    let currentSplice = Array(entry).flat();
    currentSplice.splice(index, 1);
    if (authenticate(currentSplice)) {
      return true;
    }
  }
};

const test2 = lines.filter(removeOne);
console.log('Part 2:', test2.length);
