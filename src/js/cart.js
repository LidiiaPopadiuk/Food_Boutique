import tmpl from '../templates/cart.hbs';

const cartList = document.querySelector('.cart__list');
const cartAmountEls = document.querySelectorAll('.cart-amount');
const deleteAllBtn = document.querySelector('.cart__deleteall');
const prizeSumEl = document.querySelector('#prize-sum');
const cartEmpty = document.querySelector('.cart__empty');
const checkoutForm = document.querySelector('.cart__checkout');

let cartData = (() => {
  const data = JSON.parse(localStorage.getItem('cart'));
  return Array.isArray(data) ? data : [];
})();

const getCartData = () => {
  const data = JSON.parse(localStorage.getItem('cart'));
  return Array.isArray(data) ? data : [];
};

const saveCartData = () => {
  localStorage.setItem('cart', JSON.stringify(cartData));
};

const updateCartAmount = () => {
  cartAmountEls.forEach(el => (el.textContent = cartData.length));
};

const updateTotalPrice = async () => {
  let total = 0;
  for (const item of cartData) {
    try {
      const response = await fetch(
        `https://food-boutique.b.goit.study/api/products/${item.id}`,
      );
      const product = await response.json();
      total += item.amount * product.price;
    } catch (error) {
      console.error('Error getting price:', error);
    }
  }
  prizeSumEl.textContent = `$${total.toFixed(2)}`;
};

const fetchProductData = async id => {
  const response = await fetch(
    `https://food-boutique.b.goit.study/api/products/${id}`,
  );
  return await response.json();
};

const renderCartItem = async item => {
  try {
    const product = await fetchProductData(item.id);
    const existingEl = cartList.querySelector(`[data-id="${item.id}"]`);
    const html = tmpl({
      ...product,
      id: item.id,
      price: `$${product.price}`,
      amount: item.amount,
    });

    if (existingEl) {
      existingEl.outerHTML = html;
    } else {
      cartList.insertAdjacentHTML('beforeend', html);
    }
  } catch (error) {
    console.error('Error loading product:', error);
  }
};

const renderCart = async () => {
  updateCartAmount();

  if (cartData.length === 0) {
    cartList.innerHTML = '';
    cartEmpty?.classList.remove('hidden');
    deleteAllBtn?.classList.add('hidden');
    checkoutForm?.classList.add('hidden');
    await updateTotalPrice();
    return;
  }

  cartEmpty?.classList.add('hidden');
  deleteAllBtn?.classList.remove('hidden');
  checkoutForm?.classList.remove('hidden');

  const renderedIds = new Set();

  for (const item of cartData) {
    await renderCartItem(item);
    renderedIds.add(item.id);
  }

  // Видаляємо DOM-елементи, яких вже немає в cartData
  cartList.querySelectorAll('[data-id]').forEach(el => {
    if (!renderedIds.has(el.dataset.id)) {
      el.remove();
    }
  });

  await updateTotalPrice();
};

export const add2Cart = id => {
  if (!id) throw new Error('ID must be provided to add2Cart');

  const item = cartData.find(item => item.id === id);

  if (item) {
    item.amount++;
  } else {
    cartData.push({ id, amount: 1 });
  }

  saveCartData();
  renderCart();
};

const getItemElement = e => {
  let el = e.target;
  while (el && !el.dataset.id) {
    el = el.parentElement;
  }
  return el;
};

cartList?.addEventListener('click', async e => {
  const el = getItemElement(e);
  if (!el) return;

  const id = el.dataset.id;
  const item = cartData.find(i => i.id === id);
  if (!item) return;

  let shouldRender = false;

  if (e.target.classList.contains('cart__amount-plus')) {
    item.amount++;
    shouldRender = true;
  } else if (
    e.target.classList.contains('cart__amount-minus') &&
    item.amount > 1
  ) {
    item.amount--;
    shouldRender = true;
  } else if (e.target.classList.contains('cart__delete')) {
    cartData = cartData.filter(i => i.id !== id);
    shouldRender = true;
  }

  if (shouldRender) {
    saveCartData();
    await renderCart();
  }
});

deleteAllBtn?.addEventListener('click', async () => {
  cartData = [];
  saveCartData();
  await renderCart();
});

renderCart();
