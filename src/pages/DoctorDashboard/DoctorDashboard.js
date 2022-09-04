import React from "react";
import AdminLayout from "../../components/Layouts/AdminLayout/AdminLayout";

function DoctorDashboard(props) {
  return (
    <AdminLayout layoutFor={props.layoutFor}>
      <section>
        <h1 className="text-secondary">Doctor Dashboard</h1>
      </section>
    </AdminLayout>
  );
}

export default DoctorDashboard;
