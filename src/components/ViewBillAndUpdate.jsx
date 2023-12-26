import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ViewBillAndUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const FetchAllProducts = async () => {
    await axios
      .get("http://localhost:5000/billing-system/all-products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { product: "", quantity: 1 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...selectedItems];
    newItems[index][field] = value;
    setSelectedItems(newItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/billing-system/bill/update-bill/${id}`,
        {
          userName,
          userContact,
          items: selectedItems,
        }
      );
      navigate("/all-bill");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchBill = async () => {
      const getBill = await axios.get(
        `http://localhost:5000/billing-system/bill/single-bill/${id}`
      );
      const fetchedBill = getBill.data.data;

      setUserName(fetchedBill.userName);
      setUserContact(fetchedBill.userContact);
      setSelectedItems(fetchedBill.items);
    };
    fetchBill();
  }, [id]);

  return (
    <div className="main_container">
      <div className="page_main_title">Update Bill</div>
      <form onSubmit={handleSubmit}>
        <div className="input_box">
          <h1>Customer Name</h1>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input_box">
          <h1>Customer Contact</h1>
          <input
            type="text"
            value={userContact}
            onChange={(e) => setUserContact(e.target.value)}
          />
        </div>

        {selectedItems.map((item, index) => (
          <div key={index} className="bill_menu">
            <select
              value={item.product}
              onChange={(e) =>
                handleItemChange(index, "product", e.target.value)
              }
            >
              <option value="">Select a Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.title}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={item.quantity}
              className="quantity_product_bill"
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
          </div>
        ))}

        <div className="btn_group">
          <button type="button" onClick={handleAddItem} className="btn">
            Add Product
          </button>
          <button type="submit" className="btn">
            Update Bill
          </button>
          <NavLink to={`/bill/${id}`} className="btn_view_bill">
            View Bill
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default ViewBillAndUpdate;
