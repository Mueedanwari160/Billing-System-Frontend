import React from "react";
import ShowAllBill from "../components/ShowAllBill";
import { NavLink } from "react-router-dom";

const AllBill = () => {
  return (
    <div>
      <NavLink to="/" className="show_all_bill_navLink">
        HOME
      </NavLink>
      <ShowAllBill />
    </div>
  );
};

export default AllBill;
