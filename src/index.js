const parse = require('./parser').parse;
const validator = require('./validator');

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
  console.log(parse(input).map(number => {
    if (!validator.isReadable(number)) {
      return number + ' ILL';
    }

    if (!validator.isValid(number)) {
      return number + ' ERR';
    }

    return number;
  }));
});


