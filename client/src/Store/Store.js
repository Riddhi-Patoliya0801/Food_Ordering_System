import {configureStore} from "@reduxjs/toolkit"
import ItemReducer from "../Reducers/ItemReducer";
import OrderReducer from "../Reducers/OrderReducer";
import OrderCartReducer from "../Reducers/OrderCartReducer";

export const Store=configureStore({
    reducer:{
        OrderCart:OrderCartReducer,
        Items:ItemReducer,
        Order:OrderReducer,
    }
})