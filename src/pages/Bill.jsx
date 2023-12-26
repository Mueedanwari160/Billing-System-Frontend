import React from "react";
import PrintBillPage from "../components/PrintBillPage";
import { NavLink } from "react-router-dom";

const Bill = () => {
  return (
    <div>
      <NavLink to="/all-bill" className="show_all_bill_navLink">
        View All Bills
      </NavLink>
      <PrintBillPage />
    </div>
  );
};

export default Bill;
