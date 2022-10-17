import instance from "app/instance";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import lodashIsEmpty from "lodash.isempty";
import { Container } from "@mui/material";
import JobsList from "../JobsList";
import PagePagination from "../PagePagination";
import FilterJobsList from "../FilterJobsList";
import SearchBreadcrumbs from "../SearchBreadcrumbs";

function SearchJobDetail() {
  const params = useParams();
  const jobTypeId = params.jobTypeId;
  const jobDetailId = params.jobDetailId;
  const [searchParams] = useSearchParams();
  const [pageConfig, setPageConfig] = useState({
    currPage: searchParams.get("page") || 1,
    pageSize: 12,
    totalCount: null,
  });

  const [data, setData] = useState([]);
  const [jobType, setJobType] = useState("");
  const [jobDetail, setJobDetail] = useState("");
  const [jobsList, setJobsList] = useState([]);

  const breadcrumbsLinkList = [
    {
      content: "FIVERR",
      link: "/",
    },
    {
      content: jobType,
      link: `/search/categories/${jobTypeId}`,
    },
    {
      content: jobDetail,
    },
  ];

  const cbSetPageConfig = useCallback((newValue) => {
    setPageConfig(newValue);
  }, []);

  const getJobsOfCurrPage = useCallback((arr) => {
    const { currPage, pageSize } = pageConfig;
    const startPos = (currPage - 1) * pageSize;
    const endPos = pageSize * currPage;
    const res = arr.slice(startPos, endPos);
    return res;
  }, []);

  const setPageTotalCount = useCallback((arr) => {
    const arrayLength = arr.length;

    const totalCount = Math.ceil(arrayLength / pageConfig.pageSize);

    setPageConfig((preState) => ({ ...preState, totalCount: totalCount }));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const resJobType = await instance.request({
          url: `/api/loai-cong-viec/${jobTypeId}`,
          method: "GET",
        });
        const resJobDetail = await instance.request({
          url: `/api/chi-tiet-loai-cong-viec/${jobDetailId}`,
          method: "GET",
        });
        const res = await instance.request({
          url: "/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/" + jobDetailId,
          method: "GET",
        });

        setJobType(resJobType.data.content.tenLoaiCongViec);
        setJobDetail(resJobDetail.data.content.tenChiTiet);

        // Sort 'res' by saoCongViec property
        const resSort = res.data.content
          .sort((a, b) => a.congViec.saoCongViec - b.congViec.saoCongViec)
          .reverse();

        // From sorted res find totalPage
        setPageTotalCount(resSort);

        // setData
        setData(resSort);

        setJobsList(getJobsOfCurrPage(resSort));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [jobDetailId, getJobsOfCurrPage, setPageTotalCount]);

  useEffect(() => {
    if (lodashIsEmpty(data)) return;
    setJobsList(getJobsOfCurrPage(data));
  }, [pageConfig.currPage, data, getJobsOfCurrPage]);

  return (
    <div>
      <Container maxWidth="xl">
        <SearchBreadcrumbs breadcrumbsLinkList={breadcrumbsLinkList} />
        <FilterJobsList />
        <JobsList jobsList={jobsList} />
        <PagePagination
          pageConfig={pageConfig}
          setPageConfig={cbSetPageConfig}
        />
      </Container>
    </div>
  );
}

export default SearchJobDetail;
