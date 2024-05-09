import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../admin/admin.css';

function Sidebar({ selectPage }) {
  const navigate = useNavigate(); // Instantiate navigate function
  const [activeItem, setActiveItem] = useState('Dashboard'); // Default active page

  const handleSelectPage = (page) => {
    if (page === 'Logout') {
      // Perform logout logic here (like clearing localStorage or tokens)
      navigate('/LogIn'); // Navigate to Login page on logout
    } else {
      selectPage(page);
      setActiveItem(page); // Set active item state
    }
  };

  return (
    <div className='bg-white sidebar p-2'>
      <div className='m-2'>
        <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
        <span className='brand-name fs-4'>HeartAdmin</span>
      </div>
      <hr className='text-dark'/>
      <div className='list-group list-group-flush'>
        <button onClick={() => handleSelectPage('Dashboard')} className={`list-group-item py-2 ${activeItem === 'Dashboard' ? 'active' : ''}`}>
          <i className='bi bi-speedometer2 fs-5 me-3'></i>
          <span className='fs-5'>Dashboard</span>
        </button>
        <button onClick={() => handleSelectPage('Home')} className={`list-group-item py-2 ${activeItem === 'Home' ? 'active' : ''}`}>
          <i className='bi bi-house fs-5 me-3'></i>
          <span className='fs-5'>Home</span>
        </button>
        <button onClick={() => handleSelectPage('Organization')} className={`list-group-item py-2 ${activeItem === 'Organization' ? 'active' : ''}`}>
          <i className='bi bi-people fs-5 me-3'></i>
          <span className='fs-5'>Organization</span>
        </button>
        <button onClick={() => handleSelectPage('Donation')} className={`list-group-item py-2 ${activeItem === 'Donation' ? 'active' : ''}`}>
          <i className='bi bi-table fs-5 me-3'></i>
          <span className='fs-5'>Donation</span>
        </button>
        <button onClick={() => handleSelectPage('Logout')} className={`list-group-item py-2 ${activeItem === 'Logout' ? 'active' : ''}`}>
          <i className='bi bi-power fs-5 me-3'></i>
          <span className='fs-5'>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
