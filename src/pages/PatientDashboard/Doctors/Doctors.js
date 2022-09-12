import React, { useState } from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout/AdminLayout";
import { useSelector } from "react-redux";
import users from "../../../utils/data/users.json";
import { Card, Button } from "react-bootstrap";
import malePlaceHolder from "../../../assets/images/male.jpeg";
import femalePlaceHolder from "../../../assets/images/female.jpg";
import MakeAppointment from "../../../components/MakeAppointment/MakeAppointment";
import appointments from "../../../utils/data/appointmens.json";
import { toast } from "react-toastify";

function Doctors(props) {
  const { user } = useSelector((state) => state.auth);
  let currentUser = user["0"];
  let docs = users.users.filter((user) => user.role === "doc");
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDoc, setSelectedDoc] = useState(null);

  const modalOpen = (id) => {
    setShow(true);
    setSelectedDoc(id);
  };
  const modalClose = () => {
    setShow(false);
    setSelectedDoc(null);
    setStartDate(null);
  };

  const handleSubmit = () => {
    if (startDate && selectedDoc) {
      appointments.appointments.push({
        id: appointments.length + 1,
        docid: selectedDoc,
        patientid: currentUser.id,
        time: startDate,
        status: "Pending",
      });
      toast.success("Appointment Created");
      modalClose();
    } else {
      toast.warning("Select Time/Doc");
    }
  };

  return (
    <AdminLayout layoutFor={props.layoutFor}>
      <section>
        <h1 className="text-secondary">Doctors</h1>
        <main className="container mt-5">
          <div className="row">
            {docs.map((doc) => (
              <div className="col-12 col-md-6 col-lg-4">
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
                    <Card.Title>{doc.name}</Card.Title>
                    <Card.Text>{doc.email}</Card.Text>
                    <Card.Text>{doc.gender}</Card.Text>
                    <Card.Text>{doc.pnumber}</Card.Text>
                    <Card.Text>{doc.department}</Card.Text>
                    <Button
                      variant="secondary"
                      onClick={() => modalOpen(doc.id)}
                    >
                      Make Appointment
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </main>
        <MakeAppointment
          show={show}
          modalClose={modalClose}
          startDate={startDate}
          setStartDate={setStartDate}
          handleSubmit={handleSubmit}
        />
      </section>
    </AdminLayout>
  );
}

export default Doctors;
