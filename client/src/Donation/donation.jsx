import React, {useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Donate from "../assets/donate.jpg";
import Children from "../assets/children.jpg";
import { useAuthContext } from "../hooks/useAuthContext";

function Donation() {
  const [donations, setDonations] = useState([]);
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [quantityStatus, setQuantityStatus] = useState('');
  const [organization, setOrganization] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [description, setDescription] = useState('');
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchUserDonations = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }
      try {
        const response = await fetch(
          `https://hearthand.onrender.com/api/v1/donations/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setDonations(jsonData);
        console.log("User Donations from server:", JSON.stringify(jsonData));
      } catch (err) {
        console.error("Error from server:", err.message);
      }
    };

    if (user) {
      fetchUserDonations();
    }
  }, [user]);

  const handleSend = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const formData = new FormData();
    formData.append('productType', productType);
    formData.append('productName', productName);
    formData.append('quantityStatus', quantityStatus);
    formData.append('organization', organization);
    formData.append('description', description);
    if (productImage) {
      formData.append('productImage', productImage);
    }

    try {
      const response = await fetch(
        `https://hearthand.onrender.com/api/v1/donations`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const responseData = await response.json();
      console.log("Donation sent:", responseData);
      // Optionally clear the form
      setProductType('');
      setProductName('');
      setQuantityStatus('');
      setOrganization('');
      setProductImage(null);
      setDescription('');
    } catch (err) {
      console.error("Error from server:", err.message);
    }
    
  };
  
  

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
            <button className="nav-link active btn btn-outline-warning" id="donation-tab" data-bs-toggle="tab" data-bs-target="#donation" type="button" role="tab" aria-controls="donation" aria-selected="true"
            style={{width:"55vh", color:"black", fontFamily:"Arial",height:"7vh",fontSize:"20px" }}>DONATION</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link btn btn-outline-warning" id="your-donate-tab" data-bs-toggle="tab" data-bs-target="#your-donate" type="button" role="tab" aria-controls="your-donate" aria-selected="false"
             style={{width:"55vh", color:"black", fontFamily:"Arial",height:"7vh",fontSize:"20px" }}>YOUR DONATE</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="donation" role="tabpanel" aria-labelledby="donation-tab">
            <table className="table mt-3" style={{textAlign:"left"}}>
              <tbody>
                <div className="card rounded float-end" style={{width: "30rem",marginRight:"50px"}}>
                  <img src={Children} className="card-img-top" alt="children"/>
                  <div className="card-body">
                    <p className="card-text" style={{fontFamily:"Arial"}}>Your contribution helps a lot for children in difficult circumstances</p>
                  </div>
                </div>
                <h1 style={{fontSize:"30px"}}>Giving your Heart with people</h1>
                <h2 style={{fontSize:"20px"}}>You are about to become a HeartHand supporter</h2>
                <h4>Product Details</h4>
                <div className="col-md-6">
                  <div className="form-field">
                    <label>Product Type:</label>
                    <select className="form-select" value={productType} onChange={(e) => setProductType(e.target.value)}>
                      <option value="">Select product type</option>
                      <option value="Food">Food</option>
                      <option value="Cloth">Cloth</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-field">
                    <label>Product Name:</label>
                    <input type="text" className="form-control" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-field">
                    <label>Quantity/Status:</label>
                    <input type="text" className="form-control" placeholder="Enter quantity or status" value={quantityStatus} onChange={(e) => setQuantityStatus(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-field">
                    <label>Organization:</label>
                    <select className="form-select" value={organization} onChange={(e) => setOrganization(e.target.value)}>
                      <option value="">Select organization</option>
                      <option value="Organization 1">Organization 1</option>
                      <option value="Organization 2">Organization 2</option>
                      {/* Add more organizations as needed */}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-field">
                    <label>Picture of Product:</label>
                    <input type="file" className="form-control" accept="image/*" onChange={(e) => setProductImage(e.target.files[0])} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label htmlFor="floatingTextarea2">Description</label>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <button className="btn btn-outline-warning" onClick={handleSend}>Send</button>
                </div>
              </tbody>
            </table>
          </div>
          <div className="tab-pane fade" id="your-donate" role="tabpanel" aria-labelledby="your-donate-tab">
            <table className="table mt-3">
            <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th>Quantity/Status</th>
                  <th>Organization</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Shipping Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <tr key={donation._id}>
                    <td>{index + 1}</td>
                    <td>{donation.product_name}</td>
                    <td>{donation.product_category}</td>
                    <td>{donation.product_quantity}</td>
                    <td>{donation.organization_name}</td>
                    <td>{donation.description}</td>
                    <td>{donation.shippingStatus}</td>
                    <td>
                      <img src={donation.imageUrl} alt="Product" style={{ width: '90px', height: '70px' }} />
                    </td>
                  </tr>
                ))}
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
