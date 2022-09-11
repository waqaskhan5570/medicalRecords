import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import { FaCopy, FaThLarge, FaTimesCircle, FaSignOutAlt } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { LOGOUT_SUCCESS } from "../../../../store/auth";

function Sidebar(props) {
  const [isSlider, setIsSlider] = useState(false);
  const sidebarRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.screen.width < 991) {
      setIsSlider(true);
    }
  }, []);

  const closeSlider = () => {
    sidebarRef.current.style.transform = "scaleX(0)";
  };

  return (
    <div
      id="adminSidebar"
      ref={sidebarRef}
      className={`Sidebar ${isSlider ? "slider" : ""}`}
      style={{ width: isSlider ? "80%" : `${props.sidebarWidth}px` }}
    >
      <div className="Sidebar-Body">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={logo} alt="logo" />
          </div>
          <button
            className="close-sidebar-btn d-lg-none d-block"
            onClick={closeSlider}
          >
            <FaTimesCircle />
          </button>
        </div>

        {props.layoutFor === "patient" ? (
          <div className="navigation">
            <div className="navigation-item">
              <Link
                to="/patient-dashboard"
                className={
                  window.location.pathname === "/patient-dashboard"
                    ? "navigation-link active"
                    : "navigation-link"
                }
              >
                <div className="item-icon">
                  <FaCopy />
                </div>
                <div className="item-text">Dashboard</div>
              </Link>
            </div>
            <div className="navigation-item">
              <Link
                to="/patient-dashboard/medical-records"
                className={
                  window.location.pathname ===
                  "/patient-dashboard/medical-records"
                    ? "navigation-link active"
                    : "navigation-link"
                }
              >
                <div className="item-icon">
                  <FaCopy />
                </div>
                <div className="item-text">Medical Records</div>
              </Link>
            </div>

            <div className="navigation-item">
              <Link
                to="/patient-dashboard/doctors"
                className={
                  window.location.pathname === "/patient-dashboard/doctors"
                    ? "navigation-link active"
                    : "navigation-link"
                }
              >
                <div className="item-icon">
                  <MdPostAdd />
                </div>
                <div className="item-text">Doctors</div>
              </Link>
            </div>

            <div className="navigation-item">
              <button
                className="logout_button navigation-link"
                onClick={() => dispatch(LOGOUT_SUCCESS())}
              >
                <div className="item-icon">
                  <FaSignOutAlt />
                </div>
                <div className="item-text">Log out</div>
              </button>
            </div>
          </div>
        ) : (
          <div className="navigation">
            <div className="navigation-item">
              <Link
                to="/doctor-dashboard/appointments"
                className={
                  window.location.pathname === "/doctor-dashboard/appointments"
                    ? "navigation-link active"
                    : "navigation-link"
                }
              >
                <div className="item-icon">
                  <MdPostAdd />
                </div>
                <div className="item-text">Appointments</div>
              </Link>
            </div>

            <div className="navigation-item">
              <button
                className="logout_button navigation-link"
                onClick={() => dispatch(LOGOUT_SUCCESS())}
              >
                <div className="item-icon">
                  <FaSignOutAlt />
                </div>
                <div className="item-text">Log out</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
