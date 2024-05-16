import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useAuthContext } from "../hooks/useAuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ handleDelete, Toggle }) {
  const [generatedBlogs, setGeneratedBlogs] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchGeneratedBlogs = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }
      try {
        const response = await fetch(
          "https://hearthand.onrender.com/api/v1/generatedblogs",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const jsonData = await response.json();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setGeneratedBlogs(jsonData);
        console.log("Generated Blogs Data from server:", JSON.stringify(jsonData));
      } catch (err) {
        console.error("Error from server:", err.message);
      }
    };

    if (user && user.role === "admin") {
      fetchGeneratedBlogs();
    }
  }, [user]);

  const handleImageChange = (articleId, event) => {
    const file = event.target.files[0];
    setSelectedImage((prev) => ({ ...prev, [articleId]: file }));
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleAccept = async (blog, image) => {
    if (!image) {
      image ="";    
    }
    const fetchGeneratedBlogs = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }
    try {
      const response = await fetch("https://hearthand.onrender.com/api/v1/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ blog, image }),
      });

      if (!response.ok) {
        console.log("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log("Created blog successfully:", JSON.stringify(jsonData));
    } catch (err) {
      console.error("Error from server:", err.message);
      alert("Error in creating blog ", err.message);
    }
  }

  const displaygeneratedBlogs = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item) => (
        item.data && item.data.map((blog) => (
          <div key={blog._id} className="article-container my-3 p-3 bg-light">
            <h2>{blog.title}</h2>
            <p>
              <i>{blog.shortform}</i>
            </p>
            <p>Date Published: {formatDate(blog.date)}</p>
            <div className="mb-3">
              <input
                type="file"
                onChange={(e) => handleImageChange(blog._id, e)}
              />
              {selectedImage[blog._id] && (
                <img
                  src={URL.createObjectURL(selectedImage[blog._id])}
                  alt="Selected"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </div>
            <button
              onClick={() => handleAccept(blog._id, selectedImage[blog._id])}
              className="btn btn-success"
            >
              Accept
            </button>
            <button
              onClick={() => handleDelete(blog._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ))
      ));
    } else {
      return <h1>Loading...</h1>;
    }
  };

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <div className="container-fluid">
        {displaygeneratedBlogs(generatedBlogs)}
      </div>
    </div>
  );
}

export default Home;
