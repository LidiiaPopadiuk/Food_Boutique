import tmpl from '../templates/cart.hbs';

const cartList = document.querySelector('.cart__list');
const cartAmount = document.querySelectorAll('.cart-amount');
const deleteAll = document.querySelector('.cart__deleteall');

let cartData = JSON.parse(localStorage.getItem('cart'));

if (!Array.isArray(cartData)) {
  cartData = [];
  localStorage.setItem('cart', JSON.stringify(cartData));
}

const loadCart = () => {
  cartList.innerHTML = '';

  cartAmount.forEach(el => {
    el.textContent = cartData.length;
  });

  const fetchProducts = async () => {
    for (const el of cartData) {
      try {
        const response = await fetch(
          `https://food-boutique.b.goit.study/api/products/${el.id}`,
        );
        const product = await response.json();

        cartList.insertAdjacentHTML(
          'beforeend',
          tmpl({
            id: el.id,
            name: product.name,
            desc: product.desc,
            img: product.img,
            category: product.category,
            price: '$' + product.price,
            size: product.size,
            popularity: product.popularity,
            amount: el.amount,
          }),
        );
      } catch (error) {
        console.error('Error loading product:', error);
      }
    }
  };

  fetchProducts();
};

export const add2Cart = id => {
  if (!id) throw new Error('ID should be in add2Cart usage!!!');

  const existingItem = cartData.find(item => item.id === id);

  if (existingItem) {
    existingItem.amount += 1;
  } else {
    cartData.push({ id, amount: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cartData));
};

loadCart();

cartList.addEventListener('click', e => {
  const getId = (dom = false) => {
    let id = e.target;
    while (id && !id.dataset.id) {
      id = id.parentElement;
    }

    if (!dom) {
      return id.dataset.id;
    } else {
      return id;
    }
  };
  const expr = expr => e.target.classList.contains(expr);
  const numAct = action => {
    const id = getId();
    const item = cartData.find(item => item.id === id);

    if (!item) return;

    if (action === '-' && item.amount <= 1) return;

    item.amount = action === '-' ? item.amount - 1 : item.amount + 1;

    localStorage.setItem('cart', JSON.stringify(cartData));

    const num = getId(true).querySelector('.cart__amount-num');
    num.textContent =
      action === '+' ? +num.textContent + 1 : +num.textContent - 1;
  };

  if (expr('cart__amount-plus')) numAct('+');

  if (expr('cart__amount-minus')) numAct('-');

  if (expr('cart__delete')) {
    const id = getId();
    cartData = cartData.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartData));
    loadCart();
  }
});

deleteAll.addEventListener('click', () => {
  localStorage.setItem('cart', '');
});
