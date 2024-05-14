import React, { useEffect, useState } from 'react';
import './shipping.css'

const CheckoutPage = () => {
  const [shifts, setShifts] = useState([]);

  const fetchShifts = async () => {
    const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shift/date',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Token': '9865968a-0e0b-11ef-bfe9-c2d25c6518ab'
        }
      }
    );
    const data = await response.json();
    setShifts(data.data);
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  if (!shifts) {
      console.log("No shifts found");
  } else {
    console.log("Shifts found", JSON.stringify(shifts));
  }

  const displayShifts = (shifts) => {
    if (Array.isArray(shifts)) {
      return shifts.map((item, index) => (
        <option value={index}>{item.title}</option>
      ));
    } else {
      return <h1>Loading...</h1>;
    }
  }
  const [districts, setDistricts] = useState([]);

  const fetchDistricts = async () => {
    try {
      const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Token': '9865968a-0e0b-11ef-bfe9-c2d25c6518ab'
        }
      });
      const data = await response.json();
      setDistricts(data.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  const displayDistricts = (districts) => {
    if (Array.isArray(districts)) {
      return districts.map((district, index) => (
        <option key={index} value={district.DistrictID}>{district.DistrictName}</option>
      ));
    } else {
      return <h1>Loading...</h1>;
    }
  };
  const [provinces, setProvinces] = useState([]);

  const fetchProvinces = async () => {
    try {
      const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Token': '9865968a-0e0b-11ef-bfe9-c2d25c6518ab'
        }
      });
      const data = await response.json();
      setProvinces(data.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const displayProvinces = () => {
    if (!provinces || provinces.length === 0) {
      return <option>Loading...</option>;
    } else {
      return provinces.map((province) => (
        <option key={province.ProvinceID} value={province.ProvinceName}>{province.ProvinceName}</option>
      ));
    }
  };


    return (
        <>
          <nav className="bg-white">
            <div className="d-flex align-items-center">
              <div className="logo">
                <a href="#" className="text-uppercase">ship</a>
              </div>
              <div className="right-align" style={{ marginLeft: '1180px' }}>
              <a href="#" className="text-uppercase,h5 font-weight-bold text-primary">Back to shipping</a>
              </div>
            </div>
          </nav>
          <header>
            <div className="d-flex justify-content-center align-items-center pb-3">
              <div className="px-sm-5 px-2 active">SHIPPING CART
                <span className="fas fa-check"></span>
              </div>
              <div className="px-sm-5 px-2">ORDER</div>
              <div className="px-sm-5 px-2">FINISH</div>
            </div>
            <div className="progress">
              <div className="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                aria-valuemax="100"></div>
            </div>
          </header>
          <div className="wrapper">
            <div className="h5 large">Shipping Cart</div>
            <div className="row">
              <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-0 offset-md-2 offset-sm-1">
                <div className="mobile h5">Shipping Address</div>
                <div id="details" className="bg-white rounded pb-5">
                <div className="h5 font-weight-bold text-primary">
                    Sending
                 </div>
                  <form>
                  <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label> Your Name</label>
                          <div className="d-flex jusify-content-start align-items-center rounded p-2">
                            <input type="text" defaultValue="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Phone Number</label>
                          <div className="d-flex jusify-content-start align-items-center rounded p-2">
                            <input type="text" defaultValue="" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                      <label className="text-muted">Address</label>
                      <input type="text" defaultValue="" className="form-control" />
                    </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>District</label>
                          <select name="district" id="district">
                          <option disabled selected value>Choose a district</option>
                           {displayDistricts(districts)}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Province</label>
                          <select name="province" id="province">
                          <option disabled selected value>Choose a province</option>
                           {displayProvinces(provinces)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <label>Shipping</label>
                    <select name="country" id="country">
                    <option disabled selected value>Choose a shipping shift</option>
                      {displayShifts(shifts)}
                    </select>
                  </form>
                  <div className="h5 font-weight-bold text-primary" style={{ marginTop: '40px', marginBottom: '10px', top: 'auto' }}>
                    Organization
                 </div>
                  <form>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Organization's Name</label>
                          <div className="d-flex jusify-content-start align-items-center rounded p-2">
                            <input type="text" defaultValue="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Phone Number</label>
                          <div className="d-flex jusify-content-start align-items-center rounded p-2">
                            <input type="text" defaultValue="" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="text-muted">Address</label>
                        <input type="text" defaultValue="" className="form-control" />
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>District</label>
                          <select name="country" id="country">
                          <option disabled selected value>Choose a district</option>
                           {displayDistricts(districts)}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Province</label>
                          <select name="province" id="province">
                          <option disabled selected value>Choose a province</option>
                           {displayProvinces(provinces)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="h5 font-weight-bold text-primary" style={{ marginTop: '40px', marginBottom: '10px', top: 'auto' }}>
                     Package Informations
                  </div>
                  <form>
                    <div className="form-group">
                      <label className="text-muted">Total Mass</label>
                      <input type="text" defaultValue="" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="text-muted">Length</label>
                      <input type="text" defaultValue="" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="text-muted">Wide</label>
                      <input type="text" defaultValue="" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="text-muted">Height</label>
                      <input type="text" defaultValue="" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="text-muted">Total value of goods</label>
                      <input type="text" defaultValue="" className="form-control" />
                    </div>
                  </form>
                </div>
                <input type="checkbox" checked />
                <label>Shipping address is same as billing</label>
              </div>
              <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-0 offset-md-2 offset-sm-1 pt-lg-0 pt-3">
                <div className="text-muted pt-3" id="mobile">
                  <span className="fas fa-lock"></span>
                  Your information is save
                </div>
                <div id="address" className="bg-light rounded mt-3">
                  <div className="h5 font-weight-bold text-primary">
                    Shipping Address
                  </div>
                  <div className="d-md-flex justify-content-md-start align-items-md-center pt-3">
                    <div className="mr-auto">
                      <b>Delivery Location</b>
                      <input type="text" defaultValue="" />
                    </div>
                    <div className="rounded py-2 px-3" id="register">
                      <a href="#">
                        <b>Customer Experience</b>
                      </a>
                      <p className="text-muted">Ensuring a seamless shopping experience is our priority.</p>
                    </div>
                  </div>
                  <div id="address" className="bg-light rounded mt-3">
                  <div className="h5 font-weight-bold text-primary">
                    Product
                  </div>
                  <div className="form-group">
                      <label className="text-muted">Enter product name</label>
                      <input type="productname" defaultValue="" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="text-muted">Mass</label>
                      <div className="d-flex jusify-content-start align-items-center rounded p-2">
                      <input type="productcode" defaultValue="" />
                      </div>
                    </div>
                    <label>Quantity</label>
                    <select name="country" id="country">
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '10px' }}>
                     <div className="rounded py-2 px-3" id="register" style={{ backgroundColor: '#f0f0f0' }}>
                     <a href="#"><b>Note</b></a>
                      <input type="Type the note here" defaultValue="" style={{ backgroundColor: '#f0f0f0', border: 'none' }} />
                     </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-success">Create Order</button>
                  </div>
              </div>
            </div>
            <div className="text-muted">
              <span className="fas fa-lock"></span>
              Your information is save
            </div>
          </div>
        </>
      );
    }

export default CheckoutPage;
