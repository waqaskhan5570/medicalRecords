import React from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import { times } from "../../utils/data/constant";

function MakeAppointment({ show, modalClose, time, setTime, handleSubmit }) {
  return (
    <>
      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make Appoitment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Time</InputGroup.Text>
            <Form.Select
              placeholder="time"
              aria-label="time"
              aria-describedby="basic-addon1"
              name="time"
              onChange={(e) => setTime(e.target.value)}
            >
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
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

export default MakeAppointment;
