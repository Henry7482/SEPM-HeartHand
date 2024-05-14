import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Donate from "../assets/donate.jpg";

function Donation() {
  return (
    <>
      <Header />
      <div className='container-fluid position-relative'>
        {/* Image background */}
        <img src={Donate} className="img-fluid" alt="Donate" style={{ width: "100%", height: "60vh" }} />

        <div className="card text-bg position-absolute" style={{ top: "100%", left: "20%", transform: "translate(-50%, -50%)", maxWidth: "30rem", zIndex: "1" }}>
          <div className="bg-black p-2 text-white" style={{ fontSize: "40px", fontStyle: "italic" }}>DONATE NOW</div>
          <div className="bg-black p-2 text-white" style={{ opacity: "0.7" }}>
            <p className="card-text" style={{ fontSize: "17px", fontStyle: "italic" }}>Every donation provides nutritious food and items for children and families.</p>
          </div>
        </div>
      </div>

      <div className="container" style={{ width: "60%", marginTop: "100px" }}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="donation-tab" data-bs-toggle="tab" data-bs-target="#donation" type="button" role="tab" aria-controls="donation" aria-selected="true">Donation</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="your-donate-tab" data-bs-toggle="tab" data-bs-target="#your-donate" type="button" role="tab" aria-controls="your-donate" aria-selected="false">Your Donate</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="donation" role="tabpanel" aria-labelledby="donation-tab">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>John Doe</td>
                  <td>$100</td>
                  <td>2024-05-14</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jane Smith</td>
                  <td>$50</td>
                  <td>2024-05-13</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tab-pane fade" id="your-donate" role="tabpanel" aria-labelledby="your-donate-tab">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Alice Johnson</td>
                  <td>$200</td>
                  <td>2024-05-12</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Bob Brown</td>
                  <td>$75</td>
                  <td>2024-05-11</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Donation;
