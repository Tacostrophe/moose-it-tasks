/* eslint-disable no-console */
const {
  capitalize,
  correctText,
  countWords,
  countUniqueWords,
} = require('./string_module');

function testFunction(func, cases) {
  let report = '';
  cases.forEach(([input, expectedResult]) => {
    if (func(input) !== expectedResult) {
      report += `\ntest with '${input}' didn't pass.`;
    }
  });
  if (report === '') report = 'all tests passed!';
  return report;
}

console.log('Testing capitalize');
let testCases = [
  ['abcde', 'Abcde'],
  ['', ''],
  ['a', 'A'],
];
console.log(testFunction(capitalize, testCases));

console.log('\nTesting correctText');
const largeText = 'Вот пример строки,в которой     используются знаки препинания.'
+ 'После знаков должны стоять пробелы , а перед знаками их быть не должно .'
+ '    Если есть лишние подряд идущие пробелы, они должны быть устранены.';
const expectedLargeText = 'Вот пример строки, в которой используются знаки препинания. '
+ 'После знаков должны стоять пробелы, а перед знаками их быть не должно. '
+ 'Если есть лишние подряд идущие пробелы, они должны быть устранены.';
testCases = [
  [largeText, expectedLargeText],
  ['   ', ''],
  ['   sometext   ', 'sometext'],
  ['  some   text  ', 'some text'],
  [',,..::', ', , . . : :'],
  ['some, text', 'some, text'],
];
console.log(testFunction(correctText, testCases));

console.log('\nTesting countWords');
testCases = [
  ['Текст, в котором слово текст несколько раз встречается и слово тоже', 11],
  ['', 0],
  ['    ', 0],
  ['onewordstring', 1],
  [' two   ,  words  ', 2],
];
console.log(testFunction(countWords, testCases));

console.log('\nTesting countUniqueWords');
console.log(String(countUniqueWords(testCases[0][0])));
