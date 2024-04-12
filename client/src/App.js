import "./App.css";
import Footer from "./footer/footer.tsx";
import Header from "./header/header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./body/body.tsx";
import HomePage from "./homePage/homePage.tsx";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
