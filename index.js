/* eslint no-console: 0 */
const parse = require('./lib/parser').parse;
const validator = require('./lib/validator');
const interpolator = require('./lib/interpolator');

// Reads all the input until its end
var input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    input = input + chunk;
  }
});

// At the end of the input (EoF or ctrl+D), looks in the dictionary for each argument
process.stdin.on('end', () => {
  parse(input)
  .forEach(parsed => {
    if (validator.isValid(parsed.digits)) {
      console.log(parsed.digits.join(''));
      return;
    }

    const amb = interpolator.getPossibleValidDigits(parsed);
    if (amb.length) {
      if (amb.length === 1) {
        console.log(amb[0].join(''));
        return;
      }

      console.log(parsed.digits.join('') + ' AMB [' + amb.map(number => number.join('')).join(', ') + ']');
      return;
    }

    console.log(
      parsed.digits.join('') + ' ' +
      (
        !validator.isReadable(parsed.digits) ? 'ILL' : 'ERR'
      )
    );
  });
});
