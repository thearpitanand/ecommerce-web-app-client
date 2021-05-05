import React from "react";
import "../styles.css";

import { API } from "../backend";
import Base from "./Base";

const Home = () => {
  console.log("API IS :", API);
  return (
    <Base title="Home Page" description="Welcome to the most popular T - Shirt store">
      <div className="row text-center">
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-warning">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-danger">TEST</button>
        </div>
      </div>
    </Base>
  );
};

export default Home;
