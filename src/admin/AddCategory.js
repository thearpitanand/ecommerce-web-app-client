import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const history = new useHistory();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div>
      <Link className="btn btn-sm btn-info mt-2 rounded" to="/admin/dashboard">
        Admin Dashboard
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //Backend Request
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
        }
      })
      .catch();
  };

  const redirectToAdminDashBoard = () => {
    setTimeout(() => {
      return history.push("/admin/dashboard");
    }, 3000);
  };

  const successMessage = () => {
    if (success) {
      return (
        <div>
          <h4 className="text-success pt-4">
            Category is Successfully Created
          </h4>
          {redirectToAdminDashBoard()}
        </div>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger pt-4">Failed To Create Category</h4>;
    }
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group pt-4 pb-2 rounded">
          <p className="lead">Create New Category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder='Ex: "Summer"'
          />
          <button onClick={onSubmit} className="btn btn-outline-info rounded">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create Category"
      description="Add New Category for the Products"
      className="container bg-success p-4 rounded"
    >
      <div className="row bg-white rounded m-2">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
