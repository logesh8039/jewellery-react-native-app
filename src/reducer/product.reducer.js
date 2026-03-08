// fetch data from the local json data

import { createSlice } from '@reduxjs/toolkit';
// import { productData } from '../assets/data/ProductData';

import { ProductData } from '../assets/data/Joyalukkas';
import { ProductCategories } from '../assets/data/Joyalukkas';

const initialState = {
  products: ProductData,
  cart: [],
  loading: false,
  error: null,
  searchQuery: '',
  productCategories: ProductCategories,
  filteredByBadge: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    addToCart(state, action) {
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setProductCategories(state, action) {
      state.productCategories = action.payload;
    },
    filterByBadge(state, action) {
      state.filteredByBadge = action.payload;
    },
  },
});
export const {
  setProducts,
  addToCart,
  removeFromCart,
  setSearchQuery,
  setProductCategories,
  filterByBadge,
} = productSlice.actions;

//how to use the productSlice in a component
export const selectProducts = state => state.product.products;
export const selectCart = state => state.product.cart;
export const selectSearchQuery = state => state.product.searchQuery;
export const selectProductCategories = state => state.product.productCategories;

export const selectFilteredProducts = state => {
  const query = state.product.searchQuery.toLowerCase();
  return state.product.products.filter(
    product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query),
  );
};

export const filterByCategory = (state, category) => {
  return state.product.products.filter(
    product => product.category === category,
  );
};

export const selectFilteredCategories = state => {
  const query = state.product.searchQuery.toLowerCase();
  return state.product.productCategories.filter(category =>
    category.name.toLowerCase().includes(query),
  );
};

export default productSlice.reducer;
