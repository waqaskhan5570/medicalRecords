import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DocProtectedRoute from "./utils/ProtectedRoute/DocProtectedRoute";
import PatientProtectedRoute from "./utils/ProtectedRoute/PatientProtectedRoute";

import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import PatientDashboard from "./pages/PatientDashboard/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard/DoctorDashboard";

function App() {
  const { isDoc, isPatient } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route
          path="/patient-dashboard"
          element={
            <PatientProtectedRoute isPatient={isPatient}>
              <PatientDashboard layoutFor="patient" />
            </PatientProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <DocProtectedRoute isDoc={isDoc}>
              <DoctorDashboard layoutFor="patient" />
            </DocProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
