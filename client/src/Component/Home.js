import React from "react";
import { Layout, Image } from "antd";
import { useDispatch } from "react-redux";
import { clearCart } from "../Reducers/OrderCartReducer";

const { Content, Sider } = Layout;

const Home = () => {
  const dispatch = useDispatch();

  dispatch(clearCart());

  return (
    <div>
      <Layout className="container-fluid ">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-6 content text-success d-flex justify-content-center">
              The Best <br />
              Delicious Food!!
            </div>

            <div className="col-sm-6 sider">
              <Image width={400} height={400} src="./images/f1.jpeg" />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
