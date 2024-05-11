import React from 'react';
import './shipping.css'

const CheckoutPage = () => {
    return (
        <>
          <nav className="bg-white">
            <div className="d-flex align-items-center">
              <div className="logo">
                <a href="#" className="text-uppercase">ship</a>
              </div>
              <div className="ml-auto">
                <a href="#" className="text-uppercase">Back to shipping</a>
              </div>
            </div>
          </nav>
          <header>
            <div className="d-flex justify-content-center align-items-center pb-3">
              <div className="px-sm-5 px-2 active">SHIPPING CART
                <span className="fas fa-check"></span>
              </div>
              <div className="px-sm-5 px-2">CHECKOUT</div>
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
                  <form>
                    <div className="form-group">
                      <label className="text-muted">Name</label>
                      <input type="text" defaultValue="" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="text-muted">Email</label>
                      <div className="d-flex jusify-content-start align-items-center rounded p-2">
                        <input type="email" defaultValue="" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>City</label>
                          <div className="d-flex jusify-content-start align-items-center rounded p-2">
                            <input type="text" defaultValue="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Zip code</label>
                          <div className="d-flex jusify-content-start align-items-center rounded p-2">
                            <input type="text" defaultValue="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Address</label>
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
                    </div>
                    <label>Country</label>
                    <select name="country" id="country">
                      <option value="usa">VietNam</option>
                      <option value="ind">England</option>
                    </select>
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
                      <b>Home Address</b>
                      <p className="text-justify text-muted">342P,District 7</p>
                      <p className="text-uppercase text-muted">DALAT</p>
                    </div>
                    <div className="rounded py-2 px-3" id="register">
                      <a href="#">
                        <b>Register Now</b>
                      </a>
                      <p className="text-muted">Create the account to have multiple addresses saved</p>
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
                      <label className="text-muted">Enter product code</label>
                      <div className="d-flex jusify-content-start align-items-center rounded p-2">
                      <input type="productcode" defaultValue="" />
                      </div>
                    </div>
                    <label>Quantity</label>
                    <select name="country" id="country">
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
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
