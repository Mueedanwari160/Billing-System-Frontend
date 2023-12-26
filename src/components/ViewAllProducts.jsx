import React, { useEffect, useState } from "react";
import axios from "axios";
import view from "../assets/view.png";
import remove from "../assets/remove.png";
import { NavLink } from "react-router-dom";

const ViewAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const FetchAllProducts = async () => {
    await axios
      .get("http://localhost:5000/billing-system/all-products")
      .then((res) => {
        setAllProducts(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const deleteProduct = await axios.delete(
        `http://localhost:5000/billing-system/delete-product/${id}`
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    FetchAllProducts();
  }, [allProducts]);

  return (
    <div className="view_all_products_main_container">
      <div className="view_all_product_table">
        <div className="table_head">
          <div className="table_head_text">NAME</div>
          <div className="table_head_text">ACTIONS</div>
        </div>
        <div className="table_body">
          {allProducts.map((data, index) => {
            return (
              <div className="table_row" key={index}>
                <div className="table_row_text">{data.title}</div>
                <div className="table_row_actions">
                  <NavLink to={`/view-product/${data._id}`}>
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

export default ViewAllProducts;
