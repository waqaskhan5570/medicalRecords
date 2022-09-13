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
import UpdatePatientInfo from "../../components/UpdatePatientInfo/UpdatePatientInfo";

function PatientDashboard(props) {
  const { user } = useSelector((state) => state.auth);
  const [currentUser, setUser] = useState(null);
  const [patientApp, setPatientApp] = useState(null);
  const [show, setShow] = useState(false);
  const [appId, setAppId] = useState(null);
  const [appShow, setAppShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [updateShow, setUpdateShow] = useState(false);
  const [inputs, setInputs] = useState({});

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

  const updateModalOpen = () => {
    setUpdateShow(true);
  };
  const updateModalClose = () => {
    setUpdateShow(false);
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
    const selected = users.users.filter((us) => us.id === user["0"].id);
    setUser(selected["0"]);
  }, [user, show]);

  useEffect(() => {
    if (currentUser) {
      setPatientApp(
        appointments.appointments.filter(
          (app) => app.patientid === currentUser.id
        )
      );
    }
  }, [currentUser, user]);

  const handleUpdateSubmit = () => {
    for (const obj of users.users) {
      if (obj.id === currentUser.id) {
        if (inputs.email && inputs.email.length > 0) {
          obj.email = inputs.email;
          toast.success("Email Updated");
        }

        if (inputs.pnumber && inputs.pnumber.length > 0) {
          obj.pnumber = inputs.pnumber;
          toast.success("Phone Updated");
        }

        if (inputs.newPassword && inputs.newPassword.length > 0) {
          if (inputs.oldPassword === obj.password) {
            obj.password = inputs.newPassword;
            toast.success("Password Updated");
          } else {
            toast.error("Incorrect old password, Password didn't Change");
          }
        }
        break;
      }
    }
    updateModalClose();
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

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
                    <Button variant="outline-warning" onClick={updateModalOpen}>
                      Update
                    </Button>
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
      <UpdatePatientInfo
        show={updateShow}
        closeModal={updateModalClose}
        handleUpdateSubmit={handleUpdateSubmit}
        inputChangeHandler={inputChangeHandler}
      />
    </AdminLayout>
  );
}

export default PatientDashboard;
