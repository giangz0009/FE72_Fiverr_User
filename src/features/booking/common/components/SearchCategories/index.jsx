import instance from "app/instance";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import lodashIsEmpty from "lodash.isempty";
import { Container } from "@mui/material";
import JobsList from "../JobsList";
import PagePagination from "../PagePagination";
import FilterJobsList from "../FilterJobsList";

function SearchCategories() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [pageConfig, setPageConfig] = useState({
    currPage: searchParams.get("page") || 1,
    pageSize: 12,
    totalCount: null,
  });

  const [data, setData] = useState([]);
  const [jobsList, setJobsList] = useState([]);

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
        const res = await instance.request({
          url:
            "/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/" + params.jobId,
          method: "GET",
        });

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
  }, [params.jobId, getJobsOfCurrPage, setPageTotalCount]);

  useEffect(() => {
    if (lodashIsEmpty(data)) return;
    setJobsList(getJobsOfCurrPage(data));
  }, [pageConfig.currPage, data, getJobsOfCurrPage]);

  return (
    <div>
      <Container maxWidth="xl">
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

export default SearchCategories;
