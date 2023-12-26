import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import CreateBill from "./pages/CreateBill";
import Bill from "./pages/Bill";
import AllBill from "./pages/AllBill";
import ViewProduct from "./pages/ViewProduct";
import ViewBill from "./pages/ViewBill";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/create-bill" element={<CreateBill />} />
      <Route path="/bill/:id" element={<Bill />} />
      <Route path="/all-bill" element={<AllBill />} />
      <Route path="/view-bill/:id" element={<ViewBill />} />
      <Route path="/view-product/:id" element={<ViewProduct />} />
    </Routes>
  );
}

export default App;
