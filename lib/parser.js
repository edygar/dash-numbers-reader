const DICTIONARY = require('./dictionary');

/* Splits inherent set of symbols into its own position in an Array */
function readSymbols(source) {
  const digits = (source.length - 3 ) / 9;
  const symbols = new Array(digits);

  // takes each 3 sequential symbols and assign to its position
  source.match(/(.{3})/g).forEach(( triple, index ) => {
    symbols[index % digits] = (symbols[index % digits] || '') + triple + '\n';
  });

  return symbols;
}

/* Takes a symbol and parses to its corresponding number */
function symbolToNumber(symbol) {
  const number = DICTIONARY.indexOf(symbol);
  return number === -1 ? '?' : number.toString(10);
}

/* Takes raw input line, symbolizes and parses to number */
function parseLine(line) {
  const symbols = readSymbols(line);
  return {
    symbols,
    numbers: symbols.map(symbol => symbolToNumber(symbol))
  };
}

/* Takes the input and returns a array of the parsed numbers */
function parse(input) {
  return input
  .match(new RegExp(new RegExp(`([^\n]+\n){3}`, 'g')))
  .map( parseLine );
}


exports.readSymbols = readSymbols;
exports.symbolToNumber = symbolToNumber;
exports.parseLine = parseLine;
exports.parse = parse;
