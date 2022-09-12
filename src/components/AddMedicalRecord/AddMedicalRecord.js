import React from "react";
import { Modal, Button } from "react-bootstrap";

function AddMedicalRecord({ show, modalClose, handleSubmit }) {
  return (
    <>
      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Medical Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>Medical Records Here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Record
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMedicalRecord;
