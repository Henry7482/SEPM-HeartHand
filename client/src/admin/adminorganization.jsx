import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Draggable from 'react-draggable';
import { useAuthContext } from "../hooks/useAuthContext";

// Import logos if still needed for some default state
import hearthand from "../assets/logo.png";
import charity from "../assets/charity.png";
import rmitLogo from "../assets/RMIT-LOGO-project.jpg";

function Organization({ Toggle }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [newOrganization, setNewOrganization] = useState({
  
    name: '',
      phone_number: '',
      ward: '',
      address: '',
      logo: '',
      district: '',
      province: '',
      email: '',
      website: '',
      imageurl: ''
  });
  const [organizations, setOrganizations] = useState([]);
  const { user } = useAuthContext();
  

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

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setOrganizations(jsonData);
        console.log("Organizations Data from server:", JSON.stringify(jsonData));
      } catch (err) {
        console.error("Error from server:", err.message);
      }
    };

    if (user && user.role === "admin") {
      fetchOrganizations();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrganization(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewOrganization(prevState => ({
        ...prevState,
        logo: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCreateOrganization = () => {
    setOrganizations([...organizations, newOrganization]);
    setNewOrganization({
      name: '',
      phone_number: '',
      ward: '',
      address: '',
      logo: '',
      district: '',
      province: '',
      email: '',
      website: '',
      imageurl: '',
    });
  };

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <div className="container-fluid" style={{ position: 'fixed' }}>
        <div className="row mt-2">
          <div className="col-12">
            <div style={{ position: 'fixed', overflowX: 'auto' }}>
              <Draggable axis="x">
                <div className='d-flex flex-nowrap'>
                  {organizations.map((organization, index) => (
                    <div key={index} className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded organization-card mx-2' style={{ minWidth: '300px', maxWidth: '400px' }}>
                      <div>
                        <h3 className='fs-2'>{organization.name}</h3>
                        <p className='fs-5'>{organization.domain}</p>
                      </div>
                      <img src={organization.imageURL} alt={organization.name} width="100" height="100" />
                    </div>
                  ))}
                </div>
              </Draggable>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: '200px', paddingRight: '350px' }}>
          <div className="col-12">
            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
                Create New Organization
              </button>
            </div>
          </div>
        </div>
        {showCreateForm && (
          <div className="row" style={{ paddingRight: '350px' }}>
            <div className='col-12'>
              <div className='mt-3 bg-white shadow-sm p-3 rounded'>
                <form>
                  <input type="text" name="name" placeholder="Organization Name*" value={newOrganization.name} onChange={handleInputChange} className="form-control mb-2" />
                  <select name="domain" value={newOrganization.district} onChange={handleInputChange} className="form-select mb-2">
                    <option value="">District</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Middle">Middle</option>
                  </select>
                  <input type="text" name="ward" placeholder="Ward*" value={newOrganization.ward} onChange={handleInputChange} className="form-control mb-2" />
                  <input type="text" name="address" placeholder="Address*" value={newOrganization.address} onChange={handleInputChange} className="form-control mb-2" />
                  <input type="text" name="province" placeholder="Province*" value={newOrganization.province} onChange={handleInputChange} className="form-control mb-2" />
                  <input type="text" name="email" placeholder="Email*" value={newOrganization.email} onChange={handleInputChange} className="form-control mb-2" />
                  <input type="text" name="province" placeholder="Province*" value={newOrganization.province} onChange={handleInputChange} className="form-control mb-2" />
                  <input type="file" name="logo" onChange={handleLogoChange} className="form-control mb-2" />
                  <input type="text" name="phonenumber" placeholder="PhoneNumber*" value={newOrganization.phone_number} onChange={handleInputChange} className="form-control mb-2" />
                  <button type="submit" onClick={handleCreateOrganization} className="btn btn-success">Create</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Organization;
