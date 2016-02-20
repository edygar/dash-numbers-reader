const DICTIONARY = require('./dictionary');
const CHARACTERS_PER_LINE = 27;
const DIGITS_PER_LINE = 9;

/* Splits inherent set of symbols into its own position in an Array */
function tokenize(source) {
  const digits = DIGITS_PER_LINE;
  const tokens = new Array(digits);

  // takes each 3 sequential symbols and assign to its position
  source.match(/(.{3})/g).forEach(( triple, index ) => {
    tokens[index % digits] = (tokens[index % digits] || '') + triple + '\n';
  });

  return tokens;
}

/* Takes a token and parses to its corresponding number */
function tokenToNumber(token) {
  const number = DICTIONARY.indexOf(token);
  return number === -1 ? '?' : number;
}

/* Takes raw input line, tokenizes and parses to number */
function parseLine(line) {
  return tokenize(line).map(tokenToNumber).join('');
}

/* Takes the input and returns a array of the parsed numbers */
function parse(input) {
  return input
  .match(new RegExp(`(.|\n){${(CHARACTERS_PER_LINE + 1) * 3}}(\n|$)`, 'g'))
  .map(parseLine);
}


exports.tokenize = tokenize;
exports.tokenToNumber = tokenToNumber;
exports.parseLine = parseLine;
exports.parse = parse;
