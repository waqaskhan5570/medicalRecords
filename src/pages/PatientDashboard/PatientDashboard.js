import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout/AdminLayout";
import { useSelector } from "react-redux";
import appointments from "../../utils/data/appointmens.json";
import { Table, Card, Button } from "react-bootstrap";
import users from "../../utils/data/users.json";
import malePlaceHolder from "../../assets/images/male.jpeg";
import femalePlaceHolder from "../../assets/images/female.jpg";
import AddMedicalRecord from "../../components/AddMedicalRecord/AddMedicalRecord";
import { toast } from "react-toastify";
import { createDateAndTimeFromISO } from "../../utils/helpers";
import ResheduleAppointment from "../../components/ResheduleAppointment/ResheduleAppointment";

function PatientDashboard(props) {
  const { user } = useSelector((state) => state.auth);
  const [currentUser, setUser] = useState(null);
  const [patientApp, setPatientApp] = useState(null);
  const [show, setShow] = useState(false);
  const [appId, setAppId] = useState(null);
  const [appShow, setAppShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const modalClose = () => {
    setShow(false);
  };
  const modalOpen = () => {
    setShow(true);
  };

  const appModalOpen = (id) => {
    setAppShow(true);
    setAppId(id);
  };

  const appModalClose = () => {
    setAppShow(false);
    setAppId(null);
  };

  const handleSubmit = () => {
    toast.success("Medical Record Added");
    modalClose();
  };

  const reschedule = () => {
    for (const obj of appointments.appointments) {
      if (obj.id === appId) {
        obj.time = startDate;
        break;
      }
    }
    appModalClose();
    toast.success(createDateAndTimeFromISO(startDate));
  };

  useEffect(() => {
    setUser(user["0"]);
  }, [user]);

  useEffect(() => {
    if (currentUser) {
      setPatientApp(
        appointments.appointments.filter(
          (app) => app.patientid === currentUser.id
        )
      );
    }
  }, [currentUser, user]);

  return (
    <AdminLayout layoutFor={props.layoutFor}>
      <section>
        <h1 className="text-secondary">Patient Dashboard</h1>
        <div className="row">
          <div className="col-10">
            <div className="m-5">
              {currentUser && (
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={
                      currentUser.gender === "Male"
                        ? malePlaceHolder
                        : femalePlaceHolder
                    }
                  />
                  <Card.Body>
                    <Card.Title>{currentUser.name}</Card.Title>
                    <Card.Text>{currentUser.email}</Card.Text>
                    <Card.Text>{currentUser.gender}</Card.Text>
                    <Card.Text>{currentUser.pnumber}</Card.Text>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
          <div className="col-2">
            <Button variant="outline-success" onClick={modalOpen}>
              Add Medical Record
            </Button>
          </div>
        </div>
        <h3 className="m-5">My Appointments</h3>
        {patientApp && patientApp.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Time</th>
                <th>Status</th>
                <th>Reschedule</th>
              </tr>
            </thead>
            <tbody>
              {patientApp.map((app, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>
                    {" "}
                    {users.users.find((user) => user.id === app.docid).name}
                  </td>
                  <td>{currentUser.name}</td>
                  <td>{createDateAndTimeFromISO(app.time)}</td>
                  <td>{app.status}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => appModalOpen(app.id)}
                    >
                      Reschedule
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          "No Appointments Made"
        )}
      </section>
      <AddMedicalRecord
        show={show}
        modalClose={modalClose}
        handleSubmit={handleSubmit}
      />
      <ResheduleAppointment
        show={appShow}
        modalClose={appModalClose}
        handleSubmit={reschedule}
        startDate={startDate}
        setStartDate={setStartDate}
      />
    </AdminLayout>
  );
}

export default PatientDashboard;
