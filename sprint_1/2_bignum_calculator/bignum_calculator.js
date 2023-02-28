/* eslint-disable no-restricted-syntax */
// 2.Написать модуль, который способен выполнять операции с числами любой длины.
// 4 метода для сложения, умножения, вычитания и деления.

const bignumCalculator = {
  isValid(num) {
    return /^-?\d+(?:\.\d*)?$/.test(num);
  },

  countDecimalDigits(num) {
    const indexOfDot = num.indexOf('.');
    return (indexOfDot === -1) ? 0 : (num.length - indexOfDot - 1);
  },

  toEqualBigInt(num1, num2) {
    const decimalDigitsAmount1 = this.countDecimalDigits(num1);
    const decimalDigitsAmount2 = this.countDecimalDigits(num2);
    if (decimalDigitsAmount1 === decimalDigitsAmount2 === 0) return [BigInt(num1), BigInt(num2)];
    const deltaDigits = decimalDigitsAmount1 - decimalDigitsAmount2;
    let bigNum1 = BigInt(num1.replace(/\./, ''));
    let bigNum2 = BigInt(num2.replace(/\./, ''));
    if (deltaDigits > 0) {
      bigNum2 *= 10n ** BigInt(deltaDigits);
    } else if (deltaDigits < 0) {
      bigNum1 *= 10n ** BigInt(-deltaDigits);
    }
    return [bigNum1, bigNum2];
  },

  toDecimal(num, decimalDigitsAmount) {
    let result = num;
    let localDigitsAmount = decimalDigitsAmount;
    while ((decimalDigitsAmount > 0) && (result % 10n === 0n)) {
      result /= 10n;
      localDigitsAmount -= 1;
    }
    result = String(result);

    if (!localDigitsAmount) return result;
    return (`${result.slice(0, (-localDigitsAmount)) || 0}`
            + `.${result.slice(-localDigitsAmount)}`);
  },

  add(num1, num2) {
    // console.log(this);
    if (!(bignumCalculator.isValid(num1) && bignumCalculator.isValid(num2))) {
      throw Error('Invalid input');
    }

    const decimalDigitsAmount = Math.max(
      this.countDecimalDigits(num1),
      this.countDecimalDigits(num2),
    );
    const [bigNum1, bigNum2] = this.toEqualBigInt(num1, num2);
    const result = bigNum1 + bigNum2;

    return this.toDecimal(result, decimalDigitsAmount);
  },

  subtract(num1, num2) {
    const num2Negative = (num2.at(0) === '-') ? num2.slice(1) : `-${num2}`;
    return this.add(num1, num2Negative);
  },

  multiply(num1, num2) {
    if (!(this.isValid(num1) && this.isValid(num2))) {
      throw Error('Invalid input');
    }

    if (Number(num1) === 0
        || Number(num2) === 0) return '0';

    const decimalDigitsAmount = this.countDecimalDigits(num1) + this.countDecimalDigits(num2);
    const result = BigInt(num1.replace(/\./, '')) * BigInt(num2.replace(/\./, ''));

    return this.toDecimal(result, decimalDigitsAmount);
  },

  divide(num1, num2) {
    if (!(this.isValid(num1) && this.isValid(num2)) && Number(num2) !== 0) {
      throw Error('Invalid input');
    }
    if (Number(num1) === 0) return '0';

    const coef = (num1.startsWith('-') === num2.startsWith('-')) ? 1n : -1n;
    const absBigInt = (num) => ((num > 0n) ? num : -num);
    const [bigNum1, bigNum2] = this.toEqualBigInt(num1, num2).map(absBigInt);

    const resultInt = (bigNum1 / bigNum2) * coef;
    let resultMod = bigNum1 % bigNum2;

    let resultDec = '';
    let i = 0;
    while (resultMod && i < 20) {
      resultMod *= 10n;
      while (resultMod < bigNum2) {
        resultMod *= 10n;
        resultDec += '0';
      }
      resultDec += (resultMod / bigNum2);
      resultMod %= bigNum2;
      i += 1;
    }

    for (const match of resultDec.matchAll(/(?<period>\d+?)\1{2,}/g)) {
      const remainder = resultDec.slice(match[0].length + match.index);
      if (new RegExp(`^${remainder}`).test(match[0])) {
        resultDec = `${resultDec.slice(0, match.index)}(${match[1]})`;
        break;
      }
    }

    if (resultDec) return `${resultInt}.${resultDec}`;
    return `${resultInt}`;
  },
};

module.exports.bignumCalculator = bignumCalculator;
