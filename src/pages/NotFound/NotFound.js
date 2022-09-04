import React from "react";
import { Button } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container d-flex justify-content-center">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className="error-actions">
              <Button
                onClick={() => navigate("/")}
                className="btn btn-primary btn-lg"
              >
                <FaHome />
                Take Me Home{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
