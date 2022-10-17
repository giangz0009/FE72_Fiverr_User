import LoadingPage from "common/components/LoadingPage";
import React from "react";
import { useSelector } from "react-redux";
import SellerSegmentationForm from "./SellerSegmentationForm";

import styles from "./styles.module.scss";

function SellerSegmentation() {
  const authProfile = useSelector((state) => state.authReducer.authProfile);

  const renderFormBlock = () => {
    if (!authProfile) return <LoadingPage />;
    return (
      <>
        <SellerSegmentationForm
          title="Skills"
          inputPlaceHolder="Enter your Skill"
          emptyText="Add Your Skill"
          infoList={authProfile.skill}
          sellerObjectLabel="skill"
        />
        <SellerSegmentationForm
          title="Certification"
          inputPlaceHolder="Enter your Certification"
          emptyText="Add Your Certification"
          infoList={authProfile.certification}
          sellerObjectLabel="certification"
        />
      </>
    );
  };

  return <div className={styles.sellerSegmentation}>{renderFormBlock()}</div>;
}

export default SellerSegmentation;
