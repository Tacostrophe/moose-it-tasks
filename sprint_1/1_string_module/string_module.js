// 1.1. Преобразование строки к нижнему регистру, но первая буква большая. “Abscd”
function capitalize(str) {
  if (typeof str !== 'string') {
    return 'Error: expected string';
  }
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;
}

// 1.2. Преобразование строки с целью правильно расстановки пробелов.
function correctText(str) {
  if (typeof str !== 'string') {
    return 'Error: expected string';
  }
  return str.replace(/\s*(?<mark>\p{P})\s*|\s+/gu, '$<mark> ')
    .replace(/(?:^\s)|(?:\s$)/g, '');
}

// 1.3. Посдчитывающие кол-во слов в строке.
function countWords(str) {
  if (typeof str !== 'string') {
    return 'Error: expected string';
  }
  const re = /(\p{L}[^\p{L}])|\p{L}$/ug;
  return (str.match(re) ?? []).length;
}

/* 1.4. Подсчитывающий, уникальные слова.
   “Текст, в котором слово текст несколько раз встречается и слово тоже” - в ответе, что
   “слово - 2 раза, текст - 2 раза, в - 1 раз, несколько - 1 раз“.
   Самостоятельно придумать наиболее удачную структуру данных для ответа. */

function countUniqueWords(str) {
  if (typeof str !== 'string') {
    return 'Error: expected string';
  }
  const re = /(?<word>\p{L}+)(?:[^\p{L}]|$)/gu;
  const matches = Array.from(str.matchAll(re));
  const uniqueWords = {
    [Symbol.toPrimitive](hint) {
      let string = '';
      const num = Object.values(this).length;
      Object.entries(this).forEach(([word, amount], index, array) => {
        const time = ((amount % 10 < 5 && amount % 10 > 1)
                      && (amount < 11 || amount > 14)) ? 'раза' : 'раз';
        string += `${word} - ${amount} ${time}`;
        if (index === array.length - 1) string += '.';
        else string += ', ';
      });
      return hint === 'string' ? string : num;
    },
  };

  matches.forEach((match) => {
    const word = match.groups.word.toLowerCase();
    uniqueWords[word] = (uniqueWords[word] ?? 0) + 1;
  });
  return uniqueWords;
}

module.exports.capitalize = capitalize;
module.exports.correctText = correctText;
module.exports.countWords = countWords;
module.exports.countUniqueWords = countUniqueWords;
