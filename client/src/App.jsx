import "./App.css";
import Footer from "./footer/footer.jsx";
import Header from "./header/header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./body/body.jsx";
import HomePage from "./homePage/homePage.jsx";
import Donate from "./blogPage/donatebox.jsx";
import Blog from "./blogPage/blog.jsx";
import React, { useState, useEffect } from "react";


function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/test');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData);
        console.log("data from server:" + JSON.stringify(data))
      } catch (err) {
        setError(err.message);
      } 
    
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/footerTest" element={<Footer />} />
          <Route path="/bodyTest" element={<Body />} />
          <Route path="/headerTest" element={<Header />} />
          <Route path="/homeTest" element={<HomePage />} />
          <Route path="/donateTest" element={<Donate />} />
          <Route path="/blogTest" element={<Blog/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
