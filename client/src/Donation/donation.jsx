import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import Donate from "../assets/donate.jpg";
import Children from "../assets/children.jpg";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Link } from "react-router-dom";
import { useSessionReset } from "../hooks/useSessionReset.js";
function Donation() {
  const [donations, setDonations] = useState([]);
  const { user } = useAuthContext();
  const [isDeleting, setIsDeleting] = useState(true);
  const { resetSession } = useSessionReset();

  const getDonationStatus = async (donations) => {
    console.log("Getting donation status");
    const updatedDonors = [];

    for (let i = 0; i < donations.length; i++) {
      const donor = donations[i];
      // console.log("Donor:", donor);
      try {
        const response = await fetch(
          "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
            },
            body: JSON.stringify({ order_code: donor.order_code }),
          }
        );

        if (response.status === 401) {
          resetSession();
        }

        const data = await response.json();

        if (!response.ok) {
          updatedDonors.push({ ...donor, shippingStatus: "Error" });
        } else {
          updatedDonors.push({ ...donor, shippingStatus: data.data.status });
        }
      } catch (error) {
        console.log("Error fetching status:", error);
        updatedDonors.push({ ...donor, shippingStatus: "Error" });
      }
      await new Promise((resolve) => setTimeout(resolve, 1)); // Wait for 1ms
    }

    // Replace the old donors array with the updated one
    setDonations(updatedDonors);
  };

  useEffect(() => {
    const fetchUserDonations = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }
      try {
        const response = await fetch(
          `https://hearthand.onrender.com/api/v1/donations/${user.id}`,
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
        setDonations(jsonData);
        getDonationStatus(jsonData);
        console.log("User Donations from server:", JSON.stringify(jsonData));
      } catch (err) {
        console.error("Error from server:", err.message);
      }
    };

    if (user) {
      fetchUserDonations();
    }
  }, [user, isDeleting]);

  const handleDelete = (order_code) => async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
          },
          body: JSON.stringify({ order_codes: [order_code] }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log("Error cancelling order:", data);
        setIsDeleting(false);
        return;
      }
      alert("Order cancelled successfully");
      setIsDeleting(false);
    } catch (error) {
      console.log("Error cancelling order:", error);
      alert("Error cancelling order ", error.message);
      setIsDeleting(false);
    }
  };

  const checkAuth = () => {
    if (user) {
      return (
        <>
          <Header />
          <div className="container-fluid position-relative">
            {/* Image background */}
            <img
              src={Donate}
              className="img-fluid"
              alt="Donate"
              style={{ width: "100%", height: "60vh" }}
            />
            <Link to="/shipping">
              <div
                className="card text-bg position-absolute"
                style={{
                  top: "100%",
                  left: "20%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "30rem",
                  zIndex: "1",
                }}
              >
                <div
                  className="bg-black p-2 text-white"
                  style={{ fontSize: "40px", fontStyle: "italic" }}
                >
                  DONATE NOW
                </div>
                <div
                  className="bg-black p-2 text-white"
                  style={{ opacity: "0.7" }}
                >
                  <p
                    className="card-text"
                    style={{ fontSize: "17px", fontStyle: "italic" }}
                  >
                    Every donation provides nutritious food and items for
                    children and families.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div
            className="container"
            style={{ width: "60%", marginTop: "100px" }}
          >
                <button
                  className="nav-link active btn btn-outline-warning"
                  id="your-donate-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#your-donate"
                  type="button"
                  role="tab"
                  aria-controls="your-donate"
                  aria-selected="false"
                  style={{
                    color: "black",
                    fontFamily: "Arial",
                    height: "7vh",
                    fontSize: "20px",
                    pointerEvents: "none",
                  }}
                >
                  YOUR DONATION
                </button>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="your-donate"
                role="tabpanel"
                aria-labelledby="your-donate-tab"
              >
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Organization</th>
                      <th>Description</th>
                      <th>Shipping Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...donations].reverse().map((donation, index) => (
                      <tr key={donation._id}>
                        <td>{donations.length - index}</td>
                        <td>{donation.product_name}</td>
                        <td>{donation.product_quantity}</td>
                        <td>{donation.organization_name}</td>
                        <td>{donation.description}</td>
                        <td>{donation.shippingStatus}</td>
                        <td>
                          {donation.shippingStatus !== "cancel" &&
                          donation.shippingStatus !== "Error" ? (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(donation.order_code)}
                            >
                              Cancel
                            </button>
                          ) : null}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Header />
          <Link to="/DonorLogin" style={{ textDecoration: "none" }}>
            <h1>Please login before accessing this page.</h1>
          </Link>
          <Footer />
        </>
      );
    }
  };

  return <>{checkAuth()}</>;
}

export default Donation;
