import { Avatar } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import React from "react";

import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import instance from "app/instance";

import FormData from "form-data";
import { authActionTypes } from "features/auth/action";

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

function SellerCard() {
  const dispatch = useDispatch();
  const authProfile = useSelector((state) => state.authReducer.authProfile);

  const handleOnChangeAvatar = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith("image/")) {
        try {
          const form = new FormData();
          form.append("formFile", file);

          const res = await instance.request({
            url: "/api/users/upload-avatar",
            method: "POST",
            data: form,
            headers: {
              "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
            },
          });

          dispatch(
            authActionTypes.setAuthProfile({ avatar: res.data.content.avatar })
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const { avatar } = authProfile;

  return (
    <div className={styles.sellerCard}>
      <div className={styles.sellerInfo}>
        <div className={styles.avatar}>
          {avatar ? (
            <img src={avatar} alt="Avatar" />
          ) : (
            <Avatar {...stringAvatar(`Giang`)} />
          )}
          <input type="file" accept="image/*" onChange={handleOnChangeAvatar} />
        </div>
        <h1>Giang</h1>
        <span className={styles.status}>
          <CircleIcon fontSize="small" />
          Online
        </span>
      </div>
      <ul className={styles.sellerStatsDesc}>
        <li>
          <span>
            <LocationOnIcon />
            From
          </span>
          <b>Vietnam</b>
        </li>
        <li>
          <span>
            <PersonIcon />
            Member since
          </span>
          <b>17/01/2017</b>
        </li>
      </ul>
    </div>
  );
}

export default SellerCard;
