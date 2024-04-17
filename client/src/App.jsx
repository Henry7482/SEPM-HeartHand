import "./App.css";
import Footer from "./footer/footer.jsx";
import Header from "./header/header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./body/body.jsx";
import HomePage from "./homePage/homePage.jsx";
import Donate from "./blogPage/donatebox.jsx";
import Blog from "./blogPage/blog.jsx";
import React from "react"

function App() {
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
