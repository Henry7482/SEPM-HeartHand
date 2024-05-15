import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Organizationpage from "../assets/Organization-bg.jpg";
import Draggable from 'react-draggable';
import { useAuthContext } from "../hooks/useAuthContext";
import './organization.css';

function Organization() {
  const [organizations, setOrganizations] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchOrganizations = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
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

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setOrganizations(jsonData);
        console.log("Organizations Data from server:", JSON.stringify(jsonData));
      } catch (err) {
        console.error("Error from server:", err.message);
      }
    };

    if (user) {
      fetchOrganizations();
    }
  }, [user]);

  const columns = {
    North: [],
    South: [],
    Middle: []
  };

  organizations.forEach(org => {
    columns[org.domain].push(org);
  });

  const renderColumn = (column) => (
    <Draggable axis="y" handle=".handle">
      <div className="column" style={{ overflowY: 'auto', maxHeight: '100%' }}>
        {column.map((organization, index) => (
          <div key={index} className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded organization-card mb-2 handle" style={{ minWidth: '300px', maxWidth: '400px' }}>
            <div>
              <h3 className='fs-2'>{organization.name}</h3>
              <p className='fs-5'>{organization.domain}</p>
            </div>
            <img src={organization.logo} alt={organization.name} width="100" height="100" />
          </div>
        ))}
      </div>
    </Draggable>
  );

  return (
    <>
      <Header />
      <div className='container-fluid position-relative'>
        <img src={Organizationpage} className="img-fluid" alt="Organization" style={{ width: "100%" }} />

        <div className="card text-bg position-absolute" style={{ top: "100%", left: "20%", transform: "translate(-50%, -50%)", maxWidth: "30rem", zIndex: "1" }}>
          <div className="bg-black p-2 text-white" style={{ fontSize: "40px", fontStyle: "italic" }}>Funding and Donor</div>
          <div className="bg-black p-2 text-white" style={{ opacity: "0.7" }}>
            <p className="card-text" style={{ fontSize: "17px", fontStyle: "italic" }}>Since HearHand has no independent source of funds, all donations either in cash or in-kind must be accompanied by the cash needed to move, manage and monitor HearHand food assistance. HearHand's funding comes from:</p>
          </div>
        </div>
      </div>

      <div className='container-fluid' style={{ marginTop: '100px', width: '60%', textAlign: "left" }}>
        <h1>Corporations</h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>
            Through corporate-giving programmes, individual companies can make a vital contribution to fighting hunger. Corporate donations of cash, product or services can help free up scarce resources to help WFP feed more hungry people. In turn, corporations engage their employees, customers and other stakeholders in a vital, life-saving mission.
          </p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>
              Recent donations from private and not-for-profit entities have included frontline support to several emergency operations; expertise to enhance WFP's logistics and fundraising capacities; and critical cash for school feeding.
              <a href="partner-with-us" style={{ color: 'rgba(216, 92, 1, 1)', cursor: 'pointer', width: 'fit-content' }} >Partner with us</a>
            </p>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-4">
            <h3>South</h3>
            <div style={{ width: '350px', height: '50vh', borderRight: '2px solid #ccc', overflowY: 'hidden' }}>
              {renderColumn(columns.South)}
            </div>
          </div>
          <div className="col-4">
            <h3>Middle</h3>
            <div style={{ width: '350px', height: '50vh', borderRight: '2px solid #ccc', overflowY: 'hidden' }}>
              {renderColumn(columns.Middle)}
            </div>
          </div>
          <div className="col-4">
            <h3>North</h3>
            <div style={{ width: '350px', height: '50vh', overflowY: 'hidden' }}>
              {renderColumn(columns.North)}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '50px' }}>
          <h1>Individuals</h1>
          <p>Individuals can make a difference in the lives of the hungry. A personal donation can provide:</p>
          <ul>
            <li>Emergency food rations during a crisis</li>
            <li>Special food for hungry children in schools</li>
            <li>Food incentives to encourage poor families to send their girls to school</li>
            <li>Food as payment for people to rebuild schools, roads and other infrastructure in the wake of conflicts and natural disasters</li>
          </ul>
          <p>Individuals can also support WFP's work in other ways. <a href="learn-more" style={{ color: 'rgba(216, 92, 1, 1)', cursor: 'pointer', width: 'fit-content' }}>Learn more</a></p>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto" style={{ marginBottom: "30px" }}>
          <button className="btn btn-warning" type="button">Donate here</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Organization;
