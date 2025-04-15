import tmpl from '../templates/cart.hbs';

const cartList = document.querySelector('.cart__list');
const cartAmount = document.querySelectorAll('.cart-amount');

let cartData = JSON.parse(localStorage.getItem('cart'));

if (!Array.isArray(cartData)) {
  cartData = [];
  localStorage.setItem('cart', JSON.stringify(cartData));
}

const loadCart = async () => {
  cartAmount.forEach(el => {
    el.textContent = cartData.length;
  });

  for (const el of cartData) {
    try {
      const response = await fetch(
        `https://food-boutique.b.goit.study/api/products/${el.id}`,
      );
      const product = await response.json();

      cartList.insertAdjacentHTML(
        'beforeend',
        tmpl({
          id: product._id,
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

export const add2Cart = id => {
  const existingItem = cartData.find(item => item.id === id);

  if (existingItem) {
    existingItem.amount += 1;
  } else {
    cartData.push({ id, amount: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cartData));
};

const changeAmount = (id, action) => {
  const item = cartData.find(item => item.id === id);

  if (item) {
    item.amount = action == '-' ? item.amount - 1 : item.amount + 1;
    if (item.amount <= 0) {
      cartData = cartData.filter(item => item.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
};

loadCart();

cartList.addEventListener('click', e => {
  const expr = expr => e.classList.contains(expr);

  if (expr('cart__amount-plus')) {
  }
});
