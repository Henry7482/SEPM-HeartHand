import React from "react";
import "./blog.css";
import Donate from "../blogPage/donatebox";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useParams } from "react-router-dom";

const BlogPage = ({ blogs }) => {
  const { blogId } = useParams();
  // Find the blog with the matching ID
  const blog = blogs.find((blog) => blog._id === blogId);
  // Placeholder for background image and article details
  const backgroundImage = "https://via.placeholder.com/1920x1080";
  const article = {
    title: blog.title,
    content: blog.content,
    readers: 100,
  };

  console.log("Blog: ", blog);

  return (
    <div className="blog-page">
      <Header />
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="detail-box">
          <h1>{article.title}</h1>
          <hr />
          <p>{article.content}</p>
          <hr />
          <p>{article.readers} people have read this article</p>
        </div>
        <Donate />
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
