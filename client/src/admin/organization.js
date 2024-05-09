import React, { useState } from 'react';
import Nav from './Nav';
import Draggable from 'react-draggable';

// Sample logos imported here
import logo from "../assets/logo.png";
import charity from "../assets/charity.png";
import rmitLogo from "../assets/RMIT-LOGO-project.jpg";

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
    { name: 'RMIT-Heart', domain: 'North', logo: rmitLogo },
    { name: 'Together', domain: 'Middle', logo: charity },
    { name: 'RMIT-Heart', domain: 'North', logo: rmitLogo },
    { name: 'Together', domain: 'Middle', logo: charity },
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
  <div className="container-fluid"style={{ position: 'fixed'}} >
    <div className="row mt-2">
      <div className="col-12">
        <div style={{ position: 'fixed', overflowX: 'auto' }}>
          <Draggable axis="x">
            <div className='d-flex flex-nowrap'>
              {organizations.map((organization, index) => (
                <div key={index} className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded organization-card mx-2' style={{ minWidth: '300px',maxWidth: '400px'  }}>
                  <div>
                    <h3 className='fs-2'>{organization.name}</h3>
                    <p className='fs-5'>{organization.domain}</p>
                  </div>
                  <img src={organization.logo} alt={organization.name} width="100" height="100" />
                </div>
              ))}
            </div>
          </Draggable>
        </div>
      </div>
    </div>

    <div className="row" style={{marginTop:'200px', paddingRight:'300px'}}>
      <div className="col-12" > 
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
            Create New Organization
          </button>
        </div>
      </div>
    </div>
    {showCreateForm && (
      <div className="row" style={{ paddingRight:'300px'}}>
        <div className='col-12'>
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
        </div>
      </div>
    )}
  </div>
</div>
  );
}

export default Organization;
