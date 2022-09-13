import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UpdatePatientInfo(props) {
  const { show, closeModal, handleUpdateSubmit, inputChangeHandler } = props;
  return (
    <>
      {" "}
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
                onChange={(e) => inputChangeHandler(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number"
                name="pnumber"
                required
                onChange={(e) => inputChangeHandler(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="oldPassword"
                required
                onChange={(e) => inputChangeHandler(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="4">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="newPassword"
                required
                onChange={(e) => inputChangeHandler(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePatientInfo;
