import React from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";

function ViewRecord(props) {
  const { show, modalClose } = props;
  return (
    <>
      {" "}
      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Verification Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Code</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={modalClose}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewRecord;
