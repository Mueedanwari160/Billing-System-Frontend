import React from "react";
import { NavLink } from "react-router-dom";
import ViewAllProducts from "../components/ViewAllProducts";

const Home = () => {
  return (
    <div className="home_main_container">
      <div className="main_heading">BILLING SYSTEM</div>

      <NavLink to="/add" className="home_main_container_first_navLink">
        ADD PRODUCT
      </NavLink>
      <NavLink to="/create-bill" className="home_main_container_second_navLink">
        MAKE BILL
      </NavLink>
      <NavLink to="/all-bill" className="home_main_container_third_navLink">
        VIEW ALL BILLS
      </NavLink>
      <ViewAllProducts />
    </div>
  );
};

export default Home;
