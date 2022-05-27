import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
  },
  reducers: {
    addWish: (state, action) => {
      state.products.push(action.payload);
    },
    removeWish: (state, action) => {
      state.products.splice(action.payload.index, 1);
    },
    updateWish: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addWish, removeWish, updateWish } = wishlistSlice.actions;
export default wishlistSlice.reducer;
