import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "./Sidebar";
import Dashboard from "./dashboard";
import Home from "./home";
import Organization from "./adminorganization";
import Donation from "./donor";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Admin = () => {
  const [toggle, setToggle] = useState(false);
  const { user } = useAuthContext();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [activePage, setActivePage] = useState("Dashboard"); // Default to Dashboard


  const selectPage = (page) => {
    setActivePage(page);
  };
  const authCheck = () => {
    if (user && user.role === "admin") {
      return (
        <div className="container-fluid bg-secondary min-vh-100">
          <div className="row">
            {toggle && (
              <div className="col-2 bg-white vh-100">
                <Sidebar selectPage={selectPage} />
              </div>
            )}
            <div className="col">
              {activePage === "Dashboard" && <Dashboard Toggle={Toggle} />}
              {activePage === "Home" && (
                <Home Toggle={Toggle} />
              )}
              {activePage === "Organization" && (
                <Organization Toggle={Toggle} />
              )}
              {activePage === "Donation" && <Donation Toggle={Toggle} />}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>You are not authorized to access this page.</h1>
          <Link to="/AdminLogin"> Please login via this page.</Link>
        </div>
      );
    }
  };

 

  return (<>{authCheck()}</>);
};

export default Admin;
