import React from "react";
import AdminLayout from "../../components/Layouts/AdminLayout/AdminLayout";
import { useSelector } from "react-redux";
import appointments from "../../utils/data/appointmens.json";
import { Table } from "react-bootstrap";
import users from "../../utils/data/users.json";

function PatientDashboard(props) {
  const { user } = useSelector((state) => state.auth);
  let currentUser = user;
  let patientApp = appointments.appointments.filter(
    (app) => app.patientid === user.id
  );

  console.log(user);
  return (
    <AdminLayout layoutFor={props.layoutFor}>
      <section>
        <h1 className="text-secondary">Patient Dashboard</h1>
        <h3 className="m-5">My Appointments</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {patientApp && patientApp.length > 0
              ? patientApp.map((app, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>
                      {" "}
                      {users.users.find((user) => user.id === app.docid).name}
                    </td>
                    <td>{currentUser.name}</td>
                    <td>{app.time}</td>
                    <td>{app.status}</td>
                  </tr>
                ))
              : "NO Appointments Made"}
          </tbody>
        </Table>
      </section>
    </AdminLayout>
  );
}

export default PatientDashboard;
