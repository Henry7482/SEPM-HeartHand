import React from 'react';
import Nav from './Nav';
import DonationTable from './DonationTable'; // Import the DonationTable component
import { useEffect, useState } from 'react';
import { useSessionReset } from '../hooks/useSessionReset';

function Dashboard({ Toggle }) {
  const [numGeneratedBlogs, setNumGeneratedBlogs] = useState(0); // Initialize state for number of generated blogs
  const [numOrganizations, setNumOrganizations] = useState(0); // Initialize state for number of organizations
  const [numDonations, setNumDonations] = useState(0); // Initialize state for number of donations
  const { resetSession } = useSessionReset(); // Import the useSessionReset hook
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.log('Access token not found. Please login again.');
        return;
      }
      try {
        const response = await fetch(
          "https://hearthand.onrender.com/api/v1/organizations",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 401) {
          resetSession();
        }

        const jsonData = await response.json();

        if (!response.ok) {
          console.log("Network response was not ok", jsonData.message);
          return;
        }

        setNumOrganizations(jsonData.length);
        console.log(
          "Number of organizations from server:",
          JSON.stringify(jsonData.length)
        );
      } catch (err) {
        console.error("Error from server:", err.message);
      }
      try {
        const response = await fetch(
          "https://hearthand.onrender.com/api/v1/donations",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 401) {
          resetSession();
        }

        const jsonData = await response.json();

        if (!response.ok) {
          console.log("Failed to fetch data from server");
          return;
        }
        setNumDonations(jsonData.length);
        // console.log("Data from server:", JSON.stringify(jsonData));
        console.log("Number of donations from server:", JSON.stringify(jsonData.length));
      } catch (err) {
        console.error("Error from server:", err.message);
      }

      try {
        const response = await fetch(
          "https://hearthand.onrender.com/api/v1/blogs"
        );

        if (response.status === 401) {
          resetSession();
        }

        const jsonData = await response.json();

        if (!response.ok) {
          console.log("Failed to fetch data from server");
          return;
        }
        setNumGeneratedBlogs(jsonData.length);
        console.log(
          "Number of Blogs from server:",
          JSON.stringify(jsonData.length)
        );
      } catch (err) {
        console.error("Error from server:", err.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <div className='container-fluid'>
        <div className='row g-3 my-2'>
          <div className='col-md-4'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>{numGeneratedBlogs}</h3>
                <p className='fs-5'>Articles</p>
              </div>
              <i className='bi bi-newspaper p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>{numDonations}</h3>
                <p className='fs-5'>Donations</p>
              </div>
              <i className='bi bi-box2-heart p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>{numOrganizations}</h3>
                <p className='fs-5'>Organization</p>
              </div>
              <i className='bi bi-building-fill-add p-3 fs-1'></i>
            </div>
          </div>
        </div>
      </div>
      <DonationTable /> {/* Use the DonationTable component */}
    </div>
  );
}

export default Dashboard;
