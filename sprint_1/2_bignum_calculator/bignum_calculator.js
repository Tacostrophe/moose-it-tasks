// 2.Написать модуль, который способен выполнять операции с числами любой длины.
// 4 метода для сложения, умножения, вычитания и деления.

const bignumCalculator = {
  add(num1, num2) {
    const [integer1, decimal1 = '0'] = num1.split('.');
    const [integer2, decimal2 = '0'] = num2.split('.');

    const decimal1Coef = (integer1.at(0) === '-') ? -1n : 1n;
    const decimal2Coef = (integer2.at(0) === '-') ? -1n : 1n;
    let integerSum = BigInt(integer1) + BigInt(integer2);
    let decimalDigitsAmount = Math.max(decimal1.length, decimal2.length);
    let decimalSum = BigInt(decimal1 + '0'.repeat(decimalDigitsAmount - decimal1.length)) * decimal1Coef
                     + BigInt(decimal2 + '0'.repeat(decimalDigitsAmount - decimal2.length)) * decimal2Coef;

    if (decimalSum === 0n) return `${integerSum}`;
    while (decimalSum && !(decimalSum % 10n)) {
      decimalSum /= 10n;
      decimalDigitsAmount -= 1;
    }
    if (decimalSum < 0n) {
      integerSum -= 1n;
      decimalSum = (10n ** BigInt(decimalDigitsAmount)) + decimalSum;
    }
    const intFromDec = decimalSum / (10n ** BigInt(decimalDigitsAmount));
    integerSum += intFromDec;
    decimalSum = String(decimalSum).slice((intFromDec) ? 1 : 0);
    decimalSum = '0'.repeat(decimalDigitsAmount - decimalSum.length) + decimalSum;
    return `${integerSum}.${decimalSum}`;
  },

  subtract(num1, num2) {
    const num2Negative = (num2.at(0) === '-') ? num2.slice(1) : `-${num2}`;
    return this.add(num1, num2Negative);
  },
};

module.exports.bignumCalculator = bignumCalculator;
