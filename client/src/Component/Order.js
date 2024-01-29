import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ConfigProvider,
  Form,
  InputNumber,
  Select,
  Card,
  Layout,
  Table,
  Input,
} from "antd";
import { showItem } from "../Reducers/ItemReducer";
import {
  UpdateItem,
  addItem,
  removeItem,
  showMyOrderCart,
} from "../Reducers/OrderCartReducer";
import { useNavigate } from "react-router-dom";
import { DeleteFilled } from "@ant-design/icons";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    displayItems();
    MyOrderItems();
  }, []);

  //--------------------------------------------FETCH ITEMS TABLE DATA FOR SELECTION OF ITEM
  const MyItems = useSelector((state) => state.Items);

  const displayItems = async () => {
    const result = await axios.get("http://localhost:5000/item/show");
    const myData = result.data;
    dispatch(showItem(myData));
  };

  //---------------------------------------------ADDING DATA TO MY ORDER Page

  const [selectedItem, setSelectedItem] = useState(null);
  const [ItemData, setFetchItemData] = useState([]);

  const handleItemChange = (value) => {
    setSelectedItem(value);

    // Fetch the price from the database based on the selected item's ID
    const selectedItemData = MyItems.find((item) => item.id === value);
    if (selectedItemData) {
      const data = {
        price: selectedItemData.ItemPrice,
        name: selectedItemData.ItemName,
      };
      setFetchItemData(data);
    }
  };

  const AddItemForOrder = (values) => {
    const AddItems = {
      ItemId: values.ItemId,
      ItemName: ItemData.name,
      ItemQuantity: values.ItemQuantity,
      ItemPrice: ItemData.price,
      TotalPrice: values.ItemQuantity * ItemData.price,
    };

    try {
      if (OrderCart.find((item) => item.ItemId === values.ItemId)) {
        alert(
          "You Already Select This Item!!\n(If You want More Quantiy Than Incerese From Your Order Page!)"
        );
        form.resetFields();
      } else {
        dispatch(addItem({ AddItems }));
        window.location.reload();
      }
    } catch (error) {
      alert("Error while Adding Item..");
    }
  };

  // ----------------------------------------------------SHOW MYORDER ITEM DATA FOR CONFIRMATION

  const OrderCart = useSelector((state) => state.OrderCart);

  const MyOrderItems = async () => {
    const CartItems = await axios.get("http://localhost:5000/Ordercart/show/");
    const Items = CartItems.data;
    dispatch(showMyOrderCart(Items));
  };

  //----------Increment and decrement the quantity of added item-------------//

  const ManageQuantity = async (id, newQuantity, price) => {
    if (newQuantity < 1) {
      alert("Mininmum Quantity should be 1!");
    } else {
      dispatch(
        UpdateItem({
          id,
          ItemQuantity: newQuantity,
          TotalPrice: price * newQuantity,
        })
      );
      MyOrderItems();
    }
  };

  //----------delete the item from myorder item list-------------//

  const RemoveItem = (index) => {
    const ItemIndex = {
      id: index,
    };
    dispatch(removeItem({ ItemIndex }));
    window.location.reload();
  };

  //----------show myorder item list-------------//

  const MyOrderCartData =
    Array.isArray(OrderCart) &&
    OrderCart.map((d, index) => {
      const ItemCartData = {
        key: index,
        ItemId: d.ItemId,
        ItemName: d.ItemName,
        decrement: (
          <Button
            className="btn btn-primary"
            onClick={() =>
              ManageQuantity(d.id, d.ItemQuantity - 1, d.ItemPrice)
            }
          >
            -
          </Button>
        ),
        ItemQuantity: d.ItemQuantity,
        increment: (
          <Button
            className="btn btn-primary"
            onClick={() =>
              ManageQuantity(d.id, d.ItemQuantity + 1, d.ItemPrice)
            }
          >
            +
          </Button>
        ),
        ItemPrice: d.ItemPrice,
        TotalPrice: d.TotalPrice,
        Delete: (
          <Button type="text" onClick={() => RemoveItem(d.id)}>
            <DeleteFilled className="delete-icon" style={{ color: "red" }} />
          </Button>
        ),
      };
      return ItemCartData;
    });

  //---------myorder list table columns

  const columns = [
    {
      title: "Items",
      fixed: "center",
      children: [
        {
          title: "Item Name",
          width: 50,
          dataIndex: "ItemName",
          key: "ItemName",
          fixed: "left",
        },
        {
          title: "",
          width: 30,
          dataIndex: "decrement",
          key: "decrement",
          fixed: "left",
        },
        {
          title: "Quantity",
          dataIndex: "ItemQuantity",
          key: "ItemQuantity",
          width: 30,
          fixed: "left",
        },
        {
          title: "",
          width: 50,
          dataIndex: "increment",
          key: "increment",
          fixed: "left",
        },
        {
          title: "Item Price",
          width: 50,
          dataIndex: "ItemPrice",
          key: "ItemPrice",
          fixed: "left",
        },
        {
          title: "TotalPrice",
          width: 50,
          dataIndex: "TotalPrice",
          key: "TotalPrice",
          fixed: "left",
        },
        {
          title: "Action",
          width: 50,
          dataIndex: "Delete",
          key: "Delete",
          fixed: "left",
        },
      ],
    },
  ];

  const onFinish = () => {
    navigate("/CustomerDetails");
  };

  return (
    <Layout className="container-fluid">
      <div className="container-fluid">
        <div className="row">
          {/* --------------------------------------------------------------------Add Order Page */}

          <div className="col-sm-6 d-flex justify-content-center ">
            <Card className="card mt-5 w-75 h-100 bg-body-secondary">
              <h3 className="mt-3 text-success border-success border-bottom fw-bolder mb-3">
                Add Items For Order
              </h3>
              <div className="mt-5">
                <ConfigProvider
                  theme={{ token: { fontSize: 17, colorText: "black" } }}
                >
                  <Form
                    name="myForm"
                    onFinish={AddItemForOrder}
                    form={form}
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 10 }}
                    layout="horizontal"
                    style={{
                      maxWidth: 700,
                    }}
                  >
                    <Form.Item
                      label="Choose Item"
                      name="ItemId"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Item!",
                        },
                      ]}
                    >
                      <Select
                        placeholder={"Select Item"}
                        onChange={handleItemChange}
                        value={selectedItem}
                      >
                        {MyItems.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              <p>{item.ItemName}</p>
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>

                    <Form.Item label="" name="ItemPrice" type="hidden">
                      <Input type="hidden" />
                    </Form.Item>
                    <Form.Item
                      label="Quantity"
                      name="ItemQuantity"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Quantity",
                        },
                      ]}
                    >
                      <InputNumber min="1" />
                    </Form.Item>

                    <Form.Item className="btn btn-success m-5 p-2 fs-5">
                      <Button htmlType="submit">Add</Button>
                    </Form.Item>
                  </Form>
                </ConfigProvider>
              </div>
            </Card>
          </div>

          {/*--------------------------------------------------------------- View My Order page */}

          <div className="col-sm-6 d-flex justify-content-start">
            <Card className="card mt-5 w-100 h-100 bg-body-secondary">
              <h3 className="mt-3 text-success border-success border-bottom fw-bolder mb-3">
                Your Added Items
              </h3>
              <div className="mt-5">
                <ConfigProvider
                  theme={{ token: { fontSize: 18, colorText: "black" } }}
                ></ConfigProvider>
                {OrderCart.length > 0 ? (
                  <>
                    <Table
                      columns={columns}
                      dataSource={MyOrderCartData}
                      pagination={false}
                      className="tableBorder"
                      bordered
                    />
                    <Form
                      name="myData"
                      onFinish={onFinish}
                      labelCol={{ span: 10 }}
                      wrapperCol={{ span: 10 }}
                      layout="horizontal"
                      style={{
                        maxWidth: 700,
                      }}
                    >
                      <Form.Item className="btn btn-success m-5 p-2 fs-5">
                        <Button htmlType="submit">Confirm Order</Button>
                      </Form.Item>
                    </Form>
                  </>
                ) : (
                  <h3 className="text-danger">No Items!!</h3>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
