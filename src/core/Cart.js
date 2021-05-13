import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>Products</h2>
        <div className="row mt-4">
          {products.map((product, index) => (
            <div key={index} className="col-md-6 mb-3">
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
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckOut()}</div>
      </div>
    </Base>
  );
};

export default Cart;
