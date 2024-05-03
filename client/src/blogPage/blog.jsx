import React from "react";
import "./blog.css";
import Donate from "./Donatebox";
import Header from "../header/Header";
import Footer from "../footer/footer";
import { useParams } from "react-router-dom";
import Blogdetail from "../assets/image copy.png";

const BlogPage = ({ blogs }) => {
  const { blogId } = useParams();

  // Find the blog with the matching ID
  const blog = blogs.find((blog) => blog._id === blogId);

  if (!blog) {
    return <div>Loading...</div>; // Or display some error message or redirect
  }

  // Placeholder for background image
  const backgroundImage = blog.image || "https://via.placeholder.com/1920x1080";

  return (
    <div className="blog-page">
      <Header />
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="detail-box">
          <h1>{blog.title}</h1>
          <hr />
          <p>{100} people have read this article</p>
        </div>
        <Donate />
      </div>

      <div className="article-content">
        <h1>{blog.title}</h1>
        <div className="image-container">
          <img src={Blogdetail} alt="Home" className="news-picture" />
        </div>
        <p>{blog.content}</p>
        <p>References: {blog.references}</p>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
