import React, { memo } from "react";

import styles from "./styles.module.scss";

function JobDetailsAbout({ jobDetailsData }) {
  const { moTa, moTaNgan } = jobDetailsData.congViec;

  return (
    <div className={styles.jobDetailsAbout} name="jobDetailsAbout">
      <h1>About This Gig</h1>
      <div className={styles.jobDetailsAboutMain}>
        <p>{moTaNgan}</p>
        <p>{moTa}</p>
        <div className={styles.moreDesc}>
          <h3>Why you should Order from me?</h3>
          <ul>
            <li>Get best UI/UX layout for your websites.</li>
            <li>It's help you to find your dream design.</li>
            <li>Modern,Clean and professional look of your site.</li>
            <li>Flat,Material,Parallax,Metro UI/UX web layouts.</li>
          </ul>
        </div>
        <div className={styles.moreDesc}>
          <h3>Please Note:</h3>
          <ul>
            <li>Deliver design in PNG,PSD,JPEG format with high dpi.</li>
            <li>Deliver fully layered and sliced PSD files.</li>
            <li>Website layout from scratch with my unique creativity.</li>
            <li>High resolution with 100% colors accuracy. </li>
            <li>
              Extra fast delivery & 100% Customer satisfaction & friendly
              support :){" "}
            </li>
          </ul>
        </div>
        <p>Looking forward to work with you!</p>
      </div>
      <ul>
        <li>
          <p>Website type</p>
          <ul>
            <li>E-Commerce</li>
            <li>Educational</li>
            <li>Product & service marketing</li>
          </ul>
        </li>
        <li>
          <p>Platform & tool</p>
          <ul>
            <li>Adobe XD</li>
            <li>Adobe Photoshop</li>
            <li>Adobe Illustrator</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default memo(JobDetailsAbout);
