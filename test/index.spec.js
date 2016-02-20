const expect = require('chai').expect;
const parser = require('../src/parser');
const validator = require('../src/validator');
const fs = require('fs');

describe('ex03', () => {
  describe('Parsing', () => {
    describe('Single line parsing', () => {
      it('should read a given input and returns the corresponding numbers', () => {
        var input = [
          '    _  _  _  _  _  _     _ ',
          '|_||_|| || ||_   |  |  ||_ ',
          '  | _||_||_||_|  |  |  | _|',
          ''
        ].join('\n');

        expect(parser.parseLine(input).numbers).to.deep.equal('490067715'.split(''));
      });

      it('should place ? at non identified numbers', () => {
        var input = [
          ' _ __  _  _  _  _  _     _ ',
          '|_ | |  ||  |_ |_||_|   | |',
          '|_ |_|  ||  |_|| || |   |_|',
          ''
        ].join('\n');

        expect(parser.parseLine(input).numbers).to.deep.equal('??7?6???0'.split(''));
      });
    });
    describe('Multiple lines parsing', () => {
      it('should read an input and output the list of numbers with its status', () => {
        var input = fs.readFileSync(__dirname + '/fixtures/parsing/input.txt').toString();
        var output = fs.readFileSync(__dirname + '/fixtures/parsing/output.txt').toString();

        expect(parser.parse(input).map(parsed => parsed.numbers.join('')).join('\n')).to.equal(output);
      });
    });
  });

  describe('Validation', () => {
    const valid = '345882865'.split('');
    const invalid = '568288543'.split('');
    const unreadable = '?68288543'.split('');

    it('validates numbers that match the condition', () => {
      expect(validator.isValid(valid)).to.equal(true);
    });
    it('invalidates numbers that dont match condition', () => {
      expect(validator.isValid(invalid)).to.equal(false);
    });

    it('determines when a given input isnt a readable number', () => {
      expect(validator.isReadable(valid)).to.equal(true);
      expect(validator.isReadable(unreadable)).to.equal(false);
    });

    it('invalidates unreadable numbers', () => {
      expect(validator.isValid(unreadable)).to.equal(false);
    });
  });
});

