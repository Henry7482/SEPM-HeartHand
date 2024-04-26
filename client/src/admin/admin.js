import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Sidebar from './Sidebar'
import Home from './home';

function Admin() {
  const [toggle, setToggle] = useState(false)
  const Toggle = ()=>{
    setToggle(!toggle)
  }
  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        {toggle &&<div className= 'col-2 bg-white vh-100'>
        <Sidebar/>
        </div>}
        <div className='col'>
          <Home Toggle={Toggle}/>
        </div>
      </div>
    </div>
  )
}

export default Admin
