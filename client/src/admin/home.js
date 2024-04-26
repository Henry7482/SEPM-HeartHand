import React from 'react'
import Nav from './Nav'

function home({Toggle}) {
  return (
    <div className='px-3'>
        <Nav Toggle={Toggle}/>
        <div className='container-fluid'>
            <div className='row g-3 my-2'>
                <div className='col-md-3'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>20</h3>
                            <p className='fs-5'>Article</p>
                        </div>
                        <i className='bi bi-newspaper p-3 fs-1'></i>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>40</h3>
                            <p className='fs-5'>Donation</p>
                        </div>
                        <i className='bi bi-box2-heart p-3 fs-1'></i>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>5</h3>
                            <p className='fs-5'>Organization</p>
                        </div>
                        <i className='bi bi-building-fill-add p-3 fs-1'></i>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>10</h3>
                            <p className='fs-5'>Delivered</p>
                        </div>
                        <i className='bi bi-truck p-3 fs-1'></i>
                    </div>
                </div>
            </div>
        </div>
        <caption className='text-white fs-3'> RecentDonators</caption>
        <table class="table bg-white rounded mt-2">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td col span="2">Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </table>

    </div>
  )
}

export default home