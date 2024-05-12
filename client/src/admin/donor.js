import React, { useState } from 'react';
import Nav from './Nav';
import Image from "../assets/image.png"; // Importing the default image

function Donor({ Toggle }) {
  const [donors, setDonors] = useState([
    { id: 1, name: 'Mark', productName: 'Shirt', productType: 'Cloth', quantity: 2, organization: 'HearHand', description: 'I want to donate', shippingStatus: 'Yes', imageUrl: Image },
    { id: 2, name: 'Jacob', productName: 'Shirt', productType: 'Cloth', quantity: 2, organization: 'HearHand', description: 'I want to donate', shippingStatus: 'No', imageUrl: Image },
    { id: 3, name: 'Larry the Bird', productName: 'Shirt', productType: 'Cloth', quantity: 2, organization: 'HearHand', description: 'I want to donate', shippingStatus: 'Yes', imageUrl: Image }
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    setDonors(donors.filter(donor => donor.id !== id));
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
              <tr key={donor.id}>
                <th scope="row">{index + 1}</th>
                <td>{donor.name}</td>
                <td>{donor.productName}</td>
                <td>{donor.productType}</td>
                <td>{donor.quantity}</td>
                <td>{donor.organization}</td>
                <td>{donor.description}</td>
                <td>{donor.shippingStatus}</td>
                <td>
                  <img src={donor.imageUrl} alt="Product" style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={() => openModal(donor.imageUrl)} />
                </td>
                <td>
                  <button onClick={() => handleDelete(donor.id)} className="btn btn-danger">Delete</button>
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
            <div className="modal-backdrop show" onClick={closeModal} style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0)' }}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Donor;
