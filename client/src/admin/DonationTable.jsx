import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useSessionReset } from '../hooks/useSessionReset';

function DonationTable() {
  const [donors, setDonors] = useState([]);
  const { user } = useAuthContext();
  const { resetSession } = useSessionReset();

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
    setDonors(updatedDonors);
  };

  useEffect(() => {
    const fetchDonations = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }
      try {
        const response = await fetch(
          "https://hearthand.onrender.com/api/v1/donations",
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
        setDonors(jsonData);
        getDonationStatus(jsonData);
        // console.log("Data from server:", JSON.stringify(jsonData));
      } catch (err) {
        console.error("Error from server:", err.message);
      }
    };
    if (user && user.role === "admin") {
      fetchDonations();
    }
  }, [user]);


  return (
    <div className='container-fluid'>
      <caption className='text-white fs-3'>Recent Donations</caption>
      <table className="table bg-white rounded mt-2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">ProductName</th>
            <th scope="col">Quantity</th>
            <th scope="col">Organization</th>
            <th scope="col">Description</th>
            <th scope="col">Shipping Status</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, index) => (
            <tr key={donor._id}>
              <th scope="row">{index + 1}</th>
              <td>{donor.sender_name}</td>
              <td>{donor.product_name}</td>
              <td>{donor.product_quantity}</td>
              <td>{donor.organization_name}</td>
              <td>{donor.description}</td>
              <td>{donor.shippingStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DonationTable;
