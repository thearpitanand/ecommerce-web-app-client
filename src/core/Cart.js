import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import "../styles.css";
import Base from "./Base";
import BrainTreePayment from "./BrainTreePayment";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const getFinalPrice = () => {
    let price = 0;
    if (products && products.length > 0) {
      products.map((product) => {
        price += product.price * product.count;
      });
    }
    return price;
  };

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>Products</h2>
        <div className="row mt-4">
          {products.map((product, index) => (
            <div key={index} className="col-md-4 mb-3">
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addToCart={false}
                setReload={setReload}
                reload={reload}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  const loadCheckOut = () => {
    return (
      <div>
        <h2>This Section for check out</h2>
      </div>
    );
  };

  return (
    <Base
      title="Cart Page"
      description="Buy the T-Shirt as soon as offer goes off"
    >
      <div className="row">
        <div className="col-8">
          {products && products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h2 className="text-white">No Products in Cart</h2>
          )}
        </div>
        <div className="col-4">
          <h2 className="text-white">Total Amount: {getFinalPrice()}$</h2>

          <StripeCheckout products={products} setReload={setReload} />
          <BrainTreePayment products={products} setReload={setReload} />

          {isAuthenticated() ? (
            <div></div>
          ) : (
            <Link to="/signin">
              <button className="btn btn-block rounded btn-outline-success">
                SignIn
              </button>
            </Link>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
