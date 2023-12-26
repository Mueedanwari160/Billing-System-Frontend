import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PrintBillPage = () => {
  const { id } = useParams();

  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [date, setDate] = useState("");
  const [itemsWithDetails, setItemsWithDetails] = useState([]);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const getBill = await axios.get(
          `http://localhost:5000/billing-system/bill/single-bill/${id}`
        );
        const fetchedBill = getBill.data.data;

        setUserName(fetchedBill.userName);
        setUserContact(fetchedBill.userContact);
        setTotalAmount(fetchedBill.totalAmount);

        const dateString = fetchedBill.date;
        const formattedDate = dateString.split("T")[0];
        setDate(formattedDate);

        const detailedItems = await Promise.all(
          fetchedBill.items.map(async (item) => {
            const getProduct = await axios.get(
              `http://localhost:5000/billing-system/single-product/${item.product}`
            );
            const fetchedProduct = getProduct.data.data;
            return { ...item, title: fetchedProduct.title };
          })
        );

        setItemsWithDetails(detailedItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBill();
  }, [id]);

  return (
    <div className="bill_main_container">
      <div className="shop_name">BILLING SYSTEM</div>

      <div className="user_info_and_date">
        <div className="user_info">
          <div className="user_name_box">
            <div className="user_name_heading">Customer Name : </div>
            <div className="user_name">{userName}</div>
          </div>
          <div className="user_contact_box">
            <div className="user_contact_heading">Customer Contact : </div>
            <div className="user_contact">{userContact}</div>
          </div>
        </div>
        <div className="date_total_price">
          <div className="date_box">
            <div className="date_heading">Date : </div>
            <div className="date">{date}</div>
          </div>
        </div>
      </div>

      <div className="table_bill_products">
        <div className="table_bill_products_head">
          <div className="table_bill_products_head_text">NAME</div>
          <div className="table_bill_products_head_text">QUANTITY(x1)</div>
          <div className="table_bill_products_head_text">PRICE(Rs.)</div>
        </div>
        <div className="table_bill_products_body">
          {itemsWithDetails?.map((data, index) => {
            return (
              <div className="table_bill_products_row" key={index}>
                <div className="table_bill_products_body_text">
                  {data.title}
                </div>
                <div className="table_bill_products_body_text">
                  {data.quantity}
                </div>
                <div className="table_bill_products_body_text">
                  {data.price}
                </div>
              </div>
            );
          })}
        </div>

        <div className="totalAmount_box">
          <div className="totalAmount_heading">Total Amount : </div>
          <div className="totalAmount">{totalAmount} Rs.</div>
        </div>
      </div>
    </div>
  );
};

export default PrintBillPage;
