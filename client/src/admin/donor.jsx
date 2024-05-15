import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { useAuthContext } from "../hooks/useAuthContext";

function Donor({ Toggle }) {
  const [donors, setDonors] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleDelete = (id) => {
    setDonors(donors.filter(donor => donor._id !== id));
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <div className='container-fluid'>
        <caption className='text-white fs-3'>Recent Donations</caption>
        <table className="table bg-white rounded mt-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">ProductName</th>
              <th scope="col">ProductType</th>
              <th scope="col">Quantity/Status</th>
              <th scope="col">Organization</th>
              <th scope="col">Description</th>
              <th scope="col">Shipping Status</th>
              <th scope="col">Product Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <tr key={donor._id}>
                <th scope="row">{index + 1}</th>
                <td>{donor.sender_name}</td>
                <td>{donor.product_name}</td>
                <td>{donor.product_category}</td>
                <td>{donor.product_quantity}</td>
                <td>{donor.organization_name}</td>
                <td>{donor.description}</td>
                <td>{donor.shippingStatus}</td>
                <td>
                  <img src={donor.imageUrl || Image} alt="Product" style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={() => openModal(donor.imageUrl || Image)} />
                </td>
                <td>
                  <button onClick={() => handleDelete(donor._id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="modal show d-block" role="dialog" style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: '100%', overflow: 'auto' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Product Image</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <img src={selectedImage} alt="Product" className="w-100"/>
                </div>
              </div>
            </div>
            <div className="modal-backdrop show" onClick={closeModal} style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Donor;
