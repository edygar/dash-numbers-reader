function isReadable(input) {
  return (input.indexOf('?') === -1);
}
exports.isReadable = isReadable;

function isValid(input) {
  return isReadable(input) && input
  .reduce((accumulated, current, index) => {
    return accumulated + parseInt(current, 10) * (input.length - index);
  }, 0) % 11 === 0;
}
exports.isValid = isValid;
