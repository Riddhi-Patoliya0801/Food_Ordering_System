import React from "react";
import "./style.css";
import { Layout, Menu, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 d-flex">
          <Menu
            onClick={({ key }) => {
              navigate(key);
            }}
            className="menu fw-bolder"
            mode="horizontal"
            items={[
              {label: "Our Food",className:"fs-1"},
              { label: "HOME", key: "/" },
              { label: "MENU", key: "/menu" },
              { label: "ORDER", key: "/order" },
              {
                label: "VIEW ORDERS",
                key: "/ViewAllOrder",
                className:"text-end",
                style: { marginLeft: "700px" },
              },
            ]}
            style={{ flex: 1}}
          />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Navbar;
