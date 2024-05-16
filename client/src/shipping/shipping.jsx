import React, { useEffect, useState } from "react";
import "./shipping.css";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../header/header";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import { useSessionReset } from "../hooks/useSessionReset";

const CheckoutPage = () => {
  const { user } = useAuthContext();
  const { resetSession } = useSessionReset();
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState("default");
  const [districts, setDistricts] = useState([]);
  const [selectedSenderDistrict, setSelectedSenderDistricts] = useState(0);
  const [selectedSenderProvince, setSelectedSenderProvince] = useState(0);
  const [selectedOrganizationDistrict, setSelectedOrganizationDistricts] =
    useState(0);
  const [selectedOrganizationProvince, setSelectedOrganizationProvince] =
    useState(0);
  const [selectedSenderWards, setSelectedSenderWards] = useState(0);
  const [selectedOrganizationWards, setSelectedOrganizationWards] = useState(0);

  const [deliveryNote, setDeliveryNote] = useState(null);
  const [donationContent, setDonationContent] = useState(null);
  const [senderName, setSenderName] = useState(null);
  const [senderPhoneNumber, setSenderPhoneNumber] = useState(null);
  const [senderAddress, setSenderAddress] = useState(null);
  const [organizationName, setorganizationName] = useState(null);
  const [organizationPhoneNumber, setorganizationPhoneNumber] = useState(null);
  const [organizationAddress, setorganizationAddress] = useState(null);
  const [senderwards, setSenderWards] = useState([]);
  const [organizationwards, setOrganizationWards] = useState([]);
  const [totalmass, settotalmass] = useState("");
  const [length, setlength] = useState(null);
  const [wide, setwide] = useState(null);
  const [height, setheight] = useState(null);
  const [totalvalueofgoods, settotalvalueofgoods] = useState(null);
  const [productname, setproductname] = useState(null);
  const [mass, setmass] = useState("");
  const [quantity, setquantity] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [fee, setFee] = useState(0);
  const [serviceId, setServiceId] = useState(null);
  let minRequiredMass = 0;
  const [creatingOrder, setCreatingOrder] = useState(false);

  const handleDeliveryNote = (event) => {
    const note = event.target.value;
    setDeliveryNote(note);
  };

  const handleDonationContent = (event) => {
    const content = event.target.value;
    setDonationContent(content);
  };

  const fetchServiceId = async () => {
    try {
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
            from_district: Number(selectedSenderDistrict),
            to_district: Number(selectedOrganizationDistrict),
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch service ID:", response);
        return null;
      }

      const data = await response.json();

      let serviceId;
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        serviceId = data.data[0].service_id;
      }
      console.log("Service ID:", serviceId);
      setServiceId(serviceId);
      return serviceId;
    } catch (error) {
      console.error("Error fetching service ID:", error);
    }
  };

  const calculateCost = async () => {
    try {
      // console.log("Fee data", JSON.stringify({
      //   from_district_id: Number(selectedSenderDistrict),
      //   from_ward_code: String(selectedSenderWards),
      //   service_id: Number(serviceId),
      //   service_type_id: null,
      //   to_district_id: Number(selectedOrganizationDistrict),
      //   to_ward_code: String(selectedOrganizationWards),
      //   height: Number(height),
      //   length: Number(length),
      //   weight: Number(totalmass),
      //   width: Number(wide),
      //   insurance_value: Number(totalvalueofgoods),
      //   cod_failed_amount: null,
      //   coupon: null,
      // }));

      const response = await fetch(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
          },
          body: JSON.stringify({
            from_district_id: Number(selectedSenderDistrict),
            from_ward_code: String(selectedSenderWards),
            service_id: Number(serviceId),
            service_type_id: null,
            to_district_id: Number(selectedOrganizationDistrict),
            to_ward_code: String(selectedOrganizationWards),
            height: Number(height),
            length: Number(length),
            weight: Number(mass),
            width: Number(wide),
            insurance_value: Number(totalvalueofgoods),
            cod_failed_amount: null,
            coupon: null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch fee:", data);
        return null;
      }
      setFee(data.data.total);
    } catch (error) {
      console.error("Error fetching fee:", error);
    }
  };

  const handleSubmit = (event) => {
    setCreatingOrder(true);
    event.preventDefault();
    createOrder();
  };

  const createOrder = async () => {
    const formData = {
      note: deliveryNote,
      sender: {
        name: senderName,
        phone: senderPhoneNumber,
        address: senderAddress,
        ward: convertWardIdToName(selectedSenderWards, "sender"),
        district: convertDistrictIdToName(selectedSenderDistrict),
        province: convertProvinceIdToName(selectedSenderProvince),
      },
      organization: {
        name: organizationName,
        phone: organizationPhoneNumber,
        address: organizationAddress,
        ward_code: String(selectedOrganizationWards),
        district_id: Number(selectedOrganizationDistrict),
      },
      package: {
        weight: Number(totalmass),
        length: Number(length),
        width: Number(wide),
        height: Number(height),
        insurance_value: Number(totalvalueofgoods),
      },
      service_id: Number(serviceId),
      pick_shift: [Number(selectedShift)],
      content: donationContent,
      items: [
        {
          name: productname,
          code: "",
          weight: Number(mass),
          quantity: Number(quantity),
          price: Number(totalvalueofgoods),
          category: {
            level1: "donation",
          },
        },
      ],
    };

    console.log("Form data:", JSON.stringify(formData));
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Access token not found. Please login again.");
      setCreatingOrder(false);
      return;
    }

    try {
      const response = await fetch(
        "https://hearthand.onrender.com/api/v1/delivery/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.status === 401) {
        resetSession();
      }

      if (!response.ok) {
        console.error(
          "Failed to create order. Please check all information:",
          data
        );
        alert(
          "Failed to create order. Please check all information ",
          data.message
        );
        setCreatingOrder(false);
        return null;
      }
      console.log("Order created:", data);
      alert("Order created successfully");
      setCreatingOrder(false);
      window.location.href = "/Donation";
    } catch (error) {
      console.error("Error creating order:", error);
      alert(
        "Failed to create order. Please check all information ",
        error.message
      );
      setCreatingOrder(false);
    }
  };

  const handleSelectShift = (event) => {
    const selectedId = event.target.value;
    setSelectedShift(selectedId);
    console.log("Selected shift:", selectedId);
  };

  const fetchShifts = async () => {
    try {
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
    } catch (e) {
      console.error("Error fetching shifts:", e);
    }
  };

  useEffect(() => {
    fetchShifts();
    fetchSenderWards();
    fetchOrganizationWards();
    fetchDistricts();
    fetchProvinces();
    calculateCost();
    fetchServiceId();
    minRequiredMass = mass * quantity;
    // console.log("minmass", minRequiredMass);
    checkTotalMass();
    // console.log("Selected Sender district Name:", convertDistrictIdToName(selectedSenderDistricts));
    // console.log(
    //   "Selected Organization district:",
    //   convertDistrictIdToName(selectedOrganizationDistricts)
    // );
    // console.log(
    //   "Selected Sender ward Name:",
    //   convertWardIdToName(selectedSenderWards,"sender")
    // );
    // console.log(
    //   "Selected Organization ward Name:",
    //   convertWardIdToName(selectedOrganizationWards,"organization")
    // );
    // console.log("Selected province Name:", convertProvinceIdToName(selectedSenderProvince));
  }, [
    selectedSenderDistrict,
    selectedOrganizationDistrict,
    selectedShift,
    selectedSenderProvince,
    selectedOrganizationProvince,
    selectedSenderWards,
    selectedOrganizationWards,
    deliveryNote,
    donationContent,
    senderName,
    senderPhoneNumber,
    senderAddress,
    organizationName,
    organizationPhoneNumber,
    organizationAddress,
    totalmass,
    length,
    wide,
    height,
    totalvalueofgoods,
    productname,
    mass,
    quantity,
    selectedSenderWards,
    selectedOrganizationWards,
  ]);

  // if (!shifts) {
  //   console.log("No shifts found");
  // } else {
  //   // console.log("Shifts found", JSON.stringify(shifts));
  // }

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

  const displaySenderDistricts = (districts) => {
    if (Array.isArray(districts) && districts.length > 0) {
      return districts.map((district) => (
        <option key={district.DistrictID} value={district.DistrictID}>
          {district.DistrictName}
        </option>
      ));
    } else {
      return <option value={0}>No district found</option>;
    }
  };

  const displayOrganizationDistricts = (districts) => {
    if (Array.isArray(districts) && districts.length > 0) {
      return districts.map((district) => (
        <option key={district.DistrictID} value={district.DistrictID}>
          {district.DistrictName}
        </option>
      ));
    } else {
      return <option value={0}>No district found</option>;
    }
  };

  const handleSelectSenderDistricts = (event) => {
    const selectedId = event.target.value;
    setSelectedSenderDistricts(selectedId);
    console.log("Selected Sender district:", selectedId);
  };

  const convertDistrictIdToName = (districtId) => {
    const district = districts.find((item) => item.DistrictID === districtId);
    if (!district) {
      return "No district found";
    }
    return district.DistrictName;
  };

  const handleSelectOrganizationDistricts = (event) => {
    const selectedId = event.target.value;
    setSelectedOrganizationDistricts(selectedId);
    console.log("Selected Organization shift:", selectedId);
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

  const displayProvinces = () => {
    if (Array.isArray(provinces) && provinces.length > 0) {
      return provinces.map((province) => (
        <option key={province.ProvinceID} value={province.ProvinceID}>
          {province.ProvinceName}
        </option>
      ));
    } else {
      return <option value={0}>No province found</option>;
    }
  };

  const convertProvinceIdToName = (provinceId) => {
    const province = provinces.find((item) => item.ProvinceID === provinceId);
    if (!province) {
      return "No province found";
    }
    return province.ProvinceName;
  };

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

  const fetchSenderWards = async () => {
    try {
      const response = await fetch(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
          },
          body: JSON.stringify({
            district_id: Number(selectedSenderDistrict),
          }),
        }
      );
      const data = await response.json();
      setSenderWards(data.data);
    } catch {
      console.log("Error fetching sender wards");
    }
  };
  const fetchOrganizationWards = async () => {
    try {
      const response = await fetch(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
          },
          body: JSON.stringify({
            district_id: Number(selectedOrganizationDistrict),
          }),
        }
      );

      if (!response.ok) {
        console.log("Failed to fetch ward ID:", response);
        return null;
      }
      const data = await response.json();
      // console.log("Org Wards", data.data);
      setOrganizationWards(data.data);
    } catch (error) {
      console.error("Error fetching organization wards:", error);
    }
  };

  const displayWards = (wards) => {
    if (Array.isArray(wards) && wards.length > 0) {
      return wards.map((ward) => (
        <option key={ward.WardCode} value={ward.WardCode}>
          {ward.WardName}
        </option>
      ));
    } else {
      return <option value={0}>No ward found</option>;
    }
  };

  const convertWardIdToName = (wardId, role) => {
    try {
      if (role === "sender") {
        const senderWard = senderwards.find((item) => item.WardCode === wardId);
        if (senderWard) {
          return senderWard.WardName;
        } else {
          return "No ward found";
        }
      }
      if (role === "organization") {
        const organizationWard = organizationwards.find(
          (item) => item.WardCode === wardId
        );
        if (organizationWard) {
          return organizationWard.WardName;
        } else {
          return "No ward found";
        }
      }
    } catch (error) {
      return "No ward found";
    }
  };

  const handleSelectSenderWards = (event) => {
    const selectedId = event.target.value;
    setSelectedSenderWards(selectedId);
    console.log("Selected Sender ward:", selectedId);
  };

  const handleSelectOrganizationWards = (event) => {
    const selectedId = event.target.value;
    setSelectedOrganizationWards(selectedId);
    console.log("Selected Organization ward:", selectedId);
  };

  const handleSetTotalMass = (event) => {
    const mass = event.target.value;
    settotalmass(mass);
    // console.log("Total mass:", mass);
  };
  const handleQuantityChange = (event) =>
    setquantity(Number(event.target.value));
  const handleMassChange = (event) => setmass(Number(event.target.value));

  const checkTotalMass = () => {
    if (totalmass < minRequiredMass) {
      alert(`Total mass must be equal or greater than ${minRequiredMass}`);
      settotalmass(minRequiredMass);
      return;
    }
  };

  const checkAuth = () => {
    if (user) {
      return (
        <>
          <Header />
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <div className="h2 large my-3">Donation Form</div>
              <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-0 offset-md-2 offset-sm-1">
                  <div className="mobile h5">Shipping Address</div>
                  <div id="details" className="bg-white rounded pb-5">
                    <div className="h5 font-weight-bold text-primary">
                      Sending
                    </div>
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
                              onChange={(e) =>
                                setSenderPhoneNumber(e.target.value)
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
                              value={senderAddress}
                              onChange={(e) => setSenderAddress(e.target.value)}
                            />
                          </div>
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
                            <option disabled selected value={0}>
                              Choose a province
                            </option>
                            {displayProvinces(provinces)}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>District</label>
                          <select
                            name="district"
                            id="district"
                            value={selectedSenderDistrict}
                            onChange={handleSelectSenderDistricts}
                          >
                            <option disabled selected value={0}>
                              Choose a district
                            </option>
                            {displaySenderDistricts(districts)}
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Ward</label>
                          <select
                            name="province"
                            id="province"
                            value={selectedSenderWards}
                            onChange={handleSelectSenderWards}
                          >
                            <option disabled selected value={0}>
                              Choose a ward
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
                              onChange={(e) =>
                                setorganizationName(e.target.value)
                              }
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
                          <label>Province</label>
                          <select
                            name="province"
                            id="province"
                            value={selectedOrganizationProvince}
                            onChange={handleSelectOrganizationProvince}
                          >
                            <option disabled selected value={0}>
                              Choose a province
                            </option>
                            {displayProvinces(provinces)}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>District</label>
                          <select
                            name="country"
                            id="country"
                            value={selectedOrganizationDistrict}
                            onChange={handleSelectOrganizationDistricts}
                          >
                            <option disabled selected value={0}>
                              Choose a district
                            </option>
                            {displayOrganizationDistricts(districts)}
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Ward</label>
                          <select
                            name="province"
                            id="province"
                            value={selectedOrganizationWards}
                            onChange={handleSelectOrganizationWards}
                          >
                            <option disabled selected value={0}>
                              Choose a ward
                            </option>
                            {displayWards(organizationwards)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div
                      className="rounded py-2 px-3"
                      id="form-group"
                      style={{ backgroundColor: "#f0f0f0" }}
                    >
                      <div className="h5 text-primary">
                        <b>Donation content</b>
                      </div>
                      <textarea
                        className="form-control input-lg"
                        defaultValue=""
                        value={donationContent}
                        onChange={handleDonationContent}
                        style={{
                          backgroundColor: "#f0f0f0",
                          border: "none",
                          height: "5rem",
                          overflow: "auto",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-0 offset-md-2 offset-sm-1 pt-lg-0 pt-3">
                  <div className="text-muted pt-3" id="mobile">
                    <span className="fas fa-lock"></span>
                    Your information is save
                  </div>
                  <div id="address" className="bg-light rounded">
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
                        type="number"
                        className="form-control"
                        value={totalmass}
                        onChange={handleSetTotalMass}
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
                        <input
                          type="number"
                          defaultValue=""
                          className="form-control"
                          value={mass}
                          onChange={handleMassChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-muted">Quantity</label>
                        <input
                          type="number"
                          defaultValue=""
                          className="form-control"
                          value={quantity}
                          onChange={handleQuantityChange}
                        />
                      </div>
                      <div
                        className="rounded py-2 px-3"
                        id="form-group"
                        style={{ backgroundColor: "#f0f0f0" }}
                      >
                        <div className="h5 text-primary">
                          <b>Notes for delivery</b>
                        </div>
                        <textarea
                          className="form-control input-lg"
                          defaultValue=""
                          value={deliveryNote}
                          onChange={handleDeliveryNote}
                          style={{
                            backgroundColor: "#f0f0f0",
                            border: "none",
                            height: "5rem",
                            overflow: "auto",
                          }}
                        />
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
                      <h4>{fee}đ</h4>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-success"
                      disabled={creatingOrder}
                    >
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
    } else {
      return (
        <>
          <Header />
          <Link to="/DonorLogin" style={{ textDecoration: "none" }}>
            <h1>Please login before accessing this page.</h1>
          </Link>
          <Footer />
        </>
      );
    }
  };

  return <>{checkAuth()}</>;
};

export default CheckoutPage;
