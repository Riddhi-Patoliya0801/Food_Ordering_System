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
import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart, showMyOrderCart } from "../Reducers/OrderCartReducer";
import { addOrder } from "../Reducers/OrderReducer";
import moment from "moment";

const CustomerDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //----------------For Adding OrderCart Items to Order Detail-----------------------//

    const OrderCart = useSelector((state) => state.OrderCart);

    useEffect(() => {
        MyOrderItems();
        TotalPrice();
    }, []);

    const MyOrderItems = async () => {
        const OrderCartItems = await axios.get(
            "http://localhost:5000/OrderCart/show"
        );
        const Items = OrderCartItems.data;
        dispatch(showMyOrderCart(Items));
    };

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

    //-------------------------calculate Grand Total--------------------------------//

    const [GrandTotal, setGrandTotal] = useState();

    const TotalPrice = async () => {
        const price = await axios.get(
            "http://localhost:5000/OrderCart/showTotalPrice"
        );
        calculate(price.data);
    };

    const calculate = (b) => {
        const newTotal = b.reduce((a, item) => {
            return parseInt(a) + parseInt(item.TotalPrice);
        }, 0);

        setGrandTotal(newTotal);
    };

    //-----------------------Add Order And Ordered Items------------------------//

    const onFinish = (values) => {
        const AddedItemsData =
            Array.isArray(OrderCart) &&
            OrderCart.map((d, index) => {
                const ItemCartData = {
                    ItemId: d.ItemId,
                    ItemName: d.ItemName,
                    ItemQuantity: d.ItemQuantity,
                    Total: d.TotalPrice,
                };

                return ItemCartData;
            });

        //------------Format Date-------------

        const dateString = values["OrderDate"];
        const dateObject = new Date(dateString);
        let formattedDate = dateObject.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });

        const parts = formattedDate.split("/");
        const dateObjectCorrect = new Date(
            `${parts[2]}-${parts[1]}-${parts[0]}`
        );
        formattedDate = dateObjectCorrect.toISOString().split("T")[0];
        values["OrderDate"] = formattedDate;

        //------------Format Time-------------

        let providedTime = values["OrderTime"];
        const formattedTime = providedTime.format("HH:mm");
        values["OrderTime"] = formattedTime;

        //------------------Order Details

        const OrderData = {
            CustomerName: values.CustomerName,
            Contact: values.Contact,
            CustomerEmail: values.CustomerEmail,
            NoOfMembers: values.NoOfMembers,
            OrderDate: values.OrderDate,
            OrderTime: values.OrderTime,
            Items: AddedItemsData,
            GrandTotal: GrandTotal,
            PaymentMode: values.PaymentMode,
        };

        try {
            dispatch(addOrder({ OrderData }));
            dispatch(clearCart());
            navigate("/viewAllOrder");
        } catch (error) {
            alert("Error while placing Order..");
        }
    };

    return (
        <div>
            <Layout className="container-fluid">
                <div className="col-md-12 d-flex justify-content-center ">
                    <Card className="card mt-5 w-75 h-100 bg-body-secondary">
                        <div className="row d-flex justify-content-center">
                            <h3 className="mt-3 text-success border-success border-bottom fw-bolder mb-3">
                                Add Order Details
                            </h3>

                            <ConfigProvider
                                theme={{
                                    token: { fontSize: 18, colorText: "black" },
                                }}
                            ></ConfigProvider>

                            <Form
                                name="myForm"
                                onFinish={onFinish}
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
                                            message:
                                                "Input Only Numbers(It Should be 10 digits)",
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
                                            message:
                                                "Enter Valid Format of Email",
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
                                            current &&
                                            current < moment().startOf("day")
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
                                            message:
                                                "Please Select Your Payment Mode",
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="cash"> cash </Radio>
                                        <Radio value="online"> online </Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item className="confirmOrder btn btn-success fs-5">
                                    <Button htmlType="submit">
                                        Place Order
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Card>
                </div>
            </Layout>
        </div>
    );
};

export default CustomerDetails;
