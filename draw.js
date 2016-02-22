const draw = require('./lib/draw');

function getCleanArgs() {
  // cleansing of the arguments input
  const args = process.argv.slice(0);
  while (args[0] !== __filename) {
    args.shift();
  }
  args.shift();
  return args;
}


const numbersToPrint = getCleanArgs();

numbersToPrint.forEach(numbers => {
  console.log(draw(numbers));
});
