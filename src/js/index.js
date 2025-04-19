// import { log } from 'handlebars'
// import template from '../templates/card.hbs'

import './products.js'
import { getProducts, getPopularProducts, getDiscproducts } from './products.js'
// getProducts().then(pr => console.log('pr', pr))
getProducts()
getPopularProducts()
getDiscproducts()
