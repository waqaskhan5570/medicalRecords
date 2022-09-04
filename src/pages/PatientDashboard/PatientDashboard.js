import React from "react";
import AdminLayout from "../../components/Layouts/AdminLayout/AdminLayout";

function PatientDashboard(props) {
  return (
    <AdminLayout layoutFor={props.layoutFor}>
      <section>
        <h1 className="text-secondary">Patient Dashboard</h1>
      </section>
    </AdminLayout>
  );
}

export default PatientDashboard;
