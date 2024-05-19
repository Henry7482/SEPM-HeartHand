import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Draggable from "react-draggable";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

// Import logos if still needed for some default state
import hearthand from "../assets/logo.png";
import charity from "../assets/charity.png";
import rmitLogo from "../assets/RMIT-LOGO-project.jpg";
import { useSessionReset } from "../hooks/useSessionReset";

function Organization({ Toggle }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [addingOrganization, setAddingOrganization] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [newOrganization, setNewOrganization] = useState({
    name: "",
    phone_number: "",
    address: "",
    ward: "",
    district: "",
    province: "",
    email: "",
    website: "",
    imageURL: "",
  });
  const [organizations, setOrganizations] = useState([]);
  const { user } = useAuthContext();
  const { resetSession} = useSessionReset();

  useEffect(() => {
    const fetchOrganizations = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      try {
        const response = await fetch(
          "https://hearthand.onrender.com/api/v1/organizations",
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
          console.log("Network response was not ok", jsonData.message);
          return;
        }

        setOrganizations(jsonData);
        console.log(
          "Organizations Data from server:",
          JSON.stringify(jsonData)
        );
      } catch (err) {
        console.error("Error from server:", err.message);
      }
    };

    if (user && user.role === "admin") {
      fetchOrganizations();
    }
  }, [user, addingOrganization, deleteClicked]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrganization((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (organizationId, event) => {
    const file = event.target.files[0];
    setSelectedImage((prev) => ({ ...prev, [organizationId]: file }));
  };

  // const handleLogoChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setNewOrganization((prevState) => ({
  //       ...prevState,
  //       imageURL: reader.result,
  //     }));
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleCreateOrganization = async (e) => {
    e.preventDefault();
    setAddingOrganization(true);
    console.log(newOrganization);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Access token not found. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage[newOrganization._id]);
    formData.append("name", newOrganization.name);
    formData.append("phone_number", newOrganization.phone_number);
    formData.append("address", newOrganization.address);
    formData.append("ward", newOrganization.ward);
    formData.append("district", newOrganization.district);
    formData.append("province", newOrganization.province);
    formData.append("email", newOrganization.email);
    formData.append("website", newOrganization.website);


    try {
      const response = await fetch(
        "https://hearthand.onrender.com/api/v1/organizations",
        {
          method: "POST",
          headers: {
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
        console.log("Error from server:", jsonData);
        setAddingOrganization(false);
        return;
      }
      console.log("Organization created:", JSON.stringify(jsonData));
      alert("Organization created successfully");
      setAddingOrganization(false);
    } catch (err) {
      console.error("Error from server:", err.message);
      alert("Error in creating organization ", err.message);
      setAddingOrganization(false);
    }
  };

  const handleDelete = (organizationId) => {
    return async () => {
      setDeleteClicked(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("Access token not found. Please login again.");
        return;
      }

      try {
        const response = await fetch(
          `https://hearthand.onrender.com/api/v1/organizations/${organizationId}`,
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
          console.log("Error from server:", jsonData);
          setDeleteClicked(false);
          return;
        }
        console.log("Organization deleted:", JSON.stringify(jsonData));
        alert("Organization deleted successfully");
        setDeleteClicked(false);
      } catch (err) {
        console.error("Error from server:", err.message);
        alert("Error in deleting organization ", err.message);
        setDeleteClicked(false);
      }
    };
  };

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <div className="container-fluid" style={{ position: "absolute" }}>
        <div className="row mt-2">
          <div className="col-12">
            <div style={{ overflowX: "auto" }}>
              <Draggable axis="x">
                <div className="d-flex flex-nowrap">
                  {organizations.map((organization, index) => (
                    <a href={organization.website.startsWith('http://') || organization.website.startsWith('https://') ? organization.website : `http://${organization.website}`} style={{textDecoration: "none"}} target="_blank">                      <div
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
                          <button
                            className="btn btn-danger"
                            onClick={handleDelete(organization._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </Draggable>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "350px" }}>
        <div className="col-12">
          <div className="text-center mt-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              Create New Organization
            </button>
          </div>
        </div>
      </div>
      {showCreateForm && (
        <div className="row">
          <div className="col-12">
            <div className="mt-3 bg-white shadow-sm p-3 rounded">
              <form onSubmit={handleCreateOrganization}>
                <input
                  type="text"
                  name="name"
                  placeholder="Organization Name*"
                  value={newOrganization.name}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address*"
                  value={newOrganization.address}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="ward"
                  placeholder="Ward*"
                  value={newOrganization.ward}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="district"
                  placeholder="District*"
                  value={newOrganization.district}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="province"
                  placeholder="Province*"
                  value={newOrganization.province}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={newOrganization.email}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="website"
                  placeholder="Website*"
                  value={newOrganization.website}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="file"
                  name="logo"
                  onChange={(e) => handleImageChange(newOrganization._id, e)}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="phone_number"
                  placeholder="PhoneNumber*"
                  value={newOrganization.phone_number}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={addingOrganization}
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Organization;
