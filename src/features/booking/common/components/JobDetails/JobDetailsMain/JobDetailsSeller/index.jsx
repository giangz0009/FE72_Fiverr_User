import React, { memo } from "react";
import lodashIsEmpty from "lodash.isempty";
import LoadingPage from "common/components/LoadingPage";
import CircleIcon from "@mui/icons-material/Circle";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import BasicRating from "common/components/BasicRatting";

function JobDetailsSeller({ sellerData }) {
  if (lodashIsEmpty(sellerData)) return <LoadingPage />;

  const { avatar, name, skill } = sellerData;
  const randomRatting = Math.floor(Math.random() * 5) + 1;
  const randomRattingAmount = Math.floor(Math.random() * 100) + 1;

  return (
    <div className={styles.JobDetailsSeller} name="jobDetailsSeller">
      <h1>About The Seller</h1>
      <div className={styles.profileInfo}>
        <div className={styles.image}>
          <img src={avatar} alt={name} />
        </div>
        <div className={styles.label}>
          <div className={styles.sellerName}>
            <Link to="/">{name}</Link>
            <div className={`${styles.status} ${styles.online}`}>
              <span>
                <CircleIcon />
              </span>
              Online
            </div>
          </div>
          <div className={styles.skills}>
            <p>{skill.map((item) => item)}</p>
          </div>
          <div className={styles.ratting}>
            <BasicRating initialValue={randomRatting} size="small" />
            <span>{randomRatting}</span>
            <span>({randomRattingAmount})</span>
          </div>
          <button>Contact Me</button>
        </div>
      </div>
      <div className={styles.statsDesc}>
        <ul>
          <li>
            From<strong>Pakistan</strong>
          </li>
          <li>
            Member since<strong>Jun 2016</strong>
          </li>
          <li>
            Avg. response time<strong>1 hour</strong>
          </li>
          <li>
            Last delivery<strong>about 46 minutes</strong>
          </li>
        </ul>
        <article>
          <div>
            <p>
              Hi, I am a Professional UI/UX designer and Top notch Web developer
              having experience of 5+ year's from all over the world in the
              field of User Interface and User Experience Designing.
            </p>
            <p>
              If you want a professional Web solution for your business then
              contact me and enjoy the sweet fruit of my skills in your
              web/application/product.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default memo(JobDetailsSeller);
