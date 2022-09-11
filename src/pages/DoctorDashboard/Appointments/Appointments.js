import React from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout/AdminLayout";
import { useSelector } from "react-redux";
import appointments from "../../../utils/data/appointmens.json";
import users from "../../../utils/data/users.json";
import { Table } from "react-bootstrap";

function Appointments(props) {
  const { user } = useSelector((state) => state.auth);
  let currentUser = user["0"];
  let docApp = appointments.appointments.filter(
    (app) => app.docid === currentUser.id
  );

  return (
    <AdminLayout layoutFor={props.layoutFor}>
      <section>
        <h1 className="text-secondary">Appointments</h1>
        <main className="container mt-5">
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
              {docApp && docApp.length > 0
                ? docApp.map((app, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{currentUser.name}</td>
                      <td>
                        {" "}
                        {
                          users.users.find((user) => user.id === app.patientid)
                            .name
                        }
                      </td>
                      <td>{app.time}</td>
                      <td>{app.status}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </main>
      </section>
    </AdminLayout>
  );
}

export default Appointments;
