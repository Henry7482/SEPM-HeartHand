import React, { useState } from 'react';
import Nav from './Nav';
import logo from "../assets/logo.png";
import Charity from "../assets/charity.png";
import RMIT from "../assets/RMIT-LOGO-project.jpg";

function Organization({ Toggle }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newOrganization, setNewOrganization] = useState({
    name: '',
    domain: '',
    city: '',
    address: '',
    logo: '',
    owner: ''
  });

  const [organizations, setOrganizations] = useState([
    { name: 'HearHand', domain: 'South', logo: logo },
    { name: 'RMIT-Heart', domain: 'North', logo: RMIT },
    { name: 'Together', domain: 'Middle', logo: Charity }
  ]);

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
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewOrganization(prevState => ({
        ...prevState,
        logo: reader.result
      }));
    };
  };

  const handleCreateOrganization = () => {
    console.log('New organization:', newOrganization);
    setOrganizations(prevOrganizations => [
      ...prevOrganizations,
      newOrganization
    ]);
    setNewOrganization({
      name: '',
      domain: '',
      city: '',
      address: '',
      logo: '',
      owner: ''
    });
  };

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <div className='container-fluid'>
        <div className='row g-3 my-2'>
          {/* Display existing organizations */}
          {organizations.map((organization, index) => (
            <div key={index} className='col-md-3'>
              <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                <div>
                  <h3 className='fs-2'>{organization.name}</h3>
                  <p className='fs-5'>{organization.domain}</p>
                </div>
                <img src={organization.logo} alt={organization.name} width="100" height="100" />
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
                Create New Organization
              </button>
            </div>
            {/* Display create organization form if showCreateForm is true */}
            {showCreateForm && (
              <div className='mt-3 bg-white shadow-sm p-3 rounded'>
                <div>
                  <input type="text" name="name" placeholder="Organization Name*" value={newOrganization.name} onChange={handleInputChange} className="form-control mb-2" />
                  <select name="domain" value={newOrganization.domain} onChange={handleInputChange} className="form-select mb-2">
                    <option value="">Select Domain</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Middle">Middle</option>
                  </select>
                  <input type="text" name="city" placeholder="City*" value={newOrganization.city} onChange={handleInputChange} className="form-control mb-2" />
                  <input type="text" name="address" placeholder="Address*" value={newOrganization.address} onChange={handleInputChange} className="form-control mb-2" />
                  <input type="file" name="logo" onChange={handleLogoChange} className="form-control mb-2" />
                  <input type="text" name="owner" placeholder="Owner*" value={newOrganization.owner} onChange={handleInputChange} className="form-control mb-2" />
                  <button onClick={handleCreateOrganization} className="btn btn-success">Create</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organization;
