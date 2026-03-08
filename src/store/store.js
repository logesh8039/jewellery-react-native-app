import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../redux/slices/wishlistSlice';
import productSlice from '../reducer/product.reducer';
import cartReducer from '../redux/slices/cartSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});
