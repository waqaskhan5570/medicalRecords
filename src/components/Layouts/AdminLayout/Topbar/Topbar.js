import React from "react";
import { FaBars } from "react-icons/fa";
import "./Topbar.css";

function Topbar() {
  const openDashboardSidebar = () => {
    const sliderNavbar = document.getElementById("adminSidebar");
    sliderNavbar.style.transform = "scaleX(1)";
  };
  return (
    <div className="topbar_wrapper">
      <div className="d-flex justify-content-between">
        <button
          className="bars-btn d-block d-lg-none"
          onClick={openDashboardSidebar}
        >
          <FaBars />
        </button>
      </div>
    </div>
  );
}

export default Topbar;
