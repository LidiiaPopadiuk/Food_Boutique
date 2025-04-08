import { log } from 'handlebars';
// import { getProducts } from './products';

const inputSearch = document.querySelector('#search');
const selectCategories = document.querySelector('#categories');
const selectSortby = document.querySelector('#sort-by');
const productsContainer = document.querySelector('.products__items');

let allProducts = [];


const getProducts = async () => {
  try {
    const response = await fetch('https://food-boutique.b.goit.study/api/products');
    const data = await response.json();
    allProducts = data.results;
    renderProducts(allProducts); 
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

getProducts(); 


const filterProducts = () => {
  let filteredProducts = [...allProducts];

  // inputSearch.value.toLowerCase()
  if (inputSearch) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(inputSearch.value.toLowerCase())
    );
  }

  if (selectCategories.value !== 'Show all') {
    filteredProducts = filteredProducts.filter(
      product => product.category === selectCategories.value
    );
  }

  if (selectSortby.value === 'a-z') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectSortby.value === 'z-a') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectSortby.value === 'cheap') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectSortby.value === 'Expensive') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectSortby.value === 'Popular') {
    filteredProducts.sort((a, b) => b.popularity - a.popularity);
  } else if (selectSortby.value === 'not-popular') {
    filteredProducts.sort((a, b) => a.popularity - b.popularity);
  }
  renderProducts(filteredProducts);
};

const renderProducts = products => {
    console.log("products", products);
    
  productsContainer.innerHTML = '';
  if (products.length === 0) {
    productsContainer.innerHTML = '<p>Nothing found</p>';
    return;
  }

  products.forEach(product => {
    const productHTML = `<div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
      </div>
    `;
    productsContainer.insertAdjacentHTML("beforeend", productHTML)
  });
};


inputSearch.addEventListener('input', filterProducts);
selectCategories.addEventListener('change', filterProducts);
selectSortby.addEventListener('change', filterProducts);
