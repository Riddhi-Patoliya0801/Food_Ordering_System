import React, { useEffect } from "react";
import { Button, Form, Table, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Search from "antd/es/input/Search";
import { deleteOrder, showAllOrder } from "../Reducers/OrderReducer";
import { EditFilled } from "@ant-design/icons";

const ViewAllOrder = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //-----------------------------View All Orders--------------------------------//
  const Orders = useSelector((state) => state.Order);

  const AllOrdersData = async () => {
    const AllOrders = await axios.get("http://localhost:5000/Order/show/");
    const Order = AllOrders.data;
    dispatch(showAllOrder(Order));
  };

  useEffect(() => {
    AllOrdersData();
  }, []);

  const CancelOrder = (orderId) => {
    const OrderId = {
      id: orderId,
    };
    dispatch(deleteOrder({ OrderId }));
    window.location.reload();
  };

  const ViewAllOrders =
    Array.isArray(Orders) &&
    Orders.map((d, index) => {
      const jsonData = JSON.parse(d.Items);

      const AllOrder = {
        key: index,
        id: d.id,
        CustomerName: d.CustomerName,
        Contact: d.Contact,
        CustomerEmail: d.CustomerEmail,
        NoOfMembers: d.NoOfMembers,
        OrderDate: d.OrderDate,
        OrderTime: d.OrderTime,
        Items: jsonData,
        GrandTotal: d.GrandTotal,
        PaymentMode: d.PaymentMode,
        Edit: (
          <Button
            type="text"
            onClick={() => navigate(`/updateCustomerDetail/${d.id}`)}
          >
            <EditFilled className="update-icon" style={{ color: "blue" }} />
          </Button>
        ),
        Cancel: (
          <Button className="btn btn-danger" onClick={() => CancelOrder(d.id)}>
            Cancel
          </Button>
        ),
      };
      return AllOrder;
    });

  //----------------------------Search Particular Order---------------------------//
  const handleSearch = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Order/search?query=${value}`
      );
      dispatch(showAllOrder(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  //----------------------------Parent columns-----------------------------//
  const columns = [
    {
      title: "Order Id",
      width: 80,
      fixed: "left",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CustomerName",
      width: 100,
      dataIndex: "CustomerName",
      key: "CustomerName",
      fixed: "left",
    },
    {
      title: "Contact",
      dataIndex: "Contact",
      key: "Contact",
      width: 100,
    },
    {
      title: "Customer Email",
      dataIndex: "CustomerEmail",
      key: "CustomerEmail",
      width: 100,
    },
    {
      title: "Members",
      dataIndex: "NoOfMembers",
      key: "NoOfMembers",
      width: 100,
    },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      key: "OrderDate",
      width: 100,
    },
    {
      title: "OrderTime",
      dataIndex: "OrderTime",
      key: "OrderTime",
      width: 100,
    },
    {
      title: "Items",
      dataIndex: "Items",
      width: 300,
      key: "Items",
      render: (Items) => (
        <Table columns={NestedColumns} dataSource={Items} pagination={false} />
      ),
    },
    {
      title: "GrandTotal",
      dataIndex: "GrandTotal",
      key: "GrandTotal",
      width: 100,
    },
    {
      title: "Payment Mode",
      dataIndex: "PaymentMode",
      key: "PaymentMode",
      width: 100,
    },
    {
      title: "Action",
      width: 100,
      fixed: "right",
      children: [
        {
          title: "Edit",
          width: 100,
          dataIndex: "Edit",
          key: "Edit",
          fixed: "right",
        },
        {
          title: "Cancel",
          width: 100,
          dataIndex: "Cancel",
          key: "Cancel",
          fixed: "right",
        },
      ],
    },
  ];

  //--------------------------Nested Columns----------------------------//
  const NestedColumns = [
    {
      title: "Item Name",
      dataIndex: "ItemName",
      key: "ItemName",
      width: 100,
      fixed: "left",
    },
    {
      title: "Quantity",
      width: 100,
      dataIndex: "ItemQuantity",
      key: "ItemQuantity",
      fixed: "left",
    },
    {
      title: "Item Price",
      width: 100,
      dataIndex: "Total",
      key: "Total",
      fixed: "left",
    },
  ];

  return (
    <div>
      <Layout className="container-fluid">
        <div className="container-fluid">
          {Orders.length > 0 ? (
            <>
              <Form
                name="myData"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 10 }}
                layout="horizontal"
                style={{
                  maxWidth: 700,
                }}
              >
                <Search
                  className="container searchOrder mt-3"
                  placeholder="Search Order By OrderId and Customername"
                  name="Search"
                  size="large"
                  style={{
                    width: 450,
                    height: 40,
                  }}
                  enterButton
                  allowClear
                  onSearch={(value) => handleSearch(value)}
                />
              </Form>
              <Table
                columns={columns}
                className="mt-3 tableBorder"
                dataSource={ViewAllOrders}
                pagination={false}
                scroll={{
                  x: 1700,
                }}
              />
            </>
          ) : (
            <h3 className="text-danger">No Orders!!</h3>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default ViewAllOrder;
