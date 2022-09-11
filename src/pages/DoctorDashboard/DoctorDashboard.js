import React, { useEffect } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout/AdminLayout";
import users from "../../utils/data/users.json";
import { Card } from "react-bootstrap";
import malePlaceHolder from "../../assets/images/male.jpeg";
import femalePlaceHolder from "../../assets/images/female.jpg";
import { useSelector } from "react-redux";

function DoctorDashboard(props) {
  const { user } = useSelector((state) => state.auth);
  let currentUser = user["0"];
  console.log(currentUser);

  return (
    <AdminLayout layoutFor={props.layoutFor}>
      <section>
        <h1 className="text-secondary">Doctor Dashboard</h1>
        <main className="container">
          {" "}
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
        </main>
      </section>
    </AdminLayout>
  );
}

export default DoctorDashboard;
