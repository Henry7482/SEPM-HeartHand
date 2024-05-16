import React, {useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Donate from "../assets/donate.jpg";
import Children from "../assets/children.jpg";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

function Donation() {
  const [donations, setDonations] = useState([]);
  const { user } = useAuthContext();

  const getDonationStatus = async (donations) => {
    console.log("Getting donation status");
    const updatedDonors = [];
  
    for (let i = 0; i < donations.length; i++) {
      const donor = donations[i];
      // console.log("Donor:", donor);
      try {
        const response = await fetch("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
          },
          body: JSON.stringify({order_code: donor.order_code})
        });
        const data = await response.json();
        if (!response.ok) {
          updatedDonors.push({...donor, shippingStatus: "Error"});
        } else {
          updatedDonors.push({...donor, shippingStatus: data.data.status});
        }
      } catch (error) {
        console.log("Error fetching status:", error);
        updatedDonors.push({...donor, shippingStatus: "Error"});
      }
      await new Promise(resolve => setTimeout(resolve, 1)); // Wait for 1ms
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
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
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
  }, [user]);
  
  

  return (
    <>
      <Header />
      <div className='container-fluid position-relative'>
        {/* Image background */}
        <img src={Donate} className="img-fluid" alt="Donate" style={{ width: "100%", height: "60vh" }} />
        <Link to="/shipping">
        <div className="card text-bg position-absolute" style={{ top: "100%", left: "20%", transform: "translate(-50%, -50%)", maxWidth: "30rem", zIndex: "1" }}>
          <div className="bg-black p-2 text-white" style={{ fontSize: "40px", fontStyle: "italic" }}>DONATE NOW</div>
          <div className="bg-black p-2 text-white" style={{ opacity: "0.7" }}>
            <p className="card-text" style={{ fontSize: "17px", fontStyle: "italic" }}>Every donation provides nutritious food and items for children and families.</p>
          </div>
        </div>
        </Link>

      </div>
      <div className="container" style={{ width: "60%", marginTop: "100px" }}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">

          <li className="nav-item" role="presentation">
            <button className="nav-link active btn btn-outline-warning" id="your-donate-tab" data-bs-toggle="tab" data-bs-target="#your-donate" type="button" role="tab" aria-controls="your-donate" aria-selected="false"
             style={{width:"100vh", color:"black", fontFamily:"Arial",height:"7vh",fontSize:"20px", pointerEvents:"none"}}>YOUR DONATION</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">

          <div className="tab-pane fade show active" id="your-donate" role="tabpanel" aria-labelledby="your-donate-tab">
            <table className="table mt-3">
            <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Organization</th>
                  <th>Description</th>
                  <th>Shipping Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <tr key={donation._id}>
                    <td>{index + 1}</td>
                    <td>{donation.product_name}</td>
                    <td>{donation.product_quantity}</td>
                    <td>{donation.organization_name}</td>
                    <td>{donation.description}</td>
                    <td>{donation.shippingStatus}</td>
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
}

export default Donation;
