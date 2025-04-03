// import { log } from 'handlebars'
// import template from '../templates/card.hbs'

import { getProducts, getPopularProducts, getDiscproducts } from './products.js'
// getProducts().then(pr => console.log('pr', pr))
getProducts()
getPopularProducts()
getDiscproducts()

import example from '../templates/example.hbs'
const img = new URL('../images/round.svg', import.meta.url).href;
console.log('img', img); // Буде показувати правильний URL до зображення

const container = document.querySelector('.container-exapmle')
container.innerHTML = example({img})
