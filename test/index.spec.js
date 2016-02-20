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

        expect(parser.parseLine(input)).to.equal('490067715');
      });
    });
    describe('Multiple lines parsing', () => {
      it('should read an input and output the list of numbers with its status', () => {
        var input = fs.readFileSync(__dirname + '/fixtures/parsing/input.txt').toString();
        var output = fs.readFileSync(__dirname + '/fixtures/parsing/output.txt').toString();

        expect(parser.parse(input).join('\n')).to.equal(output);
      });
    });
  });

  describe('Validation', () => {
    it('validates numbers that match the condition', () => {
      expect(validator.isValid('345882865')).to.equal(true);
    });
    it('invalidates numbers that dont match condition', () => {
      expect(validator.isValid('568288543')).to.equal(false);
    });

    it('determines when a given input isnt a readable number', () => {
      expect(validator.isValid('?45882865')).to.equal(false);
      expect(validator.isValid('345882865')).to.equal(true);
    });

    it('invalidates unreadable numbers', () => {
      expect(validator.isValid('?45882865')).to.equal(false);
    });
  });
});

