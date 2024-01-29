import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const MyOrderReducer = createSlice({
  name: "Order",
  initialState: {
    order:[]
  },
  reducers: {
    addOrder: (state, action) => {
      axios
        .post("http://localhost:5000/Order/insert", action.payload.OrderData)
        .then(() => {
          alert("Order Placed!!")

        });
    },

    updateOrderDetails: (state, action) => {
      axios
        .patch(`http://localhost:5000/Order/edit/${action.payload.OrderData.id}`, action.payload.OrderData)
        .then(() => {
          alert("Order details Updated!!")
        });
    },

    deleteOrder:(state,action)=>{
      axios
        .delete(`http://localhost:5000/Order/delete/${action.payload.OrderId.id}`)
        .then((d) => {
          alert(`Order deleted!!`)
        });
    },

    showAllOrder: (state, action) => {
      return action.payload
    },
    
    showOneOrder: (state, action) => {
      return action.payload
    },
  },
});

export const { addOrder ,updateOrderDetails, showAllOrder ,deleteOrder,showOneOrder} = MyOrderReducer.actions;
export default MyOrderReducer.reducer;
