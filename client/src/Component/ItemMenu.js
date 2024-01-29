import React, { useEffect } from "react";
import { Card, Layout } from "antd";
import "./style.css";
import { showItem } from "../Reducers/ItemReducer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Reducers/OrderCartReducer";

const ItemMenu = () => {
  const dispatch = useDispatch();

  dispatch(clearCart());

  //--------------------------------------------FETCH ITEMS TABLE DATA FOR SELECTION OF ITEM

  const MyItems = useSelector((state) => state.Items);

  const displayData = async () => {
    const result = await axios.get("http://localhost:5000/item/show");
    const myData = result.data;
    dispatch(showItem(myData));
  };

  useEffect(() => {
    displayData();
  }, []);

  return (
    <Layout className="container-fluid">
      <div className="container-fluid">
        <h1 className="mt-3 text-success border-success border-bottom fw-bolder mb-3">
          Our Menu
        </h1>
        <ul></ul>
        <div className="row d-flex justify-content-center">
          <Card className="w-75 border">
            <div className="row fs-3  fw-bolder text-primary">
              <div className="d-flex justify-content-center col-sm-8">
                Items
              </div>
              <div className="d-flex justify-content-start col-sm-2">Price</div>
            </div>
          </Card>
        </div>
        <div className="row d-flex justify-content-center">
          {MyItems.map((d) => {
            return (
              <>
                <Card className="w-75" key={d.index}>
                  <div className="row fw-bolder">
                    <div className="d-flex justify-content-center col-sm-8">
                      {d.id}. {d.ItemName}
                    </div>
                    <div className="d-flex justify-content-start col-sm-2">
                      {d.ItemPrice} Rs.
                    </div>
                  </div>
                </Card>
              </>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ItemMenu;
