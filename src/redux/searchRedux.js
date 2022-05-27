import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchInput: "",
  },
  reducers: {
    searchProduct: (state, action) => {
      state.searchInput = action.payload;
    },
  },
});

export const { searchProduct } = searchSlice.actions;
export default searchSlice.reducer;
