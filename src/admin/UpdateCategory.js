import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategoryById, updateCategory } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  // Preload of Category Name
  const preloadCategoryData = (categoryId) => {
    getCategoryById(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preloadCategoryData(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // Backend Request
    updateCategory(user._id, match.params.categoryId, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const adminPageLink = () => {
    return (
      <div>
        <Link
          className="btn btn-sm btn-info mt-4 rounded"
          to="/admin/dashboard"
        >
          Admin Dashboard
        </Link>
      </div>
    );
  };

  const message = () => {
    if (success) {
      return (
        <h4 className="text-success pt-4">Category Successfully Updated</h4>
      );
    } else if (error) {
      return <h4 className="text-danger pt-4">Failed To Create Category</h4>;
    } else {
      return;
    }
  };

  const updateForm = () => (
    <form>
      <div className="form-group pt-4 pb-2 rounded">
        <p className="lead">Update Category</p>
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
          Update Category
        </button>
      </div>
    </form>
  );
  return (
    <Base
      title="Update Category"
      description="Welcome Admin you can update your category hear."
      className="container bg-success p-4 rounded"
    >
      <div className="row bg-white rounded m-2">
        <div className="col-md-8 offset-md-2">
          {adminPageLink()}
          {message()}
          {updateForm()}
        </div>
      </div>
    </Base>
  );
};
export default UpdateCategory;
