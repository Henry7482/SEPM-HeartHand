import React from "react";
import Header from '../header/header.jsx';
import Body from '../body/body.tsx';
import Footer from '../footer/footer.tsx';

const HomePage = () => {
    return (
    <div className="home-page">
        <Header />
        <Body />
        <Footer />
    </div>
    );
}

export default HomePage;