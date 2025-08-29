import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, serverTimestamp } from "./firebase";

const PRICES = { incir: 50, ceviz: 80 };
const MAX_KG = 10;

export default function OrderForm() {
  const [name, setName] = useState("");
  const [product, setProduct] = useState("incir");
  const [kg, setKg] = useState(1);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (kg > MAX_KG) {
      setMessage(`En fazla ${MAX_KG} kg alabilirsiniz.`);
      return;
    }
    const totalPrice = PRICES[product] * kg;
    await addDoc(collection(db, "orders"), {
      name,
      product,
      kg,
      totalPrice,
      createdAt: serverTimestamp()
    });
    setMessage(`Siparişiniz kaydedildi. Toplam: ${totalPrice} TL`);
    setName("");
    setKg(1);
    setProduct("incir");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Sipariş Formu</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınız" className="w-full border p-2 rounded-lg mb-2" required/>
        <select value={product} onChange={(e) => setProduct(e.target.value)} className="w-full border p-2 rounded-lg mb-2">
          <option value="incir">İncir</option>
          <option value="ceviz">Ceviz</option>
        </select>
        <input type="number" value={kg} min={1} max={MAX_KG} onChange={(e) => setKg(Number(e.target.value))} className="w-full border p-2 rounded-lg mb-4" required/>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Sipariş Ver</button>
        {message && <p className="mt-2 text-blue-600">{message}</p>}
      </form>
    </div>
  );
}
