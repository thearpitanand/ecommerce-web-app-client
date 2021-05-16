import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { createOrder } from "./helper/orderHelper";
import { API } from "../backend";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let price = 0;
    if (products && products.length > 0) {
      products.map((product) => {
        price += product.price * product.count;
      });
    }
    return price;
  };
  const makeStripePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);

        // Todo: Create Order

        const { status } = response;
        console.log(status);
        cartEmpty(() => {
          console.log("CART EMPTY SUCCESSFULLY");
        });

        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };
  const showStripeCheckOut = () => {
    return products && products.length > 0 ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_STRIPE_PAYMENT_PUBLIC_KEY}
        token={makeStripePayment}
        amount={getFinalPrice() * 100}
        name="Buy T-Shirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success rounded btn-block">Buy Now</button>
      </StripeCheckoutButton>
    ) : (
      <p>Add Something in your cart</p>
    );
  };

  return (
    <div
      style={{ display: isAuthenticated() ? "" : "none" }}
      className="alert alert-primary"
    >
      <h3 className="alert-heading">Stripe: </h3>
      {showStripeCheckOut()}
    </div>
  );
};
export default StripeCheckout;
