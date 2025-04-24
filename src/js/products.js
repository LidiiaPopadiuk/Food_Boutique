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
const wrapperAllPagination = document.querySelector('.pagination__wrapper');
const firstBtn = document.querySelector('.firstF'); // <<
const lastBtn = document.querySelector('.lastS'); // >>
const firstSecBtn = document.querySelector('.secondS'); // >
const lastFirstBtn = document.querySelector('.lastF'); // <

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

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 3);

  if (endPage - startPage < 3) {
    startPage = Math.max(1, endPage - 3);
  }

  // for (let i = startPage; i <= endPage; i++) {
  //   const btn = document.createElement('button');
  //   btn.classList.add('cards__btn');
  //   btn.dataset.page = i;
  //   btn.textContent = i;

  //   if (i === currentPage) {
  //     btn.classList.add('cards__btn--active');
  //     btn.disabled = true;
  //   }

  //   paginationWrapper.appendChild(btn);
  // }

  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement('button');
    btn.classList.add('cards__btn');
    btn.dataset.page = i;
    btn.innerHTML = `<span class='cards__span'>${i}</span>`;

    if (i === currentPage) {
      btn.classList.add('cards__btn--active');
      btn.disabled = true;
    }

    paginationWrapper.appendChild(btn);
  }

  if (startPage > 1) {
    const dotsStart = document.createElement('span');
    dotsStart.textContent = '...';
    dotsStart.classList.add('pagination__dots');
    paginationWrapper.insertBefore(dotsStart, paginationWrapper.firstChild);
  }

  if (endPage < totalPages) {
    const dotsEnd = document.createElement('span');
    dotsEnd.textContent = '...';
    dotsEnd.classList.add('pagination__dots');
    paginationWrapper.appendChild(dotsEnd);
  }
};

let currentPage = 1;
let totalPagesGlobal = 1;

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
    totalPagesGlobal = products.totalPages;
    renderPagination(page, totalPagesGlobal);
    const productsHTML = template(products.results);
    productsAllWrapper.innerHTML = productsHTML;
    return products;
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

// Функція для оновлення стану кнопок
const updatePaginationButtons = () => {
  // Оновлюємо стан кнопок "перша" і "попередня"
  if (currentPage === 1) {
    firstBtn.classList.add('disable');
    lastFirstBtn.classList.add('disable');
  } else {
    firstBtn.classList.remove('disable');
    lastFirstBtn.classList.remove('disable');
  }

  // Оновлюємо стан кнопок "остання" і "наступна"
  if (currentPage === totalPagesGlobal) {
    lastBtn.classList.add('disable');
    firstSecBtn.classList.add('disable');
  } else {
    lastBtn.classList.remove('disable');
    firstSecBtn.classList.remove('disable');
  }
};

// Обробка кліків на кнопки навігації
wrapperAllPagination.addEventListener('click', e => {
  const target = e.target.closest('button');
  if (!target) return;

  if (target.classList.contains('firstF')) {
    currentPage = 1;
  } else if (target.classList.contains('lastS')) {
    currentPage = totalPagesGlobal;
  } else if (target.classList.contains('lastF')) {
    if (currentPage > 1) {
      currentPage -= 1;
    }
  } else if (target.classList.contains('secondS')) {
    if (currentPage < totalPagesGlobal) {
      currentPage += 1;
    }
  }

  getProducts(currentPage);
  updatePaginationButtons();
});

// Обробка кліків на кнопки сторінок
paginationWrapper.addEventListener('click', e => {
  const btn = e.target.closest('.cards__btn');
  if (btn) {
    currentPage = +btn.dataset.page;
    getProducts(currentPage);
    updatePaginationButtons();
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
