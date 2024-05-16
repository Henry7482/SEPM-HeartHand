import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

function DonationTable() {
  const [donors, setDonors] = useState([]);
  const { user } = useAuthContext();

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
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setDonors(jsonData);
        console.log("Data from server:", JSON.stringify(jsonData));
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
