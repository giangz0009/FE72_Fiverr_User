import { Container } from "@mui/material";
import React, { useRef } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import img from "assets/images/selling-proposition/selling-proposition-still-1400-x1.png";

import "./globalStyle.scss";
import VideoModal from "common/hocs/VideoModal";

const list = [
  {
    id: 0,
    title: "The best for every budget",
    content:
      "Find high-quality services at every price point. No hourly rates, just project-based pricing.",
  },
  {
    id: 1,
    title: "Quality work done quickly",
    content:
      "Find the right freelancer to begin working on your project within minutes.",
  },
  {
    id: 2,
    title: "Protected payments, every time",
    content:
      "Always know what you'll pay upfront. Your payment isn't released until you approve the work.",
  },
  {
    id: 3,
    title: "24/7 support",
    content:
      "Questions? Our round-the-clock support team is available to help anytime, anywhere.",
  },
];

function SellingProPosition() {
  const refVideoModal = useRef();

  return (
    <div className="sellingPropositionWrapper">
      <Container maxWidth="lg">
        <div className="sellingProposition">
          <div className="content">
            <h3>A whole world of freelance talent at your fingertips</h3>
            <ul>
              {list.map((item) => (
                <li key={item.id}>
                  <h6>
                    <CheckCircleOutlineIcon />
                    {item.title}
                  </h6>
                  <p>{item.content}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="videoModal">
            <img
              src={img}
              alt="Video teaser"
              onClick={() => refVideoModal.current.open()}
            />
            <button onClick={() => refVideoModal.current.open()}>
              <PlayArrowIcon />
            </button>
          </div>
        </div>
      </Container>
      <VideoModal
        ref={refVideoModal}
        src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7"
      />
    </div>
  );
}

export default SellingProPosition;
