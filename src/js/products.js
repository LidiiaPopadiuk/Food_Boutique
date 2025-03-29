import { log } from 'handlebars/runtime';
import template from '../templates/card.hbs';
import popularTemplate from '../templates/cardPopular.hbs';
import discTemplate from '../templates/cardDis.hbs';
import discountImg from '../images/round.svg'

const productsAllWrapper = document.querySelector('.products__items');
const popularProductsWrapper = document.querySelector('.products__popular');
const discountProductsWrapper = document.querySelector('.products__discount');



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
    const response = await fetch('https://food-boutique.b.goit.study/api/products/discount')
    const discountProducts = await response.json();
    console.log('discount products:', discountProducts);
    const params = {
      ...discountProducts, imgDisc: discountImg
    } 
    console.log(params);
    
    const popularproductsHTML = discTemplate(params)
    discountProductsWrapper.innerHTML = popularproductsHTML;
  } catch (err) {
    console.error('Error fetching discount products:', err);
  }
}