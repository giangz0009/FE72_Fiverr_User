import { fetchSetBookedJobAction } from "features/auth/action";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./styles.module.scss";
import UserActiveTabPanel from "./UserActiveTabPanel";
import UserActiveTabs from "./UserActiveTabs";

function UserActive() {
  const [value, setValue] = useState(0);

  const cbHandleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSetBookedJobAction);
  }, [dispatch]);

  return (
    <div className={styles.userActive}>
      <UserActiveTabs value={value} handleChange={cbHandleChange} />
      <UserActiveTabPanel value={value} />
    </div>
  );
}

export default UserActive;
