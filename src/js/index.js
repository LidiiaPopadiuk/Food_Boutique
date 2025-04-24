import './dev';
import { add2Cart } from './cart';

import './cart.js'

import './products.js'
import { getProducts, getPopularProducts, getDiscproducts } from './products.js'
// getProducts().then(pr => console.log('pr', pr))
getProducts()
getPopularProducts()
getDiscproducts()
