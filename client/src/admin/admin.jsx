import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "./Sidebar";
import Dashboard from "./dashboard";
import Home from "./home";
import Organization from "./organization";
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
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Mock fetch function to simulate fetching articles from an API
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://hearthand.onrender.com/api/v1/blogs"
        );
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    fetchArticles();
  }, []);

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
                <Home articles={articles} Toggle={Toggle} />
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

  // return (
  //   <div className="container-fluid bg-secondary min-vh-100">
  //     <div className="row">
  //       {toggle && (
  //         <div className="col-2 bg-white vh-100">
  //           <Sidebar selectPage={selectPage} />
  //         </div>
  //       )}
  //       <div className="col">
  //         {activePage === "Dashboard" && <Dashboard Toggle={Toggle} />}
  //         {activePage === "Home" && (
  //           <Home articles={articles} Toggle={Toggle} />
  //         )}
  //         {activePage === "Organization" && <Organization Toggle={Toggle} />}
  //         {activePage === "Donation" && <Donation Toggle={Toggle} />}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (<>{authCheck()}</>);
};

export default Admin;
