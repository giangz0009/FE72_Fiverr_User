import instance from "app/instance";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBreadcrumbs from "../../SearchBreadcrumbs";
import Grid from "@mui/material/Unstable_Grid2";

import lodashIsEmpty from "lodash.isempty";

import styles from "./styles.module.scss";
import JobDetailsOverView from "./JobDetailsOverView";
import LoadingPage from "common/components/LoadingPage";
import JobDetailsAbout from "./JobDetailsAbout";
import JobDetailsSeller from "./JobDetailsSeller";
import JobDetailsFAQ from "./JobDetailsFAQ";
import JobDetailsReviewRatting from "./JobDetailsReviewRatting";
import JobDetailsComments from "./JobDetailsComments";
import JobDetailsPayment from "./JobDetailsPayment";
import useWindowSize from "common/hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetCommentsListAction } from "features/booking/action";

function JobDetailsMain() {
  const params = useParams();
  const jobId = params.jobId;

  // useState
  const [breadcrumbsLinkList, setBreadcrumbsLinkList] = useState([]);
  const [jobDetailsData, setJobDetailData] = useState({});
  const [sellerData, setSellerData] = useState({});
  const [commentsDataFilter, setCommentsDataFilter] = useState([]);
  const [activeRate, setActiveRate] = useState(null);

  const { width } = useWindowSize();

  // useCallback
  const cbSetActiveRate = useCallback((value) => {
    setActiveRate(value);
  }, []);

  // useDispatch
  const dispatch = useDispatch();

  // useSelector
  const commentsData = useSelector(
    (state) => state.bookingReducer.commentsList
  );

  // useEffect
  useEffect(() => {
    (async () => {
      try {
        // Call Api to get Job Detail
        const resJobDetails = await instance.request({
          url: `/api/cong-viec/lay-cong-viec-chi-tiet/${jobId}`,
          method: "GET",
        });

        const { tenLoaiCongViec, tenChiTietLoai } =
          resJobDetails.data.content[0];
        const { nguoiTao, id } = resJobDetails.data.content[0].congViec;

        // Call Api to get Seller Info
        const resSeller = await instance.request({
          url: `/api/users/${nguoiTao}`,
          method: "GET",
        });

        dispatch(fetchSetCommentsListAction(id));

        setSellerData(resSeller.data.content);

        // setJobDetailsData
        setJobDetailData(resJobDetails.data.content[0]);

        // From res got JobTypeDetailId
        const jobTypeDetailId =
          resJobDetails.data.content[0].congViec.maChiTietLoaiCongViec;

        // Call api to get Job Type Detail List
        const resJobTypeDetail = await instance.request({
          url: `/api/chi-tiet-loai-cong-viec`,
          method: "GET",
        });

        // From Job Type Detail List find Job Type Id
        const jobTypeId = resJobTypeDetail.data.content.find(
          (jobTypeDetail) => {
            const isFoundJobTypeDetailId = !!jobTypeDetail.dsChiTietLoai.find(
              (job) => job.id === jobTypeDetailId
            );

            if (isFoundJobTypeDetailId) return true;
            return false;
          }
        )?.maLoaiCongviec;

        // Set Breadcrumbs link
        setBreadcrumbsLinkList([
          {
            content: "FIVERR",
            link: "/",
          },
          {
            content: tenLoaiCongViec,
            link: `/search/categories/${jobTypeId}`,
          },
          {
            content: tenChiTietLoai,
            link: `/search/categories/${jobTypeId}/${jobTypeDetailId}`,
          },
        ]);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (!commentsData) return;
    if (!activeRate) setCommentsDataFilter(commentsData);
    else {
      const res = commentsData.filter(
        (comment) => comment.saoBinhLuan === activeRate
      );
      setCommentsDataFilter(res);
    }
  }, [activeRate, commentsData]);

  if (lodashIsEmpty(jobDetailsData)) return <LoadingPage />;

  return (
    <div className={styles.jobDetailsMainWrapper}>
      <Grid spacing={4} container>
        <Grid xs={12} md={8}>
          <div className={styles.jobDetailsMain}>
            <SearchBreadcrumbs breadcrumbsLinkList={breadcrumbsLinkList} />
            <JobDetailsOverView jobDetailsData={jobDetailsData} />
            {width < 900 && (
              <JobDetailsPayment jobDetailsData={jobDetailsData} />
            )}
            <JobDetailsAbout jobDetailsData={jobDetailsData} />
            <JobDetailsSeller sellerData={sellerData} />
            <JobDetailsFAQ />
            <div name="jobDetailsReview">
              <JobDetailsReviewRatting
                jobDetailsData={jobDetailsData}
                commentsData={commentsData || []}
                activeRate={activeRate}
                setActiveRate={cbSetActiveRate}
              />
              <JobDetailsComments
                commentsData={commentsDataFilter}
                activeRate={activeRate}
                setActiveRate={cbSetActiveRate}
              />
            </div>
          </div>
        </Grid>
        {width >= 900 && (
          <Grid xs={0} md={4}>
            <div className={styles.jobDetailPayment}>
              <JobDetailsPayment jobDetailsData={jobDetailsData} />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default JobDetailsMain;
