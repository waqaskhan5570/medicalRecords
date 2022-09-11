import React, { useState } from "react";
import ContainerLayout from "../../components/Layouts/ContainerLayout/ContainerLayout";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  DOC_LOGIN_SUCCESS,
} from "../../store/auth";
import AuthForm from "../../components/UI/Forms/Form";
import { toast } from "react-toastify";
import formData from "../../utils/formFields/signup-data.json";
import users from "../../utils/data/users.json";

function Registration() {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    id: users.users.length + 1,
    name: "",
    email: "",
    password: "",
    role: "",
    dob: "",
    gender: "",
    pnumber: "",
    medicalBackground: "",
    nationality: "",
    address: "",
  });
  const { isDoc, isPatient, isLoggingIn } = useSelector((state) => state.auth);

  if (isDoc) {
    return <Navigate to="/doctor-dashboard" />;
  }

  if (isPatient) {
    return <Navigate to="/patient-dashboard" />;
  }

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LOGIN_REQUEST());
    let found = users.users.some((user) => user.email === loginData.email);
    if (found) {
      toast.error("User already Exist");
      dispatch(LOGIN_FAILURE());
    } else {
      if (loginData.role.toLowerCase() === "doc") {
        users.users.push(loginData);
        dispatch(DOC_LOGIN_SUCCESS(loginData));
      } else if (loginData.role.toLowerCase() === "patient") {
        users.users.push(loginData);
        dispatch(LOGIN_SUCCESS(loginData));
      } else {
        toast.error("invalid Role Entered");
        dispatch(LOGIN_FAILURE());
      }
    }
  };

  console.log(loginData);
  return (
    <ContainerLayout>
      {" "}
      <main className="auth-wrapper">
        <section className="auth-sections">
          <div className="row">
            <div className="d-flex justify-content-center">
              <section className="main-section">
                <div className="welcome-message">
                  <h2 className="text-center text-secondary">Registration</h2>
                </div>
                <div className="m-4">
                  <AuthForm
                    data={formData}
                    handleSubmit={handleSubmit}
                    inputChangeHandler={(e) => inputChangeHandler(e)}
                    btnText="Register"
                    loading={isLoggingIn}
                    values={loginData}
                  />
                </div>
                <div>
                  <p>Already have an account ? </p>
                  <Link to="/">Login Here</Link>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </ContainerLayout>
  );
}

export default Registration;
