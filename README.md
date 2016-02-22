Number Reading - Ecxus Job Application
===
This application reads drawed numbers from the [standard input](http://en.wikipedia.org/wiki/Standard_streams)
and outputs then as numbers, with the avaliation of their readability and validation, and the closest valid matches.

### Input
The drawing is composed by underscores, pipes and spaces, distributed in 3 lines with the same size, followed by
an empty line. Each symbol is composed by three adjacent columns. The following example have whitespaces replaced
by `.` and explicit `\n` for illustration purposes:
```
...._.._....._.._.._.._.._.._.\n
..| _|._||_||_ |_...||_||_|| |\n
..||_.._|..|._||_|..||_|._||_|\n
```

There might be trailing whitespaces, so all lines have the same size, otherwise, it wouldn't be possible.

More than one line of symbols can be supplied at once, but it is required an empty line splitting them.

If a symbols is not recognized, it will test possible valid variations to fit the validation. A `?` places
a non-recoverable symbol.

### Validation
A number is valid when respecting the following equation:

```
  read numbers:  3   4   5   8   8   2   8   6   5
  position ids: d9  d8  d7  d6  d5  d4  d3  d2  d1

  verification:
  (d1 + 2 * d2 + 3 * d3 + 4 * d4 + … + 9 * d9) mod 11 === 0
```

Each read digit is multiplied by the number of digits to its right plus one. Them the result is summed and if
is divisible by 11 then its valid.

In order to validate, it is required that all digits be recognized, otherwise, the input will be invalid.


### Pre-requisites
- [Node (v4.3.1+)](https://nodejs.org/en/download/)

### Usage
```sh
node src/index.js < input.txt > output.txt
```

There is also a utility helper to draw numbers as expected
```sh
node src/draw.js 1234567890
```
