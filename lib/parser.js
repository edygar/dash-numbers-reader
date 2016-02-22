const DICTIONARY = require('./dictionary');

/* Splits the input into array of symbols */
function readSymbols(input) {
  const digits = (input.length - 3 ) / 9;
  const symbols = new Array(digits);

  // takes each 3 sequential symbols and assign to its index
  input.match(/(.{3})/g).forEach(( triple, index ) => {
    symbols[index % digits] = (symbols[index % digits] || '') + triple + '\n';
  });

  return symbols;
}

/* Takes a symbol and returns corresponding digit, or ? when not recognized */
function symbolToDigit(symbol) {
  const number = DICTIONARY.indexOf(symbol);
  return number === -1 ? '?' : number.toString(10);
}

/* Takes raw input, split its symbols and parses to digits */
function parseLine(line) {
  const symbols = readSymbols(line);
  return {
    symbols,
    digits: symbols.map(symbol => symbolToDigit(symbol))
  };
}

/* Takes the input and returns an array of the parsed digits */
function parse(input) {
  return input
  .match(new RegExp(new RegExp(`([^\n]+\n){3}`, 'g')))
  .map( parseLine );
}


exports.readSymbols = readSymbols;
exports.symbolToDigit = symbolToDigit;
exports.parseLine = parseLine;
exports.parse = parse;
