import { log } from 'handlebars/runtime';
import modalTemplate from '../templates/modal.hbs';
import { add2Cart } from './cart';


const modal = document.querySelector('.modal');
const modalWrapper = document.querySelector('.modal__wrapper');
const listOfProducts = document.querySelector('.productsDisplay');
const closeModalBtn = document.querySelector('.modal__close');

const getProductId = async id => {
  const response = await fetch(
    `https://food-boutique.b.goit.study/api/products/${id}`
  );
  const product = await response.json();
  return product;
};

listOfProducts.addEventListener('click', async e => {
  if (
    e.target.closest('.pr__btn.add2cart') ||
    e.target.closest('.pop__btn.btn.add2cart') ||
    e.target.closest('.disc__btn.btn.add2cart')
  ) {
    return;
  }

  const productCard = e.target.closest('.pr') || e.target.closest('.pop') || e.target.closest('.disc');
  if (productCard) {
    modal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';

    const id = productCard.id;
    console.log('id', id);

    const product = await getProductId(id);
    console.log('productById', product);

    const modalHTML = modalTemplate(product);
    modalWrapper.innerHTML = modalHTML;
  }
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('is-hidden');
  document.body.style.overflow = 'auto';
});

modalWrapper.addEventListener('click', e => {
  if (!e.target.closest('.add2cart')) return;

  const button = e.target.closest('.add2cart');
  if (!button) return;


  const id = e.target.closest('.add2cart').id;
  console.log('id', id);

  add2Cart(id);

})
