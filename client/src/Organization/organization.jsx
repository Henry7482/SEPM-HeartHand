import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Organizationpage from "../assets/Organization-bg.jpg";

function Organization() {
  return (
    <>
      <Header />
      <div className='container-fluid position-relative'>
        {/* Image background */}
        <img src={Organizationpage} className="img-fluid" alt="Organization" style={{width:"100%"}}/>

        <div className="card text-bg position-absolute" style={{ top: "100%", left: "20%", transform: "translate(-50%, -50%)", maxWidth: "30rem", zIndex: "1" }}>
          <div className="bg-black p-2 text-white" style={{fontSize: "40px", fontStyle:"italic"}}>Funding and Donor</div>
          <div className="bg-black p-2 text-white" style={{opacity: "0.7"}}>
            <p className="card-text" style={{fontSize: "17px", fontStyle:"italic"}}>Since HearHand has no independent source of funds, all donations either in cash or in-kind must be accompanied by the cash needed to move, manage and monitor HearHand food assistance. HearHand's funding comes from:</p>
          </div>
        </div>
      </div>       
      <Footer />
    </>
  );
}

export default Organization;
