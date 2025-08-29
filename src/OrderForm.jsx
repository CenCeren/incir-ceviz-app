import React, { useState } from "react";
import { db, serverTimestamp } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";

function OrderForm() {
  const [name, setName] = useState("");
  const [kg, setKg] = useState("");
  const maxKg = 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (kg > maxKg) {
      alert(`Maksimum ${maxKg} kg alabilirsiniz.`);
      return;
    }
    await addDoc(collection(db, "orders"), {
      name,
      kg,
      createdAt: serverTimestamp(),
    });
    alert("Siparişiniz kaydedildi!");
    setName("");
    setKg("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>İncir & Ceviz Siparişi</h2>
      <input placeholder="İsminiz" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Kaç kg?" value={kg} onChange={e => setKg(e.target.value)} />
      <button type="submit">Sipariş Ver</button>
    </form>
  );
}

export default OrderForm;
