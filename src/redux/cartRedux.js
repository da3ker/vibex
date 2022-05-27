import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products.splice(action.payload.index, 1);
      state.total -= action.payload.price * action.payload.quantity;
    },
    quantityDec: (state, action) => {
      let index = action.payload.index;
      if (~index) {
        state.products[index].quantity -= 1;
        state.total -= state.products[index].price;
      }
    },
    quantityInc: (state, action) => {
      let index = action.payload.index;
      if (~index) {
        state.products[index].quantity += 1;
        state.total += state.products[index].price;
      }
    },
    updateCart: (state, action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  quantityDec,
  quantityInc,
  updateCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
