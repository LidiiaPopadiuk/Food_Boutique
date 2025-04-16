import { log } from 'handlebars/runtime';
import template from '../templates/card.hbs';
import popularTemplate from '../templates/cardPopular.hbs';
import discTemplate from '../templates/cardDis.hbs';
// import modalTemplate from '../templates/modal.hbs'
// import discountImg from '../images/round.svg'

const productsAllWrapper = document.querySelector('.products__items');
const popularProductsWrapper = document.querySelector('.products__popular');
const discountProductsWrapper = document.querySelector('.products__discount');
const paginationWrapper = document.querySelector('.products__pagination');
// const modalWrapper = document.querySelector('.backdrop')

// export const getProducts = async () => {
//   try {
//     const screenWidth = window.innerWidth;
//     let limit
//     if (screenWidth >= 1280) {
//       limit = 9;
//     } else if (screenWidth >= 768) {
//       limit = 8;
//     } else {
//       limit = 6;
//     }
//     const response = await fetch(
//       `https://food-boutique.b.goit.study/api/products?limit=${limit}`
//     );
//     const products = await response.json();
//     console.log('products:', products);
//     const productsHTML = template(products.results);
//     productsAllWrapper.innerHTML = productsHTML;
//     return products;
//   } catch (err) {
//     console.error('Error fetching products:', err);
//   }
// };

const renderPagination = (currentPage, totalPages) => {
  paginationWrapper.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i <= currentPage + 3 && i >= currentPage - 1)
    ) {
      const btn = document.createElement('button');
      btn.classList.add('cards__btn');
      btn.dataset.page = i;
      btn.textContent = i;
      if (i === currentPage) {
        btn.disabled = true;
        // btn.style.backgroundColor = '#6D8434';
      }
      // if (i >= 3) {
      //   btn.
      // }
      if (i === totalPages) {
        btn.textContent = '...';
        btn.classList.add('cards__btn--active');
      }
      paginationWrapper.appendChild(btn);
    }
  }
};

let currentPage = 1;

export const getProducts = async (page = 1) => {
  try {
    const screenWidth = window.innerWidth;
    let limit;
    if (screenWidth >= 1280) {
      limit = 9;
    } else if (screenWidth >= 768) {
      limit = 8;
    } else {
      limit = 6;
    }
    const params = new URLSearchParams({
      limit: limit,
      page: page,
    });
    const response = await fetch(
      `https://food-boutique.b.goit.study/api/products?${params}`
    );
    const products = await response.json();
    console.log('products:', products);
    renderPagination(page, products.totalPages);
    const productsHTML = template(products.results);
    productsAllWrapper.innerHTML = productsHTML;
    return products;
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};


paginationWrapper.addEventListener('click', e => {
  if (e.target.classList.contains('cards__btn')) {
    currentPage = +e.target.dataset.page;
    getProducts(currentPage);
  }
});

export const getPopularProducts = async () => {
  try {
    const response = await fetch(
      'https://food-boutique.b.goit.study/api/products/popular'
    );
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
};

export const getDiscproducts = async () => {
  try {
    const response = await fetch(
      `https://food-boutique.b.goit.study/api/products/discount`
    );
    const discountProducts = await response.json();
    console.log('discount products:', discountProducts);
    const discountProducts2el = discountProducts.slice(0, 2);
    // const params = {
    //   ...discountProducts, imgDisc: discountImg
    // }
    // console.log(params);
    const popularproductsHTML = discTemplate(discountProducts2el);
    discountProductsWrapper.innerHTML = popularproductsHTML;
  } catch (err) {
    console.error('Error fetching discount products:', err);
  }
};





// closeModal.addEventListener('click', () => {
//   modal.classList.remove('is-hidden');
//   document.body.classList.remove('no-scroll')
//   modalWrapper.innerHTML = ''
// });
