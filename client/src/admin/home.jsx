import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useAuthContext } from "../hooks/useAuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSessionReset } from "../hooks/useSessionReset";

function Home({ Toggle }) {
  const [generatedBlogs, setGeneratedBlogs] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { user } = useAuthContext();
  const { resetSession } = useSessionReset();

  useEffect(() => {
    const fetchGeneratedBlogs = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.log("Access token not found. Please login again.");
        return;
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

        if (response.status === 401) {
          resetSession();
        }

        const jsonData = await response.json();

        if (!response.ok) {
          console.log("Failed to fetch data from server");
          return;
        }
        setGeneratedBlogs(jsonData);
        console.log(
          "Generated Blogs Data from server:",
          JSON.stringify(jsonData)
        );
      } catch (err) {
        console.error("Error from server:", err.message);
      }
    };

    if (user && user.role === "admin") {
      fetchGeneratedBlogs();
    }

    if (deleteClicked) {
      setDeleteClicked(false);
    }
  }, [user, deleteClicked, generating]);

  const handleImageChange = (articleId, event) => {
    const file = event.target.files[0];
    setSelectedImage((prev) => ({ ...prev, [articleId]: file }));
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleAccept = async (blogListId, blog, image) => {
    if (!image) {
      image = "";
    }
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Access token not found. Please login again.");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage[blog._id]);
    formData.append("title", blog.title);
    formData.append("shortform", blog.shortform);
    formData.append("content", blog.content);
    formData.append("date", blog.date);
    formData.append("tags", blog.tags);
    formData.append("references", blog.references);
    try {
      const response = await fetch(
        "https://hearthand.onrender.com/api/v1/blogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (response.status === 401) {
        resetSession();
      }
  
      const jsonData = await response.json();
    
      if (!response.ok) {
        console.log("Network response was not ok", jsonData.message);
        return;
      }
      console.log("Created blog successfully:", JSON.stringify(jsonData));
      alert("Blog created successfully");
      handleDelete(blogListId, blog._id);
    } catch (err) {
      console.error("Error from server:", err.message);
      alert("Error in creating blog ", err.message);
    }
  };

  const handleDelete = async (blogListId, blogId) => {
    setDeleteClicked(true);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Access token not found. Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `https://hearthand.onrender.com/api/v1/generatedblogs/${blogListId}-${blogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 401) {
        resetSession();
      }

      const jsonData = await response.json();
      
      if (!response.ok) {
        console.log("Network response was not ok", jsonData.message);
        setDeleteClicked(false);
        return;
      }
      console.log(
        "Deleted generated blog successfully:",
        JSON.stringify(jsonData)
      );
      alert("Blog deleted successfully");
      setDeleteClicked(false);

    } catch (err) {
      console.error("Error from server:", err.message);
      alert("Error in deleting blog ", err.message);
      setDeleteClicked(false);
    }
  };

  const handleGenerateBlogs = async () => {
    setGenerating(true);
    try {
      const response = await fetch(
        "https://sepm-hearthand-production-0a81.up.railway.app/generateblogs",
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          // body: JSON.stringify({}),
        }
      );

      const jsonData = await response.json();
      if (!response.ok) {
        console.log("Network response was not ok", jsonData.message);
        return;
      }
      console.log("Generated blogs successfully:", JSON.stringify(jsonData));
      alert("Generated blogs successfully");
      setGenerating(false);
    } catch (err) {
      console.error("Error from server:", err.message);
      alert("Error in generating blogs ", err.message);
      setGenerating(false);
    }
  };

  const displaygeneratedBlogs = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const reversedData = [...data].reverse();
      return reversedData.map(
        (item) =>
          item.data &&
          item.data.map((blog) => (
            <div key={blog._id} className="article-container my-3 p-3 bg-light">
              <h2>{blog.title}</h2>
              <p>
                <i>{blog.shortform}</i>
              </p>
              <p>Date Published: {formatDate(blog.date)}</p>
              <p>Tags: {blog.tags.join(", ")}</p>
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
                onClick={() =>
                  handleAccept(item._id, blog, selectedImage[blog._id])
                }
                className="btn btn-success"
              >
                Accept
              </button>
              <button
                onClick={() => handleDelete(item._id, blog._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))
      );
    } else {
      return <h1>Loading...</h1>;
    }
  };

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <div className="col-12">
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={handleGenerateBlogs} disabled={generating}>
            Generate new blogs
          </button>
          {generating && (
            <div className="spinner-border text-primary" role="status"></div>
          )}
        </div>
      </div>
      <div className="container-fluid">
        {displaygeneratedBlogs(generatedBlogs)}
      </div>
    </div>
  );
}

export default Home;
