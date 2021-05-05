import React, { useState } from "react";

import Base from "../core/Base";

import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { firstName, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ firstName, email, password })
      .then((data) => {
        if (data.errors) {
          const errorSendBackend = [];
          data.errors.forEach((element) => {
            errorSendBackend.push(element.msg);
          });

          setValues({ ...values, error: errorSendBackend, success: false });
        } else {
          setValues({
            ...values,
            firstName: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error In Signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row singForm">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">First Name</label>
              <input
                className="form-control"
                onChange={handleChange("firstName")}
                type="text"
                placeholder="Enter Your First Name"
                value={firstName}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                placeholder="Enter your Email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account Created.<Link to="/signin">Log In</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error[0]}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up Page" description="A page for user to sign up!">
      {errorMessage()}
      {successMessage()}
      {signUpForm()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
