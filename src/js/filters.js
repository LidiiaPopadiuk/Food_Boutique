import { log } from 'handlebars';
// import { getProducts } from './products';

const inputSearch = document.querySelector('#search');
const selectCategories = document.querySelector('#categories');
const selectSortby = document.querySelector('#sort-by');
const productsContainer = document.querySelector('.products__items');

let allProducts = [];

const getProducts = async () => {
  try {
    const response = await fetch(
      'https://food-boutique.b.goit.study/api/products'
    );
    const data = await response.json();
    allProducts = data.results;
    renderProducts(allProducts);
    return allProducts;
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

getProducts();

const getFilteredProducts = async(
  category = '',
  keyword = '',
  page = 1,
  limit = 6,
  sort = ''
) => {
  try{
    const response =  await fetch(`https://food-boutique.b.goit.study/api/products?keyword=${keyword}&category=&sort=${sort}`)
    const data = await response.json()
    console.log(`https://food-boutique.b.goit.study/api/products?keyword=${keyword}&category=&sort=${sort}`);
    
    return data.results
 
  }catch(error){
    console.error('Помилка при фільтрації', error);
    return [];
  }
};

const filterSearch = async () => {
  const keyword = inputSearch.value.trim();
  try {
    const response = await fetch(
      `https://food-boutique.b.goit.study/api/products?keyword=${encodeURIComponent(
        keyword
      )}`
    );
    const data = await response.json();
    renderProducts(data.results);
  } catch (error) {
    console.error('Помилка при фільтрації за keyword:', error);
    return [];
  }
};
// filterSearch()

const filterByCategory = async () => {
  const selectedCategory = selectCategories.value;
  try {
    const response = await fetch(
      `https://food-boutique.b.goit.study/api/products?category=${encodeURIComponent(
        selectedCategory
      )}`
    );
    const data = await response.json();
    renderProducts(data.results);
  } catch (error) {
    console.error('Помилка при фільтрації за категорією:', error);
  }
};

const loadCategories = async () => {
  const res = await fetch(
    'https://food-boutique.b.goit.study/api/products/categories'
  );
  const categories = await res.json();
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    selectCategories.appendChild(option);
  });
};

loadCategories();

const filterByType = async () => {
  const keyword = inputSearch.value.trim();
  const selectedCategory = selectCategories.value;
  const products = await getFilteredProducts(selectedCategory, keyword);
  console.log(products);
  
  const sortType = selectSortby.value;
  console.log(sortType);
  console.log(
    `https://food-boutique.b.goit.study/api/products?sort=${sortType}`
  );
  switch (sortType) {
    case 'byABC_Asc':
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'byABC_Desc':
      products.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'byPrice_Asc':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'byPrice_Desc':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'byPopularity_Asc':
      products.sort((a, b) => a.popularity - b.popularity);
      break;
    case 'byPopularity_Desc':
      products.sort((a, b) => b.popularity - a.popularity);
      break;
  }
  console.log(products);
  renderProducts(products);
};

const updateSelectSize = () => {
  selectSortby.classList.remove('small-option', 'medium-option', 'large-option')

  const value = selectSortby.value

  if (value === 'byABC_Asc' || value === 'byABC_Desc') {
    selectSortby.classList.add('small-width');
  } else if (value === 'byPrice_Asc' || value === 'byPopularity_Desc') {
    selectSortby.classList.add('medium-width');
  } else {
    selectSortby.classList.add('large-width');
  }
}


const renderProducts = products => {
  console.log('products', products);

  productsContainer.innerHTML = '';
  if (products.length === 0) {
    productsContainer.innerHTML = '<p>Nothing found</p>';
    return;
  }

  products.forEach(product => {
    const productHTML = `  <div class='pr' id='${product.id}'>
    <div class='pr__wrapperimg'>
      <img class='pr__img' src='${product.img}' alt='${product.name}' />
    </div>
    <h2 class='pr__title'>${product.name}</h2>
   <p class='pr__categ'><span class="pr__span">Category:</span> ${product.category} </p>
    <p class='pr__size'><span class="pr__span">Size:</span> ${product.size}</p><br>
    <p class='pr__popular'><span class="pr__span">Popularity:</span>  ${product.popularity}</p>
    <div class="pr__wrapper">
      <h2 class='pr__price'> ${product.price}</h2>
      <button class='pr__btn'>
        <svg
          class='pr__svg'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 576 512'
        ><path
            d='M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z'
          /></svg>
      </button>
    </div>
  </div>`;

    productsContainer.insertAdjacentHTML('beforeend', productHTML);
  });
};

inputSearch.addEventListener('input', filterSearch);
selectCategories.addEventListener('change', filterByCategory);
selectSortby.addEventListener('change', filterByType);
selectSortby.addEventListener('change', updateSelectSize)