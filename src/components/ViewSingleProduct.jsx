import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ViewSingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    metaDescription: "",
    info: "",
    price: "",
  });

  const { title, metaDescription, info, price } = productData;

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const getProduct = await axios.get(
        `http://localhost:5000/billing-system/single-product/${id}`
      );
      const fetchedProduct = getProduct.data.data;
      setProductData({
        title: fetchedProduct.title,
        metaDescription: fetchedProduct.metaDescription,
        info: fetchedProduct.info,
        price: fetchedProduct.price,
      });
    };
    fetchProduct();
  }, [id]);

  const updateProduct = async () => {
    try {
      const updateProductData = await axios.put(
        `http://localhost:5000/billing-system/update-product/${id}`,
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
      <div className="page_main_title">UPDATE A PRODUCT!</div>

      <div className="input_box">
        <h1>Name</h1>
        <input
          name="title"
          defaultValue={productData.title}
          onChange={handleInputChange}
          type="text"
        />
      </div>
      <div className="input_box">
        <h1>Meta Description </h1>
        <input
          name="metaDescription"
          defaultValue={productData.metaDescription}
          onChange={handleInputChange}
          type="text"
        />
      </div>
      <div className="input_box">
        <h1>Details of Product </h1>
        <input
          name="info"
          defaultValue={productData.info}
          onChange={handleInputChange}
          type="text"
        />
      </div>
      <div className="input_box">
        <h1>Price. (Rs.) </h1>
        <input
          name="price"
          defaultValue={productData.price}
          onChange={handleInputChange}
          type="number"
        />
      </div>

      <div className="btn" onClick={updateProduct}>
        UPDATE
      </div>
    </div>
  );
};

export default ViewSingleProduct;
