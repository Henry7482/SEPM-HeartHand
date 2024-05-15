import React, { useEffect, useState } from "react";
import "./shipping.css";

const CheckoutPage = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState("default");
  const [districts, setDistricts] = useState([]);
  const [selectedSenderDistricts, setSelectedSenderDistricts] =
    useState("default");
  const [selectedSenderProvince, setSelectedSenderProvince] =
    useState("default");
  const [selectedOrganizationDistricts, setSelectedOrganizationDistricts] =
    useState("default");
  const [selectedOrganizationProvince, setSelectedOrganizationProvince] =
    useState("default");

  const [deliveryNote, setDeliveryNote] = useState(null);
  const [donationContent, setDonationContent] = useState(null);
  const [senderName, setSenderName] = useState(null);
  const [senderPhoneNumber, setSenderPhoneNumber] = useState(null);
  const [senderAddress, setSenderAddress] = useState(null);
  const [organizationName, setorganizationName] = useState(null);
  const [organizationPhoneNumber, setorganizationPhoneNumber] = useState(null);
  const [organizationAddress, setorganizationAddress] = useState(null);
  const [totalmass, settotalmass] = useState(null);
  const [length, setlength] = useState(null);
  const [wide, setwide] = useState(null);
  const [height, setheight] = useState(null);
  const [totalvalueofgoods, settotalvalueofgoods] = useState(null);
  const [productname, setproductname] = useState(null);
  const [mass, setmass] = useState(null);
  const [quantity, setquantity] = useState(null);

  const handleDeliveryNote = (event) => {
    const note = event.target.value;
    setDeliveryNote(note);
  };

  const handleDonationContent = (event) => {
    const content = event.target.value;
    setDonationContent(content);
  };

  useEffect(() => {
    fetchServiceId();
    fetchShifts();
  }, []);

  if (!shifts) {
    console.log("No shifts found");
  } else {
    console.log("Shifts found", JSON.stringify(shifts));
  }

  const fetchServiceId = async () => {
    const response = await fetch(
      "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
        },
        body: JSON.stringify({
          shop_id: 5047918,
          from_district: 1447,
          to_district: 1442,
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch service ID:", response);
      return null;
    }
    let serviceId;
    if (Array.isArray(response.data) && response.data.length > 0) {
      serviceId = response.data[0].service_id;
    }
    console.log("Service ID:", response);
    return serviceId;
  };

  const calculateTotalCost = (mass, length, wide, height, value) => {
    const formData = {
      note: deliveryNote,
      sender: {
        name: senderName,
        phone: senderPhoneNumber,
        address: senderAddress,
        district_id: selectedSenderDistricts,
      }
      from_district_id: selectedSenderDistricts,
      from_ward_code: String(selectedSenderProvince),
      service_id: 53320,
      service_type_id: null,
      to_district_id: 1452,
      to_ward_code: "21012",
      height: 50,
      length: 20,
      weight: 200,
      width: 20,
      insurance_value: 10000,
      cod_failed_amount: 2000,
      coupon: null,
    };
  };

  const handleSelectShift = (event) => {
    const selectedId = event.target.value;
    setSelectedShift(selectedId);
    console.log("Selected shift:", selectedId);
  };

  const fetchShifts = async () => {
    const response = await fetch(
      "https://online-gateway.ghn.vn/shiip/public-api/v2/shift/date",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
        },
      }
    );
    const data = await response.json();
    setShifts(data.data);
  };

  useEffect(() => {
    fetchShifts();
    fetchSenderWards();
    fetchOrganizationWards();
    fetchDistricts();
    fetchProvinces();
  }, [selectedSenderDistricts, selectedOrganizationDistricts]);

  if (!shifts) {
    console.log("No shifts found");
  } else {
    console.log("Shifts found", JSON.stringify(shifts));
  }

  const displayShifts = (shifts) => {
    if (Array.isArray(shifts) && shifts.length > 0) {
      return shifts.map((item) => (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      ));
    } else {
      return <option value="default">No shift found</option>;
    }
  };

  const handleSelectSenderDistricts = (event) => {
    const selectedId = event.target.value;
    setSelectedSenderDistricts(selectedId);
    console.log("Selected Senderdistrict:", selectedId);
  };

  const handleSelectOrganizationDistricts = (event) => {
    const selectedId = event.target.value;
    setSelectedOrganizationDistricts(selectedId);
    console.log("Selected Organizationshift:", selectedId);
  };
  const fetchDistricts = async () => {
    try {
      const response = await fetch(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
          },
        }
      );
      const data = await response.json();
      setDistricts(data.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const displayDistricts = (districts) => {
    if (Array.isArray(districts)) {
      return districts.map((district, index) => (
        <option key={index} value={district.DistrictID}>
          {district.DistrictName}
        </option>
      ));
    } else {
      return <h1>Loading...</h1>;
    }
  };
  const [provinces, setProvinces] = useState([]);

  const handleSelectSenderProvince = (event) => {
    const selectedId = event.target.value;
    setSelectedSenderProvince(selectedId);
    console.log("Selected Senderprovince:", selectedId);
  };

  const handleSelectOrganizationProvince = (event) => {
    const selectedId = event.target.value;
    setSelectedOrganizationProvince(selectedId);
    console.log("Selected Organizationprovince:", selectedId);
  };

  const fetchProvinces = async () => {
    try {
      const response = await fetch(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
          },
        }
      );
      const data = await response.json();
      setProvinces(data.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const displayProvinces = () => {
    if (!provinces || provinces.length === 0) {
      return <option>Loading...</option>;
    } else {
      return provinces.map((province) => (
        <option key={province.ProvinceID} value={province.ProvinceID}>
          {province.ProvinceName}
        </option>
      ));
    }
  };
  const [senderwards, setSenderWards] = useState([]);
  const [organizationwards, setOrganizationWards] = useState([]);

  const fetchSenderWards = async () => {
    const response = await fetch(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
        },
        body: JSON.stringify({
          district_id: Number(selectedSenderDistricts),
        }),
      }
    );
    const data = await response.json();
    setSenderWards(data.data);
  };
  const fetchOrganizationWards = async () => {
    const response = await fetch(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
        },
        body: JSON.stringify({
          district_id: Number(selectedOrganizationDistricts),
        }),
      }
    );

    if (!response.ok) {
      console.log("Failed to fetch ward ID:", response);
      return null;
    }
    const data = await response.json();
    console.log("Org Wards", data.data);
    setOrganizationWards(data.data);
  };

  const displayWards = (wards) => {
    if (Array.isArray(wards)) {
      return wards.map((ward, index) => (
        <option key={index} value={ward.WardCode}>
          {ward.WardName}
        </option>
      ));
    } else {
      return <h1>Loading...</h1>;
    }
  };

  return (
    <>
      <nav className="bg-white">
        <div className="d-flex align-items-center">
          <div className="logo">
            <a href="#" className="text-uppercase">
              ship
            </a>
          </div>
          <div className="right-align" style={{ marginLeft: "1180px" }}>
            <a
              href="#"
              className="text-uppercase,h5 font-weight-bold text-primary"
            >
              Back to shipping
            </a>
          </div>
        </div>
      </nav>
      <header>
        <div className="d-flex justify-content-center align-items-center pb-3">
          <div className="px-sm-5 px-2 active">
            SHIPPING CART
            <span className="fas fa-check"></span>
          </div>
          <div className="px-sm-5 px-2">ORDER</div>
          <div className="px-sm-5 px-2">FINISH</div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </header>
      <div className="wrapper">
        <form>
          <div className="h5 large">Shipping Cart</div>
          <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-0 offset-md-2 offset-sm-1">
              <div className="mobile h5">Shipping Address</div>
              <div id="details" className="bg-white rounded pb-5">
                <div className="h5 font-weight-bold text-primary">Sending</div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label> Your Name</label>
                      <div className="d-flex jusify-content-start align-items-center rounded p-2">
                        <input
                          type="text"
                          defaultValue=""
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <div className="d-flex jusify-content-start align-items-center rounded p-2">
                        <input
                          type="text"
                          defaultValue=""
                          value={senderPhoneNumber}
                          onChange={(e) => setSenderPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Address</label>
                      <div className="d-flex jusify-content-start align-items-center rounded p-2">
                        <input
                          type="text"
                          defaultValue=""
                          value={senderAddress}
                          onChange={(e) => setSenderAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>District</label>
                      <select
                        name="district"
                        id="district"
                        value={selectedSenderDistricts}
                        onChange={handleSelectSenderDistricts}
                      >
                        <option disabled selected value>
                          Choose a district
                        </option>
                        {displayDistricts(districts)}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Province</label>
                      <select
                        name="province"
                        id="province"
                        value={selectedSenderProvince}
                        onChange={handleSelectSenderProvince}
                      >
                        <option disabled selected value>
                          Choose a province
                        </option>
                        {displayProvinces(provinces)}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Ward</label>
                      <select
                        name="province"
                        id="province"
                        value={selectedSenderProvince}
                        onChange={handleSelectSenderProvince}
                      >
                        <option disabled selected value>
                          Choose a province
                        </option>
                        {displayWards(senderwards)}
                      </select>
                    </div>
                  </div>
                </div>
                <label>Shipping</label>
                <select
                  name="shift"
                  id="shift"
                  value={selectedShift}
                  onChange={handleSelectShift}
                >
                  <option disabled value="default">
                    Choose a shipping shift
                  </option>
                  {displayShifts(shifts)}
                </select>
                <div
                  className="h5 font-weight-bold text-primary"
                  style={{
                    marginTop: "40px",
                    marginBottom: "10px",
                    top: "auto",
                  }}
                >
                  Organization
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Organization's Name</label>
                      <div className="d-flex jusify-content-start align-items-center rounded p-2">
                        <input
                          type="text"
                          defaultValue=""
                          value={organizationName}
                          onChange={(e) => setorganizationName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <div className="d-flex jusify-content-start align-items-center rounded p-2">
                        <input
                          type="text"
                          defaultValue=""
                          value={organizationPhoneNumber}
                          onChange={(e) =>
                            setorganizationPhoneNumber(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Address</label>
                      <div className="d-flex jusify-content-start align-items-center rounded p-2">
                        <input
                          type="text"
                          defaultValue=""
                          value={organizationAddress}
                          onChange={(e) =>
                            setorganizationAddress(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>District</label>
                      <select
                        name="country"
                        id="country"
                        value={selectedOrganizationDistricts}
                        onChange={handleSelectOrganizationDistricts}
                      >
                        <option disabled selected value>
                          Choose a district
                        </option>
                        {displayDistricts(districts)}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Province</label>
                      <select
                        name="province"
                        id="province"
                        value={selectedOrganizationProvince}
                        onChange={handleSelectOrganizationProvince}
                      >
                        <option disabled selected value>
                          Choose a province
                        </option>
                        {displayProvinces(provinces)}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Ward</label>
                      <select
                        name="province"
                        id="province"
                        value={selectedSenderProvince}
                        onChange={handleSelectSenderProvince}
                      >
                        <option disabled selected value>
                          Choose a province
                        </option>
                        {displayWards(organizationwards)}
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="rounded py-2 px-3"
                  id="register"
                  style={{ backgroundColor: "#f0f0f0" }}
                >
                  <a href="#">
                    <b>Donation content</b>
                  </a>
                  <input
                    type="Type the note here"
                    defaultValue=""
                    value={donationContent}
                    onChange={handleDonationContent}
                    style={{ backgroundColor: "#f0f0f0", border: "none" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-0 offset-md-2 offset-sm-1 pt-lg-0 pt-3">
              <div className="text-muted pt-3" id="mobile">
                <span className="fas fa-lock"></span>
                Your information is save
              </div>
              <div id="address" className="bg-light rounded mt-3">
                <div
                  className="h5 font-weight-bold text-primary"
                  style={{
                    marginTop: "40px",
                    marginBottom: "10px",
                    top: "auto",
                  }}
                >
                  Package Informations
                </div>
                <div className="form-group">
                  <label className="text-muted">Total Mass</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="form-control"
                    value={totalmass}
                    onChange={(e) => settotalmass(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Length</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="form-control"
                    value={length}
                    onChange={(e) => setlength(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Wide</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="form-control"
                    value={wide}
                    onChange={(e) => setwide(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Height</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="form-control"
                    value={height}
                    onChange={(e) => setheight(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Total value of goods</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="form-control"
                    value={totalvalueofgoods}
                    onChange={(e) => settotalvalueofgoods(e.target.value)}
                  />
                </div>
                <div id="address" className="bg-light rounded mt-3">
                  <div className="h5 font-weight-bold text-primary">
                    Product
                  </div>
                  <div className="form-group">
                    <label className="text-muted">Enter product name</label>
                    <input
                      type="productname"
                      defaultValue=""
                      className="form-control"
                      value={productname}
                      onChange={(e) => setproductname(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-muted">Mass</label>
                    <div className="d-flex jusify-content-start align-items-center rounded p-2">
                      <input
                        type="productcode"
                        defaultValue=""
                        value={mass}
                        onChange={(e) => setmass(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input
                      type="productname"
                      defaultValue=""
                      className="form-control"
                      value={quantity}
                      onChange={(e) => setquantity(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "40px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      className="rounded py-2 px-3"
                      id="register"
                      style={{ backgroundColor: "#f0f0f0" }}
                    >
                      <a href="#">
                        <b>Note for delivery</b>
                      </a>
                      <input
                        type="Type the note here"
                        defaultValue=""
                        value={deliveryNote}
                        onChange={handleDeliveryNote}
                        style={{ backgroundColor: "#f0f0f0", border: "none" }}
                      />
                    </div>
                  </div>
                  <div
                    className="h5 font-weight-bold text-primary"
                    style={{
                      marginTop: "40px",
                      marginBottom: "10px",
                      top: "auto",
                    }}
                  >
                    Total cost
                  </div>
                  <h4>0đ</h4>
                </div>
                <button type="button" class="btn btn-success">
                  Create Order
                </button>
              </div>
            </div>
          </div>
          <div className="text-muted">
            <span className="fas fa-lock"></span>
            Your information is save
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
