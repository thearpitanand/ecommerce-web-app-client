import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategories, getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preloadCategories = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preloadCategories();
  }, []);

  const deleteCategoriesOnClick = (userId, token, categoryId) => {
    deleteCategories(userId, token, categoryId)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories([]);
          preloadCategories();
        }
      })
      .catch();
  };

  return (
    <Base title="Welcome admin" description="Manage categories here">
      <Link className="btn btn-info mb-2" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-2">All Category:</h2>
      <h3 className="text-center text-white my-3">
        Total {categories.length} Categories
      </h3>
      <div className="row">
        <div className="col-12">
          {categories.map((category, index) => (
            <div className="row text-center mb-2 " key={index}>
              <div className="col-4">
                <h3 className="text-white text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteCategoriesOnClick(user._id, token, category._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
