import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getCategories } from "./helper/adminapicall";

const AddProduct = () => {
  const history = new useHistory();
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
        }
      })
      .catch();
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          stock: "",
          price: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
          getRedirect: true,
        });
      }
    });
  };

  const redirectToAdminDashBoard = () => {
    if (getRedirect) {
      setTimeout(() => {
        return history.push("/admin/dashboard");
      }, 3000);
    }
  };

  const successMessage = () => (
    <div
      className="alert alert-success"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <p>{createdProduct} Created Successfully.</p>
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      <p>{error} - Unsuccessfully Creation</p>
    </div>
  );

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="First Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories.map((cate, index) => (
            <option key={index} value={cate._id}>
              {cate.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add Product"
      description="Create New Products"
      className="container bg-success p-4 rounded"
    >
      <Link
        to="/admin/dashboard"
        className="btn btn-sm btn-dark mt-2 mb-3 rounded"
      >
        Admin Dashboard
      </Link>
      <div className="row bg-dark text-white rounded m-1">
        <div className="col-md-8 offset-md-2 pt-4 pb-4">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
          {redirectToAdminDashBoard()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
