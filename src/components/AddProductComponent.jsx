import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const AddProductComponent = () => {
  const [productData, setProductData] = useState({
    title: "",
    metaDescription: "",
    info: "",
    price: "",
  });
  const { title, metaDescription, info, price } = productData;

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const addProduct = async () => {
    try {
      const addProduct = await axios.post(
        "http://localhost:5000/billing-system/add-product",
        {
          title,
          metaDescription,
          info,
          price,
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="main_container">
      <div className="page_main_title">ADD A PRODUCT!</div>

      <div className="input_box">
        <h1>Name</h1>
        <input
          name="title"
          defaultValue={title}
          onChange={handleInputChange}
          type="text"
        />
      </div>
      <div className="input_box">
        <h1>Meta Description </h1>
        <input
          name="metaDescription"
          defaultValue={metaDescription}
          onChange={handleInputChange}
          type="text"
        />
      </div>
      <div className="input_box">
        <h1>Details of Product </h1>
        <input
          name="info"
          defaultValue={info}
          onChange={handleInputChange}
          type="text"
        />
      </div>
      <div className="input_box">
        <h1>Price. (Rs.) </h1>
        <input
          name="price"
          defaultValue={price}
          onChange={handleInputChange}
          type="number"
        />
      </div>

      <div className="btn" onClick={addProduct}>
        ADD
      </div>
    </div>
  );
};

export default AddProductComponent;
