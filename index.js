const parseToken = require('./parseToken');

function tokenize(source) {
  const digits = (source.length - 3) / 9;
  const tokens = new Array(digits);

  source.match(/(...)/g).forEach(( triple, index ) => {
    tokens[index % digits] = (tokens[index % digits] || '') + triple + '\n';
  });

  return tokens;
}

function toNumber(input) {
  return tokenize(input).map(parseToken).join('');
}

const input = [
  '    _  _  _  _  _  _     _ ',
  '|_||_|| || ||_   |  |  ||_ ',
  '  | _||_||_||_|  |  |  | _|',
  ''
].join('\n');

console.log(toNumber(input));
