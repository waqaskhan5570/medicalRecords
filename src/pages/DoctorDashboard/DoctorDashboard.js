import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout/AdminLayout";
import { Card, Button } from "react-bootstrap";
import malePlaceHolder from "../../assets/images/male.jpeg";
import femalePlaceHolder from "../../assets/images/female.jpg";
import { useSelector } from "react-redux";
import UpdateDocInfo from "../../components/UpdateDocInfo/UpdateDocInfo";
import { toast } from "react-toastify";
import users from "../../utils/data/users.json";

function DoctorDashboard(props) {
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [currentUser, setUser] = useState(null);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const selected = users.users.filter((us) => us.id === user["0"].id);
    setUser(selected["0"]);
  }, [user, show]);

  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = () => {
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
    closeModal();
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
        <h1 className="text-secondary">Doctor Dashboard</h1>
        <main className="container">
          {" "}
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
                <Card.Text>{currentUser.department}</Card.Text>

                <Card.Text>{currentUser.bio}</Card.Text>

                <Button variant="outline-warning" onClick={openModal}>
                  Update
                </Button>
              </Card.Body>
            </Card>
          )}
        </main>
      </section>
      <UpdateDocInfo
        show={show}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        inputChangeHandler={inputChangeHandler}
      />
    </AdminLayout>
  );
}

export default DoctorDashboard;
