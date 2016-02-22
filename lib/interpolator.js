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

/* takes set of digits and outputs valid variations of this set */
function interpolate(digits) {
  const arranges = [];

  digits.forEach((number, index) => {
    if (number in interpolations) {
      const replacements = interpolations[number];

      replacements.forEach( symbol => {
        const arrange =
          digits.slice(0, index)
          .concat([symbol])
          .concat(digits.slice(index + 1));

        if (validator.isValid(arrange)) {
          arranges.push(arrange);
        }
      });
    }
  });

  return arranges;
}
exports.interpolate = interpolate;


/* Takes a symbol and interpolates each token once in order
* to discover a digit variation, returning all variant digits */
function getCloseDigits(sourcesymbol) {
  var index;
  var permutTo;
  var symbol;
  var number;
  const alternatives = [];
  const horizontals = [ 1, 5, 10 ];
  const verticals = [ 4, 6, 8, 10 ];

  for (index = 0; index < horizontals.length; index++) {
    permutTo = sourcesymbol[horizontals[index]] === '_' ? ' ' : '_';
    symbol =
      sourcesymbol.substr(0, horizontals[index]) +
      permutTo +
      sourcesymbol.substr(horizontals[index] + 1);
    number = parser.symbolToDigit(symbol);

    if (number[0] !== '?') {
      alternatives.push(number);
    }
  }


  for (index = 0; index < verticals.length; index++) {
    permutTo = sourcesymbol[verticals[index]] === '|' ? ' ' : '|';
    symbol =
      sourcesymbol.substr(0, verticals[index]) +
      permutTo +
      sourcesymbol.substr(verticals[index] + 1);
    number = parser.symbolToDigit(symbol);

    if (number[0] !== '?') {
      alternatives.push(number);
    }
  }
  return alternatives;
}

exports.getCloseDigits = getCloseDigits;

/* takes an array of alternatives for each digit returns all possible combination
* of all alternatives of all symbols, doing it recursively */
function expand(variations, index) {
  index = index || 0;  // eslint-disable-line no-param-reassign

  if (index === variations.length - 1) {
    return variations[index];
  }

  const next = expand(variations, index + 1);
  return variations[index].reduce((ramifications, variation) => {
    next.map( nested => { return [variation].concat(nested); })
    .forEach(result => ramifications.push(result));

    return ramifications;
  }, []);
}


/* takes a parsed input and tries to find valid variations from it, returing
* all valid variations found, if any */
function getPossibleValidDigits(parsed) {
  const variations = expand(parsed.digits.map((number, index) => {
    if (number === '?') {
      return getCloseDigits(parsed.symbols[index]);
    }

    return [number];
  }));

  return variations.reduce((validDigits, digits) => {
    if (!validator.isValid(digits)) {
      return validDigits.concat(interpolate(digits));
    }

    return validDigits.concat([digits]);
  }, []);
}

exports.getPossibleValidDigits = getPossibleValidDigits;
