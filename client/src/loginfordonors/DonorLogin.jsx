import React, { useState } from "react";
import "./loginfordonor.css";

import user_icon from "../assets/usericon.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const DonorLogin = () => {
  // State variables to hold username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Donor Login");
    await login(username, password, "donor");
  };

  return (
    // <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      {" "}
                      Log In
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            {" "}
                            Username
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            {" "}
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <Link to="/SignUp" style={{textDecoration: "none"}}>Don't have an account? Sign Up</Link>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-lg"
                          disabled={isLoading}
                        >
                          Log In
                        </button>
                        {isLoading && <div className="spinner-border text-primary" role="status"></div>}
                      </div>
                      {error && (
                          <div className="error alert alert-danger text-center mt-4">
                            {error}
                          </div>
                        )}
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </section>
  );
};

export default DonorLogin;
