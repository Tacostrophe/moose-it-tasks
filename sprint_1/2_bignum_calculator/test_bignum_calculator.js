/* eslint-disable no-console */
const { bignumCalculator } = require('./bignum_calculator');

console.log('Testing isValid function');
let testCases = [
  ['0', true],
  ['0.0', true],
  ['235', true],
  ['-235', true],
  ['1.', true],
  ['-1.', true],
  ['235.3463', true],
  ['-235.3463', true],
  ['-23s5', false],
  ['', false],
  ['-235.234d2', false],
  ['adsf', false],
];
let errorMessage = '';
testCases.forEach(([val, expectedResult]) => {
  const result = bignumCalculator.isValid(val);
  if (result !== expectedResult) {
    errorMessage += `expected isValid(${val}) to be ${expectedResult} but got ${result} instead\n`;
  }
});
console.log(errorMessage || 'all tests passed\n');

console.log('Testing add function');
testCases = [
  [['0', '0'], '0'],
  [['0', '15'], '15'],
  [['-73', '0'], '-73'],
  [['7', '20'], '27'],
  [['53.7', '40.16'], '93.86'],
  [['5.00016', '-7.00006'], '-1.9999'],
  [['0.983', '0.517'], '1.5'],
  [['1.1', '-0.15'], '0.95'],
  [['19007199254740991.2', '5000.15'], '19007199254745991.35'],
];

errorMessage = '';
testCases.forEach(([input, expectedResult]) => {
  const result = bignumCalculator.add(...input);
  if (result !== expectedResult) {
    errorMessage += ` expected to equal ${expectedResult}, but got ${result} instead\n`;
  }
});
console.log(errorMessage || 'all tests passed\n');

console.log('Testing subtract function');
testCases = [
  [['0', '0'], '0'],
  [['0', '15'], '-15'],
  [['-73', '0'], '-73'],
  [['7', '20'], '-13'],
  [['53.7', '40.16'], '13.54'],
  [['5.00016', '-7.00004'], '12.0002'],
  [['0.983', '0.583'], '0.4'],
  [['1.9', '-0.15'], '2.05'],
  [['1.1', '0.15'], '0.95'],
  [['19007199254740991.2', '9000000000000000.731'], '10007199254740990.469'],
];
errorMessage = '';
testCases.forEach(([[num1, num2], expectedResult]) => {
  const result = bignumCalculator.subtract(num1, num2);
  if (result !== expectedResult) {
    errorMessage += `${num1} - ${num2} expected to equal ${expectedResult}, but got ${result} instead\n`;
  }
});
console.log(errorMessage || 'all tests passed\n');

console.log('Testing multipy function');
testCases = [
  ['0', '0', '0'],
  ['350', '0', '0'],
  ['0.0', '53.25', '0'],
  ['2', '53.25', '106.5'],
  ['0.2', '3', '0.6'],
  ['7', '3', '21'],
  ['53.2', '5', '266'],
  ['15.4', '6.7', '103.18'],
  ['-15.4', '6.7', '-103.18'],
  ['15.4', '-6.7', '-103.18'],
  ['-15.4', '-6.7', '103.18'],
  ['19007199254740991.3', '3', '57021597764222973.9'],
];
errorMessage = '';

testCases.forEach(([num1, num2, expectedResult]) => {
  const result = bignumCalculator.multiply(num1, num2);
  if (result !== expectedResult) {
    errorMessage += `${num1} * ${num2} expected to be ${expectedResult} but got ${result} instead\n`;
  }
});
console.log(errorMessage || 'all tests passed\n');

console.log('Testing divide function');
testCases = [
  ['0.0', '53.25', '0'],
  ['106.25', '21.25', '5'],
  ['106.25', '5', '21.25'],
  ['21', '3', '7'],
  ['1', '7', '0.(142857)'],
  ['7.31', '7', '1.04(428571)'],
  ['266', '5', '53.2'],
  ['1', '5000', '0.0002'],
  ['1', '3', '0.(3)'],
  ['103.18', '6.7', '15.4'],
  ['-103.18', '6.7', '-15.4'],
  ['-103.18', '-6.7', '15.4'],
  ['103.18', '-6.7', '-15.4'],
  ['57021597764222973.7', '3', '19007199254740991.2(3)'],
];
errorMessage = '';

testCases.forEach(([num1, num2, expectedResult]) => {
  const result = bignumCalculator.divide(num1, num2);
  if (result !== expectedResult) {
    errorMessage += `${num1} / ${num2} expected to be ${expectedResult} but got ${result} instead\n`;
  }
});
console.log(errorMessage || 'all tests passed\n');
