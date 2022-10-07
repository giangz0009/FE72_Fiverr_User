import React from "react";
import { Outlet } from "react-router-dom";

function Search() {
  return (
    <div style={{ marginTop: 130, paddingBlock: 40 }}>
      <Outlet />
    </div>
  );
}

export default Search;
