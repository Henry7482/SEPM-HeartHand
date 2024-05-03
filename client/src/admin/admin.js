import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import Dashboard from './dashboard';
import Home from './home'; // Import Home component

function Admin() {
  const [activePage, setActivePage] = useState('Dashboard'); // Default to Dashboard

  const selectPage = (page) => {
    setActivePage(page);
  }

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        <div className='col-2 bg-white vh-100'>
          <Sidebar selectPage={selectPage} />
        </div>
        <div className='col'>
          {activePage === 'Dashboard' && <Dashboard />}
          {activePage === 'Home' && <Home />}
        </div>
      </div>
    </div>
  );
}

export default Admin;
