import React, { useEffect, useState } from "react";
import "./blog.css";
import Donate from "./donatebox";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useParams, Link } from "react-router-dom";
import Blogdetail from "../assets/image copy.png";
import Draggable from "react-draggable";

const BlogPage = () => {
  const [blog, setBlog] = useState({});
  const [organizations, setOrganizations] = useState([]);
  const { blogId } = useParams();

  const fecthBlog = async () => {
    try {
      const response = await fetch(
        "https://hearthand.onrender.com/api/v1/blogs/" + blogId
      );
      const jsonData = await response.json();

      if (!response.ok) {
        console.log("Network response was not ok", jsonData.message);
        return;
      }
      console.log("Fetched blog successfully:", JSON.stringify(jsonData));
      setBlog(jsonData.blog);
    } catch (err) {
      console.error("Error from server:", err.message);
    }
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch(
          "https://hearthand.onrender.com/api/v1/organizations"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setOrganizations(jsonData);
        console.log(
          "Organizations Data from server:",
          JSON.stringify(jsonData)
        );
      } catch (err) {
        console.error("Error from server:", err.message);
      }
    };
    fetchOrganizations();
    fecthBlog();
  }, []);

  if (!blog) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="blog-page">
        <Header />
        <div className="background-image">
          <img
            src={
              blog &&
              blog.imageURL &&
              blog.imageURL.startsWith("https://res.cloudinary.com/")
                ? blog.imageURL
                : Blogdetail
            }
            alt="blog image"
            style={{ width: "100%", objectFit: "cover" }}
          />
          <div className="detail-box">
            <h1>{blog.title}</h1>
          </div>
        </div>
        <div style={{ position: "relative", minHeight: "100%" }}>
          <div className="article-content">
            <div className="image-container" style={{ paddingTop: "2rem" }}>
              <img
                src={
                  blog &&
                  blog.imageURL &&
                  blog.imageURL.startsWith("https://res.cloudinary.com/")
                    ? blog.imageURL
                    : Blogdetail
                }
                alt="Home"
                className="news-picture-blog"
              />
            </div>
            <p>{blog.content}</p>
            <div className="organizations" style={{ marginTop: "5rem" }}>
              <h3>
                <strong>Who can help:</strong>
              </h3>
              <Draggable axis="x">
                <div className="d-flex flex-nowrap">
                  {organizations.map((organization, index) => (
                    <div
                      key={index}
                      className="card shadow-sm bg-white rounded m-2"
                      style={{
                        minWidth: "300px",
                        maxWidth: "400px",
                        minHeight: "310px",
                      }}
                    >
                      <img
                        src={organization.imageURL}
                        alt={organization.name}
                        width="100"
                        height="100"
                        className="card-img-top"
                        style={{ objectFit: "contain" }}
                      />

                      <div className="card-body">
                        <h5 className="card-title fs-4">{organization.name}</h5>
                        <p class="card-text">
                          {`${organization.ward} - ${organization.district} - ${organization.province}`}
                        </p>
                        <p class="card-text">{organization.email}</p>
                        <Link to="/shipping" target="_blank">
                          <button
                            className="btn btn-success"
                            style={{ marginRight: "0.5rem" }}
                          >
                            Donate now
                          </button>
                        </Link>
                        <Link
                          to={
                            organization.website.startsWith("http://") ||
                            organization.website.startsWith("https://")
                              ? organization.website
                              : `http://${organization.website}`
                          }
                          target="_blank"
                        >
                          <button className="btn btn-secondary">
                            Visit website
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Draggable>
            </div>
            <p>
              <strong>References:</strong>
            </p>
            {blog.references &&
              blog.references.map((reference, index) => (
                <p key={index}>
                  <a
                    href={
                      reference.startsWith("http://") ||
                      reference.startsWith("https://")
                        ? reference
                        : `http://${reference}`
                    }
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {reference}
                  </a>
                </p>
              ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default BlogPage;
