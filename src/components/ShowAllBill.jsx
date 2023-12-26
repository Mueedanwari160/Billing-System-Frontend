import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import view from "../assets/view.png";
import remove from "../assets/remove.png";

const ShowAllBill = () => {
  const [allBills, setAllBills] = useState([]);

  const FetchAllBills = async () => {
    await axios
      .get("http://localhost:5000/billing-system/bill/all-bill")
      .then((res) => {
        setAllBills(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const deleteBill = await axios.delete(
        `http://localhost:5000/billing-system/bill/remove-bill/${id}`
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    FetchAllBills();
  }, [allBills]);

  return (
    <div className="view_all_bills_main_container">
      <div className="view_all_bills_table">
        <div className="table_head">
          <div className="table_head_text">NAME</div>
          <div className="table_head_text">TOTAL AMOUNT(Rs.)</div>
          <div className="table_head_text">DATE</div>
          <div className="table_head_text">ACTIONS</div>
        </div>
        <div className="table_body">
          {allBills.map((data, index) => {
            const dateString = data.date;
            const formattedDate = dateString.split("T")[0];
            return (
              <div className="table_row" key={index}>
                <div className="table_row_text">{data.userName}</div>
                <div className="table_row_text amount">{data.totalAmount}</div>
                <div className="table_row_text ">{formattedDate}</div>
                <div className="table_row_actions">
                  <NavLink to={`/view-bill/${data._id}`}>
                    <img src={view} alt="view" />
                  </NavLink>
                  <div
                    className="table_row_remove"
                    onClick={() => handleDelete(data._id)}
                  >
                    <img src={remove} alt="remove" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ShowAllBill;
