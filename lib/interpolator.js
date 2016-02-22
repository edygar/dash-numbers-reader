const validator = require('./validator');
const parser = require('./parser');

/* Interpolations by one
  _  _     _  _  _  _     _  _
 |_|  |   |_||_||_ |_   || ||_
 |_|  |    _|  ||_| _|  ||_| _|
  ↑  ↑     ↑  ↑  ↑  ↑  ↑  ↑  ↑
  _     _  _     _  _  _  _  _
 | |  | _| _||_||_ |_   ||_||_|
 |_|  ||_  _|  | _||_|  ||_| _|
                 ↓  ↓     ↓  ↓
                 _  _     _  _
                |_||_|   |_||_|
                 _||_|    _||_|
*/

const interpolations = {
  '0': [ '8' ],
  '1': [ '7' ],
  '3': [ '9' ],
  '4': [ '9' ],
  '5': [ '6', '9' ],
  '6': [ '5', '8' ],
  '7': [ '1' ],
  '8': [ '0', '9' ],
  '9': [ '5', '8' ]
};

function interpolate(numbers) {
  const arranges = [];

  numbers.forEach((number, pos) => {
    if (number in interpolations) {
      const replacements = interpolations[number];

      replacements.forEach( symbol => {
        const arrange =
          numbers.slice(0, pos)
          .concat([symbol])
          .concat(numbers.slice(pos + 1));

        if (validator.isValid(arrange)) {
          arranges.push(arrange);
        }
      });
    }
  });

  return arranges;
}
exports.interpolate = interpolate;


function getCloseNumbers(sourcesymbol) {
  var pos;
  var permutTo;
  var symbol;
  var number;
  const alternatives = [];
  const horizontals = [ 1, 5, 10 ];
  const verticals = [ 4, 6, 8, 10 ];

  for (pos = 0; pos < horizontals.length; pos++) {
    permutTo = sourcesymbol[horizontals[pos]] === '_' ? ' ' : '_';
    symbol =
      sourcesymbol.substr(0, horizontals[pos]) +
      permutTo +
      sourcesymbol.substr(horizontals[pos] + 1);
    number = parser.symbolToNumber(symbol);

    if (number[0] !== '?') {
      alternatives.push(number);
    }
  }


  for (pos = 0; pos < verticals.length; pos++) {
    permutTo = sourcesymbol[verticals[pos]] === '|' ? ' ' : '|';
    symbol =
      sourcesymbol.substr(0, verticals[pos]) +
      permutTo +
      sourcesymbol.substr(verticals[pos] + 1);
    number = parser.symbolToNumber(symbol);

    if (number[0] !== '?') {
      alternatives.push(number);
    }
  }
  return alternatives;
}

exports.getCloseNumbers = getCloseNumbers;

function expand(variations, pos) {
  pos = pos || 0;  // eslint-disable-line no-param-reassign

  if (pos === variations.length - 1) {
    return variations[pos];
  }

  const next = expand(variations, pos + 1);
  return variations[pos].reduce((ramifications, variation) => {
    next.map( nested => { return [variation].concat(nested); })
    .forEach(result => ramifications.push(result));

    return ramifications;
  }, []);
}


function getPossibleValidNumbers(parsed) {
  const variations = expand(parsed.numbers.map((number, index) => {
    if (number === '?') {
      return getCloseNumbers(parsed.symbols[index]);
    }

    return [number];
  }));

  return variations.reduce((validNumbers, numbers) => {
    if (!validator.isValid(numbers)) {
      return validNumbers.concat(interpolate(numbers));
    }

    return validNumbers.concat([numbers]);
  }, []);
}

exports.getPossibleValidNumbers = getPossibleValidNumbers;
