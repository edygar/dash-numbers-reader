function isReadale(input) {
  return (input.indexOf('?') === -1);
}
exports.isReadale = isReadale;

function isValid(input) {
  return isReadale(input) && input.split('')
  .reduce((accumulated, current, index) => {
    return accumulated + parseInt(current, 10) * (input.length - index);
  }, 0) % 11 === 0;
}
exports.isValid = isValid;
