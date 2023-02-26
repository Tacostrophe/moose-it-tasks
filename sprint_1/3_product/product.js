/* 3.Создать класс данных “Товар”
   С полями:
   - Название
   - Цена
   - Количество
   - Описание
   Наполнить массив объектами такого класса.
   Написать метод, который получает строку вида
   “name-contains-fd&price-=2&quantity->5&description-ends-abc”
   “name-starts-fd&quantity-=5”
   На выходе возвращает массив, только с подходящими объектами
   возможны (contains, starts, ends для строковых и <, =, >, <=, >= для числовых) */

class Product {
  constructor(name, price = 0, quantity = 0, description = '') {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}

function sortProducts(templatesStr, products) {
  const templatesArr = templatesStr.split('&').map((item) => item.split('-'));
  const filterStr = (product, template) => {
    let pattern;
    switch (template[1]) {
      case 'contains':
        [, , pattern] = template;
        break;
      case 'starts':
        pattern = `^${template[2]}`;
        break;
      case 'ends':
        pattern = `${template[2]}$`;
        break;
      default:
        throw Error(`Inapropriate template - ${template[1]}`);
    }
    const re = new RegExp(pattern, 'i');
    return re.test(product[template[0]]);
  };
  const filterNum = (product, template) => {
    if (/^<=/i.test(template[1])) return (product[template[0]] <= template[1].slice(2));
    if (/^</i.test(template[1])) return (product[template[0]] < template[1].slice(1));
    if (/^>=/i.test(template[1])) return (product[template[0]] >= template[1].slice(2));
    if (/^>/i.test(template[1])) return (product[template[0]] > template[1].slice(1));
    if (/^=/i.test(template[1])) return (product[template[0]] == template[1].slice(1));
    throw Error(`Inapropriate template - '${template.join('-')}'`);
  };
  return products.filter((product) => {
    let filterFunc;
    let suitable = true;
    let i = 0;
    let template;
    while (suitable) {
      template = templatesArr[i];
      switch (typeof product[template[0]]) {
        case 'string':
          filterFunc = filterStr;
          break;
        case 'number':
          filterFunc = filterNum;
          break;
        default:
          throw Error(`Unknown type of value ${typeof product[template[0]]}`);
      }
      suitable = filterFunc(product, template);
      i += 1;
    }
    return suitable;
  });
}

module.exports.Product = Product;
module.exports.sortProducts = sortProducts;
