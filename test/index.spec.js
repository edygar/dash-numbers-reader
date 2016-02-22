const expect = require('chai').expect;
const parser = require('../lib/parser');
const validator = require('../lib/validator');
const draw = require('../lib/draw');
const interpolator = require('../lib/interpolator');
const fs = require('fs');

describe('ex03', () => {
  describe('Drawing', () => {
    it('should draw number accordingly to the input', () => {
      expect(draw('0123456789')).to.equal([
        ' _     _  _     _  _  _  _  _ ',
        '| |  | _| _||_||_ |_   ||_||_|',
        '|_|  ||_  _|  | _||_|  ||_| _|',
        ''
      ].join('\n'));
    });
  });
  describe('Parsing', () => {
    describe('Single line parsing', () => {
      it('should read a given input and returns the corresponding numbers', () => {
        var input = draw('490067715');
        expect(parser.parse(input)[0].digits).to.deep.equal('490067715'.split(''));
      });

      it('should place ? at non identified digits', () => {
        var input = [
          ' _ __  _  _  _  _  _     _ ',
          '|_ | |  ||  |_ |_||_|   | |',
          '|_ |_|  ||  |_|| || |   |_|',
          ''
        ].join('\n');

        expect(parser.parse(input)[0].digits).to.deep.equal('??7?6???0'.split(''));
      });
    });
    describe('Multiple lines parsing', () => {
      it('should read an input and output the list of read numbers', () => {
        var input = fs.readFileSync(__dirname + '/fixtures/parsing/input.txt').toString();
        var output = fs.readFileSync(__dirname + '/fixtures/parsing/output.txt').toString();

        expect(parser.parse(input).map(parsed => parsed.digits.join('')).join('\n')).to.equal(output);
      });
    });
  });

  describe('Validation', () => {
    const valid = '345882865'.split('');
    const invalid = '568288543'.split('');
    const unreadable = '?68288543'.split('');

    it('validates set of digits that match the condition', () => {
      expect(validator.isValid(valid)).to.equal(true);
    });
    it('invalidates set of digits that dont match condition', () => {
      expect(validator.isValid(invalid)).to.equal(false);
    });

    it('determines when a given input isnt a readable number', () => {
      expect(validator.isReadable(valid)).to.equal(true);
      expect(validator.isReadable(unreadable)).to.equal(false);
    });

    it('invalidates unreadable set of digits', () => {
      expect(validator.isValid(unreadable)).to.equal(false);
    });
  });
  describe('Interpolation', () => {
    it('generates possible valid digits from invalid ones', () => {
      const input = draw('568288543');
      expect(
        interpolator.getPossibleValidDigits(
          parser.parseLine(input)
        )
      ).to.deep.equal(['588288543'.split(''), '568298543'.split('')]);
    });

    it('finds the closest valid digits of unreadable characters', () => {
      const input = [
        '    _  _     _  _  _  _  _ ',
        '  | _| _||_| _ |_   ||_||_|',
        '  ||_  _|  | _||_|  ||_| _ ',
        ''
      ].join('\n');

      expect(
        interpolator.getPossibleValidDigits(
          parser.parseLine(input)
        )
        .map(digits => digits.join('')).sort()
      ).to.deep.equal(['123436788', '123456789', '723436789']);
    });
  });
});

