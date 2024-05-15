import "./App.css";
import Footer from "./footer/footer.jsx";
import SignUp from "./signupauthentication/SignUp.jsx";
import Header from "./header/header.jsx";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./homePage/HomePage.jsx";
import Donatebox from "./blogPage/donatebox.jsx";
import Blog from "./blogPage/Blog.jsx";
import React, { useState, useEffect } from "react";
import Admin from "./admin/Admin.jsx";
import DonorLogin from "./loginfordonors/DonorLogin.jsx";
import CheckoutPage from "./shipping/shipping.jsx";
import AdminLogin from "./login/AdminLogin.jsx";
import AboutUs from "./aboutus/aboutus.jsx";
import Organization from "./Organization/donororganization.jsx";
import Donation from "./Donation/donation.jsx";

import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hearthand.onrender.com/api/v1/blogs"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setBlogs(jsonData);
        console.log("Data from server:", JSON.stringify(jsonData));
      } catch (err) {
        setError("Failed to load blogs: " + err.message);
        console.error("Error from server:", err.message);
      }
    };

    fetchData();
  }, []);

  // Function to display blogs
  const displayBlogs = (data) => {
    if (data) {
      return data.map((item, index) => (
        <Link to={`/blogTest/${item._id}`}>
          <div key={index}>
            <h1>{item._id}</h1>
            <p>{item.content}</p>
          </div>
        </Link>
      ));
    } else {
      return <h1>Loading...</h1>;
    }
  };

  const handleRequest = async () => {
    try {
      // Get access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }
      // Make authorized request to backend API
      const response = await fetch("http://localhost:8080/secret", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseData = await response.json();
      console.log("Data from backend:", JSON.stringify(responseData));
      alert("Data from backend:" + JSON.stringify(responseData));
    } catch (err) {
      console.log("Error from backend:", err.message);
    }
  };

  console.log(user && user.role === "admin");
  return (
    <div className="App">
      <BrowserRouter>
        {/* Call out function */}
        {/* {displayBlogs(blogs)} */}
        {/* <button onClick={handleRequest}>Request to secret page</button> */}
        <Routes>
          <Route path="/footerTest" element={<Footer />} />
          <Route path="/headerTest" element={<Header />} />
          {/* <Route path="/donateTest" element={<DonateBox />} /> */}
          <Route path="/blogTest/:blogId" element={<Blog blogs={blogs} />} />
          <Route path="/footerTest" element={<Footer />} />
          <Route
            path="/authenticationTest"
            element={!user ? <SignUp /> : <Navigate to="/homeTest" />}
          />
          <Route
            path="/authentication1Test"
            element={!user ? <DonorLogin /> : <Navigate to="/homeTest" />}
          />
          <Route
            path="/adminTest"
            element={
              user && user.role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/authentication1Test" />
              )
            }
          />

          <Route path="/footer" element={<Footer />} />
          <Route path="/header" element={<Header />} />
          <Route path="/home" element={<HomePage blogs={blogs} />} />
          <Route path="/donate" element={<Donatebox />} />
          {/* !!Pass in blogs value for Blog page to read */}
          <Route path="/blogTest/:blogId" element={<Blog blogs={blogs} />} />
          <Route path="/footer" element={<Footer />} />
          <Route
            path="/SignUp"
            element={!user ? <SignUp /> : <Navigate to="/home" />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/DonorLogin"
            element={!user ? <DonorLogin /> : <Navigate to="/home" />}
          />
          <Route path="/shipping" element={<CheckoutPage />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Organization" element={<Organization />} />
          <Route path="/Donation" element={<Donation />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
