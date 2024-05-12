import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./homePage.css";
import Homepage from "../assets/image.png";
import Blogdetail from "../assets/image copy.png"

const HomePage = ({ blogs = [] }) => {

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  const displayBlogs = (data) => {
    if (Array.isArray(data)) {
      return data.map((item, index) => (
        <Link to={`/blogTest/${item._id}`} key={index} className="block-link">
          <div className="blog-detail">
            <img src={Blogdetail} alt="Home" className="news-picture" />
            <div className="blog-content">
              <h2>{item.title}</h2>
              <p><i>{item.shortform}</i></p>
              <p><i>{formatDate(item.date)}</i></p> {/* Using formatDate here */}
            </div>
          </div>
        </Link>
      ));
    } else {
      return <h1>Loading...</h1>;
    }
  }

  return (
    <>
      <Header />
      <div className="body-container">

      <div className='container-fluid position-relative'>
        {/* Image background */}
        <img src={Homepage} className="img-fluid" alt="Homepage" style={{width:"100%"}}/>

        <div className="card text-bg position-absolute" style={{ top: "100%", left: "20%", transform: "translate(-50%, -50%)", maxWidth: "30rem", zIndex: "1" }}>
          <div className="bg-black p-2 text-white"style={{fontSize: "40px", fontStyle:"italic"}}>Latest News</div>
          <div className="bg-black p-2 text-white" style={{opacity: "0.7"}}>
            <p className="card-text"style={{fontSize: "17px", fontStyle:"italic"}}>Get the perspective and insights that improve the lives for people in our nation </p>
          </div>
        </div>
      </div>       




        {displayBlogs(blogs)}


      </div>
      <Footer />
    </>
  );
}

export default HomePage;
