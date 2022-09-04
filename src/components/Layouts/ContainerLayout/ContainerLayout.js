import React from "react";
import "./ContainerLayout.css";
import NavigationBar from "../../NavigationBar/NavigationBar";

function ContainerLayout(props) {
  return (
    <div className="main-container">
      <div className="main-navbar">
        <NavigationBar />
      </div>
      <div className="main-body">{props.children}</div>
    </div>
  );
}

export default ContainerLayout;
