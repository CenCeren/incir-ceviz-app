import React from "react";
import { Routes, Route } from "react-router-dom";
import OrderForm from "./OrderForm.jsx";
import AdminPage from "./AdminPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderForm />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
