import React, { useEffect, useRef, useState } from "react";
import "./AdminLayout.css";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

function AdminLayout(props) {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const leftSideRef = useRef(null);

  useEffect(() => {
    if (leftSideRef.current) {
      setSidebarWidth(leftSideRef.current.offsetWidth);
    }
  }, [leftSideRef]);
  return (
    <div className="admin_dashboard">
      <div className="row">
        <div className="LeftSide col-lg-2" ref={leftSideRef}>
          <Sidebar sidebarWidth={sidebarWidth} layoutFor={props.layoutFor} />
        </div>
        <div className="RightSide col">
          <div className="top_bar">
            <Topbar />
          </div>
          <main className="page_body">{props.children}</main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
