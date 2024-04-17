import React from 'react';
import './blog.css';
import Donate from '../blogPage/donatebox'
import Header from '../header/header'
import Footer from '../footer/footer';


const BlogPage = () => {
    // Placeholder for background image and article details
    const backgroundImage = 'https://via.placeholder.com/1920x1080'; 
    const article = {
        title: 'Demand veterinarians accompany every live export shipment.',
        readers: 100 
    };
    

    return (
        <div className="blog-page">
            <Header/>

            <div 
                className="background-image"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="detail-box">
                    <h1>{article.title}</h1>
                    <hr />
                    <p>{article.readers} people have read this article</p>
                </div>
                <Donate/>
            </div>

            <Footer/>
        </div>


    );
}

export default BlogPage;
