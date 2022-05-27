import { createSlice } from "@reduxjs/toolkit";

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    tempoShippingDetails: null,
  },
  reducers: {
    addTempoDetails: (state, action) => {
      state.tempoShippingDetails = action.payload;
    },
    clearTempoDetails: (state) => {
      state.tempoShippingDetails = null;
    },
  },
});

export const { addTempoDetails, clearTempoDetails } = shippingSlice.actions;
export default shippingSlice.reducer;
