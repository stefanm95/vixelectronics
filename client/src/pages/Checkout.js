import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
  getUserAddress,
} from "../functions/user";
import "react-quill/dist/quill.snow.css";
import { Card, Button, Input, Typography, Row, Col, notification } from "antd";
const { TextArea } = Input;
const { Title } = Typography;

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
    loadUserAddress();
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const loadUserAddress = async () => {
    try {
      console.log("user token: ", user.token);
      const res = await getUserAddress(user.token);
      console.log(`response:`, res);
      if (res.data) {
        setAddress(res.data.address);
        setAddressSaved(true);
      }else {
        setAddressSaved(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Title level={4}>Delivery Address</Title>
        <Card>
          <TextArea
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button type="primary" className="mt-2" onClick={saveAddressToDb}>
            Save
          </Button>
        </Card>

        <Title level={4} className="mt-4">
          Got Coupon?
        </Title>
        <Card>
          <Input
            onChange={(e) => {
              setCoupon(e.target.value);
              setDiscountError("");
            }}
            value={coupon}
            type="text"
          />
          <Button type="primary" className="mt-2" onClick={applyDiscountCoupon}>
            Apply
          </Button>
        </Card>
        {discountError && notification.error({ message: discountError })}
      </Col>

      <Col span={12}>
        <Title level={4}>Order Summary</Title>
        <Card>
          <p>Products {products.length}</p>
          {showProductSummary()}
          <hr />
          <p>Cart Total: ${total}</p>

          {totalAfterDiscount > 0 && (
            <p className="text-success">
              Discount Applied: Total Payable: ${totalAfterDiscount}
            </p>
          )}

          <Row gutter={16} className="mt-4">
            <Col span={12}>
              {COD ? (
                <Button
                  type="primary"
                  disabled={!addressSaved}
                  onClick={createCashOrder}
                >
                  Place Order
                </Button>
              ) : (
                <Button
                  type="primary"
                  disabled={!addressSaved || !products.length}
                  onClick={() => history.push("/payment")}
                >
                  Place Order
                </Button>
              )}
            </Col>

            <Col span={12}>
              <Button
                type="danger"
                disabled={!products.length}
                onClick={emptyCart}
              >
                Empty Cart
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Checkout;
