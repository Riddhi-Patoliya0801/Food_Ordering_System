import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const OrderCartReducer = createSlice({
  name: "OrderCart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      axios
        .post("http://localhost:5000/OrderCart/insert", action.payload.AddItems)
        .then((d) => {
          return d;
        });
    },

    UpdateItem: (state, action) => {
      axios
        .patch(
          `http://localhost:5000/OrderCart/update/${action.payload.id}`,
          action.payload
        )
        .then((d) => {
          return d;
        });
    },

    removeItem: (state, action) => {
      axios
        .delete(
          `http://localhost:5000/OrderCart/deleteOne/${action.payload.ItemIndex.id}`
        )
        .then((d) => {
          return d;
        });
    },

    showMyOrderCart: (state, action) => {
      return action.payload;
    },

    clearCart: (state, action) => {
      axios.delete("http://localhost:5000/OrderCart/delete").then((d) => {
        return d;
      });
    },

  },
});

export const { addItem, removeItem, showMyOrderCart ,UpdateItem, clearCart} =
OrderCartReducer.actions;
export default OrderCartReducer.reducer;
