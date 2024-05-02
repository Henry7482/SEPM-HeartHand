import React from 'react';
import '../admin/admin.css';

function Sidebar({ selectPage }) {
  return (
    <div className='bg-white sidebar p-2'>
      <div className='m-2'>
        <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
        <span className='brand-name fs-4'>HeartAdmin</span>
      </div>
      <hr className='text-dark'/>
      <div className='list-group list-group-flush'>
        <button onClick={() => selectPage('Dashboard')} className='list-group-item py-2'>
          <i className='bi bi-speedometer2 fs-5 me-3'></i>
          <span className='fs-5'>Dashboard</span>
        </button>
        <button onClick={() => selectPage('Home')} className='list-group-item py-2'>
          <i className='bi bi-house fs-5 me-3'></i>
          <span className='fs-5'>Home</span>
        </button>
        <button onClick={() => selectPage('Organization')} className='list-group-item py-2'>
          <i className='bi bi-people fs-5 me-3'></i>
          <span className='fs-5'>Organization</span>
        </button>
        <button onClick={() => selectPage('Donation')} className='list-group-item py-2'>
          <i className='bi bi-table fs-5 me-3'></i>
          <span className='fs-5'>Donation</span>
        </button>
        <button onClick={() => selectPage('Logout')} className='list-group-item py-2'>
          <i className='bi bi-power fs-5 me-3'></i>
          <span className='fs-5'>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
