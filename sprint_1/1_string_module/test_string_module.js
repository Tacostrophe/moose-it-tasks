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

let testCases = [
  ['abcde', 'Abcde'],
  ['', ''],
  ['a', 'A'],
];

console.log('Testing capitalize');
console.log(testFunction(capitalize, testCases));

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

console.log('\nTesting correctText');
console.log(testFunction(correctText, testCases));

testCases = [
  ['Текст, в котором слово текст несколько раз встречается и слово тоже', 11],
  ['', 0],
  ['    ', 0],
  ['onewordstring', 1],
  [' two   ,  words  ', 2],
];

console.log('\nTesting countWords');
console.log(testFunction(countWords, testCases));

console.log('\nTesting countUniqueWords');
console.log(String(countUniqueWords(testCases[0][0])));
