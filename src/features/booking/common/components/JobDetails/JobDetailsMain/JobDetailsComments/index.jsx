import { Avatar, Rating, TextareaAutosize } from "@mui/material";
import BasicRating from "common/components/BasicRatting";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import lodashIsEmpty from "lodash.isempty";

import "./globalStyles.scss";
import { useParams } from "react-router-dom";
import { fetchAddCommentAction } from "features/booking/action";

const getToDay = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  return formattedToday;
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.slice(0, 1).toUpperCase()}`,
  };
}

function JobDetailsComments({ commentsData, activeRate, setActiveRate }) {
  // useParams
  const params = useParams();
  const jobId = params.jobId;
  // useState
  const [value, setValue] = useState(0);
  const [commentText, setCommentText] = useState("");
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const authProfile = useSelector((state) => state.authReducer.authProfile);

  const handleOnclickComment = async () => {
    const data = {
      ngayBinhLuan: getToDay(),
      maCongViec: jobId,
      noiDung: commentText.trim(),
      saoBinhLuan: value,
    };

    await dispatch(fetchAddCommentAction(data, jobId));

    setValue(0);
    setCommentText("");
  };

  const renderUserComment = () => {
    if (!lodashIsEmpty(authProfile)) {
      const { avatar, name } = authProfile;
      return (
        <div className="userComment">
          <div className="header">
            <div className="avatar">
              {avatar ? (
                <img src={avatar} alt="Avatar" />
              ) : (
                <Avatar {...stringAvatar(`${name}`)} />
              )}
            </div>
            <div className="ratting">
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
          </div>
          <div className="main">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Minimum 3 rows"
              style={{ width: 200 }}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <div className="footerAction">
            <button
              onClick={handleOnclickComment}
              disabled={commentText.trim() === "" || value === 0}
            >
              Comment
            </button>
          </div>
        </div>
      );
    }
  };

  const renderComments = () => {
    if (commentsData.length === 0)
      return <p>There are no comments yet for this product</p>;

    return commentsData.map((comment, index) => {
      const { avatar, noiDung, saoBinhLuan, tenNguoiBinhLuan, ngayBinhLuan } =
        comment;

      return (
        <div key={index} className="comment">
          <div className="avatar">
            {!avatar ? (
              <Avatar {...stringAvatar(`${tenNguoiBinhLuan}`)} />
            ) : (
              <img src={avatar} alt="avatar" />
            )}
          </div>
          <div className="main">
            <div className="userInfo">
              <h3>{tenNguoiBinhLuan}</h3>
            </div>
            <div className="ratting">
              <BasicRating initialValue={saoBinhLuan} size="small" />
              <span className="rattingAmount">{saoBinhLuan}</span>
              <span className="time">{ngayBinhLuan}</span>
            </div>
            <div className="commentContent">
              <p>{noiDung}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="jobDetailsComments">
      <div className="filter">
        <h3>Filter</h3>
        <p>
          Filtering by:
          {activeRate !== null && (
            <>
              {activeRate} Starts
              <span onClick={() => setActiveRate(null)}> Clear All</span>
            </>
          )}
        </p>
      </div>
      {renderUserComment()}
      <div className="commentsMain">{renderComments()}</div>
    </div>
  );
}

export default memo(JobDetailsComments);
