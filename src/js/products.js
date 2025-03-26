import { log } from 'handlebars/runtime';
import template from '../templates/card.hbs';

const productsAllWrapper = document.querySelector('.products__items');

export const getProducts = async () => {
  try {
    const response = await fetch(
      'https://food-boutique.b.goit.study/api/products'
    );
    const products = await response.json();
    console.log('products:', products);
    const productsHTML = template(products.results);
    productsAllWrapper.innerHTML = productsHTML;
    return products;
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

// export const getProducts = async () => {
//   try {
//     return await fetch('https://food-boutique.b.goit.study/api/products');
//   } catch (err) {
//     console.error('Error fetching products:', err);
//   }
// };

// export const renderingProducts = products => {
//   const markUP = products.map((product, i) => {
//     const params = {
//       id: i,
//       name: product.name,
//       src: product.src,
//       price: product.price,
//       category: product.category,
//       size: product.size,
//       popularity: product.popularity,
//     };
//     console.log(template(params));
//     return template(params);
//   });
//   productsAllWrapper.insertAdjacentHTML('beforeend', markUP.join(''));
// };

// export const infoProducts = async () => {
//   try {
//     productsAllWrapper.innerHTML = '';
//     const products = await getProducts();
//     console.log("products", products);
//     const response = await response.json();
//     renderingProducts(response.products);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//   }
// };

// export const getProducts = async () => {
//   try {
//     const response = await fetch(
//       'https://food-boutique.b.goit.study/api/products'
//     );
//     const products = await response.json();
//     const markUP = products.map((product, i) => {
//       const params = {
//         id: i,
//         name: product.name,
//         src: product.src,
//         price: product.price,
//         category: product.category,
//         description: product.description,
//         popularity: product.popularity,
//       };
//       return template(params);
//     });
//     productsAllWrapper.insertAdjacentHTML('beforeend', markUP.join(''));
//   } catch (err) {
//     console.error('Error fetching products:', err);
//   }
// };
