import React, { useState } from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

function Home({ articles, handleAccept, handleDelete, Toggle }) {
  const [selectedImage, setSelectedImage] = useState({});

  const handleImageChange = (articleId, event) => {
    const file = event.target.files[0];
    setSelectedImage(prev => ({ ...prev, [articleId]: file }));
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <div className='container'>
        {articles.map((article) => (
          <div key={article._id} className="article-container my-3 p-3 bg-light">
            <h2>{article.title}</h2>
            <p><i>{article.shortform}</i></p>
            <p>Date Published: {formatDate(article.date)}</p>
            <div className="mb-3">
              <input type="file" onChange={(e) => handleImageChange(article._id, e)} />
              {selectedImage[article._id] && (
                <img
                  src={URL.createObjectURL(selectedImage[article._id])}
                  alt="Selected"
                  style={{ width: '100px', height: '100px' }}
                />
              )}
            </div>
            <button onClick={() => handleAccept(article._id, selectedImage[article._id])} className="btn btn-success">Accept</button>
            <button onClick={() => handleDelete(article._id)} className="btn btn-danger">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
