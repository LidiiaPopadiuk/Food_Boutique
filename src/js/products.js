import { log } from 'handlebars/runtime';
import template from '../templates/card.hbs';
import popularTemplate from '../templates/cardPopular.hbs';
import discTemplate from '../templates/cardDis.hbs';
// import discountImg from '../images/round.svg'

const productsAllWrapper = document.querySelector('.products__items');
const popularProductsWrapper = document.querySelector('.products__popular');
const discountProductsWrapper = document.querySelector('.products__discount');

export const getProducts = async () => {
  try {
    const screenWidth = window.innerWidth;
    let limit
    if (screenWidth >= 1280) { 
      limit = 9;
    } else if (screenWidth >= 768) {
      limit = 8;
    } else {
      limit = 6;
    }
    const response = await fetch(
      `https://food-boutique.b.goit.study/api/products?limit=${limit}`
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


export const getPopularProducts = async () => {
  try {
    const response = await fetch('https://food-boutique.b.goit.study/api/products/popular')
    const popularProducts = await response.json();
    console.log('popular products:', popularProducts);
    // const arrayPopularProducts = popularProducts.map(product => {
    //   return popularTemplate(product)
    // })
    const popularProductsHTML = popularTemplate(popularProducts);
    popularProductsWrapper.innerHTML = popularProductsHTML;
  } catch (err) {
    console.error('Error fetching popular products:', err);
  }
}

export const getDiscproducts = async () => {
  try {
    const response = await fetch(`https://food-boutique.b.goit.study/api/products/discount`)
    const discountProducts = await response.json();
    console.log('discount products:', discountProducts);
    const discountProducts2el = discountProducts.slice(0,2)
    // const params = {
    //   ...discountProducts, imgDisc: discountImg
    // } 
    // console.log(params);
    const popularproductsHTML = discTemplate(discountProducts2el)
    discountProductsWrapper.innerHTML = popularproductsHTML;
  } catch (err) {
    console.error('Error fetching discount products:', err);
  }
}






// const paginationInfo = async () => {
//   const response = await fetch(
//     'https://food-boutique.b.goit.study/api/products'
//   );
//   const products = await response.json();
//   const wrapperPagination = document.querySelector('.products__pagination')
//   products.forEach(product => {
//     const button = document.createElement('button');
//   })




  // const totalPages = Math.ceil(products.count / limit);
  // console.log('total pages:', totalPages);
// }
