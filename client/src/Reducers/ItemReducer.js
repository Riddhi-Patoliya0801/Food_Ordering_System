import { createSlice } from "@reduxjs/toolkit";

const ItemReducer = createSlice({
  name: "Items",
  initialState: [],
  reducers: {
    showItem: (state, action) => {
      return action.payload;
    },
  },
});

export const { showItem } = ItemReducer.actions;
export default ItemReducer.reducer;
