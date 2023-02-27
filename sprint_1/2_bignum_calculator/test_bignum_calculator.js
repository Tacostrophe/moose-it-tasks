/* eslint-disable no-console */
const { bignumCalculator } = require('./bignum_calculator');

console.log('Testing add function');
let testCases = [
  [['0', '0'], '0'],
  [['0', '15'], '15'],
  [['-73', '0'], '-73'],
  [['7', '20'], '27'],
  [['53.7', '40.16'], '93.86'],
  [['5.00016', '-7.00006'], '-2.0001'],
  [['0.983', '0.517'], '1.5'],
  [['1.1', '-0.15'], '0.95'],
  [['19007199254740991.2', '5000.15'], '19007199254745991.35'],
];
let errorMessage = '';
testCases.forEach(([[num1, num2], expectedResult]) => {
  const result = bignumCalculator.add(num1, num2);
  if (result !== expectedResult) {
    errorMessage += `${num1} + ${num2} expected to equal ${expectedResult}, but got ${result} instead\n`;
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

// bignumCalculator.multiply();

// bignumCalculator.divide();
