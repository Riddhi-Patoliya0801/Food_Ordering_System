import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Order from "./Component/Order";
import CustomerDetails from "./Component/CustomerDetails";
import ViewAllOrder from "./Component/ViewAllOrder";
import EditCustomerDetails from "./Component/EditCustomerDetails";
import ItemMenu from "./Component/ItemMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<ItemMenu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/CustomerDetails" element={<CustomerDetails />} />
        <Route path="/ViewAllOrder" element={<ViewAllOrder />} />
        <Route
          path="/updateCustomerDetail/:id"
          element={<EditCustomerDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
