/* takes a set of digits and avaliates if it was all read correctly */
function isReadable(input) {
  return (input.indexOf('?') === -1);
}
exports.isReadable = isReadable;

/* Takes a set of digits and avaliates if it matches the requirement */
function isValid(input) {
  return isReadable(input) && input
  .reduce((accumulated, current, index) => {
    return accumulated + parseInt(current, 10) * (input.length - index);
  }, 0) % 11 === 0;
}
exports.isValid = isValid;
