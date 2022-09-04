import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import "./NavigationBar.css";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_SUCCESS } from "../../store/auth";
import { FaSignOutAlt } from "react-icons/fa";

function NavigationBar() {
  const { isDoc, isPatient } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <nav className="navigationBar-wrapper">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} alt="logo" width="60px" height="60px" />
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Item>Patient Medical Record</Nav.Item>
          </Nav>
          <Nav>
            {isDoc ||
              (isPatient && (
                <Nav>
                  <Button
                    onClick={() => dispatch(LOGOUT_SUCCESS())}
                    variant="danger"
                  >
                    <FaSignOutAlt />
                  </Button>
                </Nav>
              ))}
          </Nav>
        </Container>
      </Navbar>
    </nav>
  );
}

export default NavigationBar;
