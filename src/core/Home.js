import React, { useState, useEffect } from "react";
import "../styles.css";

import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProduct } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProduct().then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base
      title="Home Page"
      description="Welcome to the most popular T - Shirt store"
    >
      <div className="row text-center">
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
