import React from 'react';
import './blog.css';


const BlogPage = () => {
    // Placeholder for background image and article details
    const backgroundImage = 'https://via.placeholder.com/1920x1080'; 
    const article = {
        title: 'Demand veterinarians accompany every live export shipment.',
        readers: 100 
    };
    

    return (
        <div className="blog-page">
            

            <div 
                className="background-image"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="detail-box">
                    <h1>{article.title}</h1>
                    <hr />
                    <p>{article.readers} people have read this article</p>
                </div>
            </div>



        </div>
    );
}

export default BlogPage;
