import React from "react";
import Navbar from "../navbar/Navbar";
import "./style.css";

const Cover = () => {
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="cover-container">
        <h1 className="cover-title">
          <b>Welcome</b>
        </h1>
        <img
          src="https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg"
          alt=""
          className="cover-image"
        />
      </div>
    </div>
  );
};

export default Cover;
