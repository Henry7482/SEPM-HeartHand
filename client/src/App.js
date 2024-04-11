import logo from './logo.svg';
import './App.css';
import Footer from './footer/footer.tsx';
import Header from './header/header.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <BrowserRouter>
      <Routes>
        <Route path="/footerTest" element={<Footer />} />
        <Route path="/headerTest" element={<Header />} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
