import React from "react";
import { Modal, Button, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { createDateAndTimeFromISO } from "../../utils/helpers";

function ResheduleAppointment({
  show,
  modalClose,
  startDate,
  setStartDate,
  handleSubmit,
}) {
  return (
    <>
      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appoitment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Date and Time</InputGroup.Text>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              showTimeSelect
            />
          </InputGroup>
          <p>{createDateAndTimeFromISO(startDate)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Make
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResheduleAppointment;
