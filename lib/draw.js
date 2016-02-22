const DICTIONARY = require('./dictionary');


module.exports = function draw(numbers) {
  const lines = ['', '', '', ''];

  numbers.toString().split('')
  .forEach((number) => {
    DICTIONARY[number].split('\n')
    .forEach((tokens, line) => lines[line] += tokens);
  });

  return lines.join('\n');
};
