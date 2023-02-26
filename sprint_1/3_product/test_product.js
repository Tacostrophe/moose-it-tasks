/* eslint-disable no-console */
const {
  Product,
  sortProducts,
} = require('./product');

const productList = [
  new Product('fdname', 1, 5, 'abcdescription'),
  new Product('naFDme', 2, 5, 'descriabcption'),
  new Product('namefd', 2, 6, 'descriptionabc'),
  new Product('name', 4, 3, 'description'),
];

console.log(sortProducts('name-contains-fd&price-=2&quantity->5&description-ends-abc', productList));
console.log(sortProducts('name-starts-fd&quantity-=5', productList));
console.log(sortProducts('name-starts-fd', productList));
console.log(sortProducts('quantity->5', productList));
