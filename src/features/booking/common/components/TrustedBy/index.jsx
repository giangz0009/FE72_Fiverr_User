import { Container } from "@mui/material";
import React from "react";
import trustedByImg1 from "assets/images/perseus/facebook.31d5f92.png";
import trustedByImg2 from "assets/images/perseus/google.517da09.png";
import trustedByImg3 from "assets/images/perseus/netflix2x.887e47e.png";
import trustedByImg4 from "assets/images/perseus/pandg.8b7310b.png";
import trustedByImg5 from "assets/images/perseus/paypal.ec56157.png";

import "./globayStyle.scss";

const listImg = [
  trustedByImg1,
  trustedByImg2,
  trustedByImg3,
  trustedByImg4,
  trustedByImg5,
];

function TrustedBy() {
  return (
    <div className="trustedBy">
      <Container maxWidth="lg">
        <div className="trustedByWrap">
          <h3>Trusted by:</h3>
          <div className="trustedByList">
            {listImg.map((item, index) => (
              <img key={index} src={item} alt="trusted by" />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TrustedBy;
