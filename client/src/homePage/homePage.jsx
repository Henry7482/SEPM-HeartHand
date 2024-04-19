import React from "react";
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import { Link } from "react-router-dom";
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
        <Link to={`/blogTest/${item._id}`} key={index}>
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
        <div className="page-name">
          <h2>Latest News</h2>
          <p className="italic-line">Get the perspective and insights that improve the lives for people in our nation</p>
        </div>
        <div className="home-page">
          <img src={Homepage} alt="Home" className="home-picture" />
        </div>
        {displayBlogs(blogs)}
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
