import { log } from 'handlebars/runtime';
import modalTemplate from '../templates/modal.hbs';

const modal = document.querySelector('.modal');
const modalWrapper = document.querySelector('.modal__wrapper');
const listOfProducts = document.querySelector('.products__items');
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
    e.target.classList.contains('open-modal-btn') ||
    e.target.classList.contains('pr__svg') ||
    e.target.closest('.pr')
  ) {
    modal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';

    const id = e.target.closest('.pr').id;
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
