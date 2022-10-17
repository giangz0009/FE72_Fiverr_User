import { Container } from "@mui/material";
import instance from "app/instance";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HerosBanner from "../HerosBanner";
import SearchBucket from "../SearchBucket";

function SearchJobType() {
  const params = useParams();
  const jobTypeId = params.jobTypeId;

  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.request({
          url: "/api/cong-viec/lay-chi-tiet-loai-cong-viec/" + jobTypeId,
          method: "GET",
        });

        setData(res.data.content[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [jobTypeId]);

  return (
    <div>
      <Container maxWidth="xl">
        <HerosBanner jobTypeId={jobTypeId} />
        <SearchBucket data={data} />
      </Container>
    </div>
  );
}

export default SearchJobType;
