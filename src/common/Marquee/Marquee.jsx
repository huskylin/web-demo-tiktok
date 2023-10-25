import React from 'react';
import './Marquee.css';

function Marquee({ text }) {
  return (
    <>
      <div className="marquee-wrapper">
        <div className="marquee">
          <p>{text}</p>
          <p>{text}</p>
          <p>{text}</p>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}

export default Marquee;
