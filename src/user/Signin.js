import React, { useState } from "react";

import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

import { Link, Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    email: "anand.arpit2223@gmail.com",
    password: "1234567890",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.errors) {
          //Variable to Add error.
          const errorSendBackend = [];
          // Error message from API is in array formate.
          data.errors.forEach((element) => {
            errorSendBackend.push(element.msg);
          });
          console.log(errorSendBackend);
          setValues({ ...values, error: errorSendBackend, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Sign In Request Failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
                placeholder="Enter your Email!"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
                placeholder="Password"
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading....</h2>
        </div>
      )
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
    <Base title="Sign In Page" description="A page for user to signin!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
