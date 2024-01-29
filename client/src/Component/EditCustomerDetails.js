import {
  Button,
  Card,
  DatePicker,
  Form,
  ConfigProvider,
  Input,
  Layout,
  InputNumber,
  TimePicker,
  Radio,
} from "antd";
import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  showOneOrder,
  updateOrderDetails,
} from "../Reducers/OrderReducer";
import moment from "moment";

const EditCustomerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  //----------------Fetch Single Order For Update-----------------------//

  const oneOrder = useSelector((state) => state.Order);

  useEffect(() => {
    GetOneOrder();
  }, []);

  const GetOneOrder = async () => {
    const Order = await axios.get(`http://localhost:5000/Order/getOne/${id}`);
    const OrderForUpdate = Order.data;
    dispatch(showOneOrder(OrderForUpdate[0]));
  };

  //---------------Set fields Value of fetch Order---------------------//

  form.setFieldsValue({
    CustomerName: oneOrder.CustomerName,
    Contact: oneOrder.Contact,
    CustomerEmail: oneOrder.CustomerEmail,
    NoOfMembers: oneOrder.NoOfMembers,
    OrderDate: moment(oneOrder.OrderDate),
    OrderTime: moment(oneOrder.OrderTime, "HH:mm:ss"),
    PaymentMode: oneOrder.PaymentMode,
  });

  //----------------For selecting only present and future date and time-------------------//
  const disabledPastTime = () => {
    const currentMoment = moment();
    const currentHour = currentMoment.hours();
    const currentMinute = currentMoment.minutes();

    // Disable hours before the current hour
    const disabledHours = () => {
      const hours = [];
      for (let i = 0; i < currentHour; i++) {
        hours.push(i);
      }
      return hours;
    };

    // Disable minutes if the selected hour is the current hour
    const disabledMinutes = (selectedHour) => {
      if (selectedHour === currentHour) {
        const minutes = [];
        for (let i = 0; i < currentMinute; i++) {
          minutes.push(i);
        }
        return minutes;
      }
      return [];
    };

    return {
      disabledHours,
      disabledMinutes,
    };
  };

  const onFinish = (values) => {

    //------------Format Date-------------
    const dateString = values["OrderDate"];
    const dateObject = new Date(dateString);
    let formattedDate = dateObject.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const parts = formattedDate.split("/");
    const dateObjectCorrect = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    formattedDate = dateObjectCorrect.toISOString().split("T")[0];
    values["OrderDate"] = formattedDate;

     //------------Format Time-------------

    let providedTime = values["OrderTime"];
    const formattedTime = providedTime.format("HH:mm");
    values["OrderTime"] = formattedTime;

    //-------------------------------Order data that we want to update with --------------------------//
    const OrderData = {
      id: id,
      CustomerName: values.CustomerName,
      Contact: values.Contact,
      CustomerEmail: values.CustomerEmail,
      NoOfMembers: values.NoOfMembers,
      OrderDate: values.OrderDate,
      OrderTime: values.OrderTime,
      PaymentMode: values.PaymentMode,
    };

    try {
      dispatch(updateOrderDetails({ OrderData }));
      navigate("/viewAllOrder");
    } catch (error) {
      alert("Error While Updating..");
    }
  };

  return (
    <div>
      <Layout className="container-fluid">
        <div className="col-md-12 d-flex justify-content-center ">
          <Card className="card mt-5 w-75 h-100 bg-body-secondary">
            <div className="row d-flex justify-content-center">
              <h3 className="mt-3 text-success border-success border-bottom fw-bolder mb-3">
                Update Order Details
              </h3>

              <ConfigProvider
                theme={{ token: { fontSize: 18, colorText: "black" } }}
              ></ConfigProvider>

              <Form
                name="myForm"
                onFinish={onFinish}
                form={form}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 10 }}
                layout="horizontal"
                style={{
                  maxWidth: 700,
                }}
              >
                <Form.Item
                  label="Customer Name"
                  name="CustomerName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Name!",
                    },
                  ]}
                >
                  <Input placeholder="john123" />
                </Form.Item>

                <Form.Item
                  label="Contact"
                  name="Contact"
                  rules={[
                    {
                      required: true,
                      message: "Contact is Must!",
                    },
                    {
                      pattern: /^[0-9]{10,10}$/,
                      message: "Input Only Numbers(It Should be 10 digits)",
                    },
                  ]}
                >
                  <Input placeholder="0000000000" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="CustomerEmail"
                  rules={[
                    {
                      type: "email",
                      message: "Enter Valid Format of Email",
                    },
                  ]}
                >
                  <Input placeholder="abc123@gmail.com" />
                </Form.Item>

                <Form.Item
                  label="Number of Members"
                  name="NoOfMembers"
                  rules={[
                    {
                      required: true,
                      message: "Enter No. of memebers",
                    },
                  ]}
                >
                  <InputNumber min="1" />
                </Form.Item>

                <Form.Item
                  label="Order Date"
                  name="OrderDate"
                  rules={[
                    {
                      required: true,
                      message: "Please input!",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="YYYY-MM-DD"
                    disabledDate={(current) =>
                      current && current < moment().startOf("day")
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Order Time"
                  name="OrderTime"
                  rules={[
                    {
                      required: true,
                      message: "Please input!",
                    },
                  ]}
                >
                  <TimePicker
                    placeholder="HH:MM"
                    disabled={false} // Set to true to disable the TimePicker
                    {...disabledPastTime()}
                    format={"HH:mm"}
                  />
                </Form.Item>

                <Form.Item
                  label="Payment mode"
                  name="PaymentMode"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Your Payment Mode",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="cash"> cash </Radio>
                    <Radio value="online"> online </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item className="confirmOrder btn btn-success fs-5">
                  <Button htmlType="submit">Edit Details</Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </div>
      </Layout>
    </div>
  );
};

export default EditCustomerDetails;
