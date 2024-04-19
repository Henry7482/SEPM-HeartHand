import "./App.css";
import Footer from "./footer/footer.jsx";
import Header from "./header/header.jsx";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Body from "./body/body.jsx";
import HomePage from "./homePage/homePage.jsx";
import Donate from "./blogPage/donatebox.jsx";
import Blog from "./blogPage/blog.jsx";
import React, { useState, useEffect } from "react";

function App() {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);

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
        console.log("Data from server:" + JSON.stringify(jsonData));
      } catch (err) {
        setError(err.message);
        console.log("Error from server:" + error);
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
  }

  return (
    <div className="App">
      <BrowserRouter>
      {/* Call out function */}
      {/* {displayBlogs(blogs)} */}
        <Routes>
          <Route path="/footerTest" element={<Footer />} />
          <Route path="/bodyTest" element={<Body />} />
          <Route path="/headerTest" element={<Header />} />
          <Route path="/homeTest" element={<HomePage blogs={blogs}/>} />
          <Route path="/donateTest" element={<Donate />} />
                                              {/* !!Pass in blogs value for Blog page to read */}
          <Route path="/blogTest/:blogId" element={<Blog blogs={blogs} />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
