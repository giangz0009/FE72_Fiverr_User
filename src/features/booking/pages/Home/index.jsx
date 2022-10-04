import Carousel from "features/booking/common/components/Carousel";
import MainCategories from "features/booking/common/components/MainCategories";
import SellingProPosition from "features/booking/common/components/SellingProposition";
import Testimonials from "features/booking/common/components/Testimonials";
import TrustedBy from "features/booking/common/components/TrustedBy";
import React from "react";

function Home() {
  return (
    <div className="home">
      <Carousel />
      <TrustedBy />
      <SellingProPosition />
      <Testimonials />
      <MainCategories />
    </div>
  );
}

export default Home;
