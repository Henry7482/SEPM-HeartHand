import React from "react";
import "./body.css";

const Body = () => {
  return (
    <div className="body-container">
      <div className="page-name">
        <h2>Latest News</h2>
        <p className="italic-line">Get the perspective and insights that improve the lives for people in our nation</p>
      </div>
      <div className="home-page"> 
        <img src="picture1.png" alt="Home" className="home-picture" /> 
      </div>
      <div className="blog-detail">
        <img src="news-picture.jpg" alt="Home" className="news-picture" />
        <div className="blog-content">
          <h2>Mưa lớn gây lũ lụt nghiêm trọng tại Sydney, Australia</h2>
          <p>VTV.vn - Khu vực Đông Nam Australia đã phải hứng chịu mưa lớn từ ngày 4/4 và sẽ tiếp tục kéo dài đến sáng 6/4 (theo giờ địa phương), gây ngập lụt trên diện rộng...</p>
        </div>
      </div>
      <div className="news-picture">
        <img src="news-picture.jpg" alt="Home" className="news-picture" />
        <div className="blog-content">
          <h2>Mưa lớn gây lũ lụt nghiêm trọng tại Sydney, Australia</h2>
          <p>VTV.vn - Khu vực Đông Nam Australia đã phải hứng chịu mưa lớn từ ngày 4/4 và sẽ tiếp tục kéo dài đến sáng 6/4 (theo giờ địa phương), gây ngập lụt trên diện rộng...</p>
        </div>
      </div>
      <div className="blog-detail">
        <img src="news-picture.jpg" alt="Home" className="news-picture" />
        <div className="blog-content">
          <h2>Mưa lớn gây lũ lụt nghiêm trọng tại Sydney, Australia</h2>
          <p>VTV.vn - Khu vực Đông Nam Australia đã phải hứng chịu mưa lớn từ ngày 4/4 và sẽ tiếp tục kéo dài đến sáng 6/4 (theo giờ địa phương), gây ngập lụt trên diện rộng...</p>
        </div>
      </div>
    </div>
  );
};

export default Body;

