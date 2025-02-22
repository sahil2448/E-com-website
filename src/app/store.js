import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/shopCart/productSlice";
import cartReducer from "../features/shopCart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});
