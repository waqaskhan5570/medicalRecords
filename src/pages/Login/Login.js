import React, { useState } from "react";
import ContainerLayout from "../../components/Layouts/ContainerLayout/ContainerLayout";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  DOC_LOGIN_SUCCESS,
} from "../../store/auth";
import AuthForm from "../../components/UI/Forms/Form";
import { toast } from "react-toastify";
import formData from "../../utils/formFields/login-data.json";
import users from "../../utils/data/users.json";

function Login() {
  console.log(users);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LOGIN_REQUEST());
    if (
      users.users.map(
        (user) =>
          user.email.toLowerCase() === loginData.email.toLowerCase() &&
          user.role === loginData.role.toLowerCase() &&
          user.password === loginData.password
      )
    ) {
      if (loginData.role.toLowerCase() === "doc") {
        dispatch(DOC_LOGIN_SUCCESS(loginData));
      } else if (loginData.role.toLowerCase() === "patient") {
        dispatch(LOGIN_SUCCESS(loginData));
      } else {
        toast.error("invalid Role Entered");
        dispatch(LOGIN_FAILURE());
      }
    } else {
      dispatch(LOGIN_FAILURE());
      toast.error("Invalid Credentials");
    }
  };

  return (
    <ContainerLayout>
      {" "}
      <main className="auth-wrapper">
        <section className="auth-sections">
          <div className="row">
            <div className="d-flex justify-content-center">
              <section className="main-section">
                <div className="welcome-message">
                  <h2 className="text-center text-secondary">Log In</h2>
                </div>
                <div className="m-4">
                  <AuthForm
                    data={formData}
                    handleSubmit={handleSubmit}
                    inputChangeHandler={(e) => inputChangeHandler(e)}
                    btnText="Login"
                    loading={isLoggingIn}
                    values={loginData}
                  />
                </div>
                <div>
                  <p>Don't have an account ? </p>
                  <Link to="/registration">Register Here</Link>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </ContainerLayout>
  );
}

export default Login;
