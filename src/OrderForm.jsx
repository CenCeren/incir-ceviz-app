import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

function OrderForm() {
  const [name, setName] = useState("");
  const [product, setProduct] = useState("incir");
  const [kg, setKg] = useState(1);
  const [message, setMessage] = useState("");

  const prices = { incir: 150, ceviz: 200 };
  const totalPrice = prices[product] * kg;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return setMessage("⚠️ Lütfen isminizi giriniz!");
    if (kg > 10) return setMessage("⚠️ En fazla 10 kg alabilirsiniz!");

    try {
      await addDoc(collection(db, "orders"), {
        name,
        product,
        kg,
        totalPrice,
        createdAt: serverTimestamp(),
      });

      setMessage(`✅ Siparişiniz kaydedildi! Tutar: ${totalPrice} TL`);
      setName("");
      setKg(1);
      setProduct("incir");
    } catch (error) {
      console.error(error);
      setMessage("❌ Bir hata oluştu. Tekrar deneyiniz.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">🌰 Sipariş Formu</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Adınız Soyadınız"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />

          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full border p-2 rounded-lg"
          >
            <option value="incir">İncir (150 TL/kg)</option>
            <option value="ceviz">Ceviz (200 TL/kg)</option>
          </select>

          <input
            type="number"
            min="1"
            max="10"
            value={kg}
            onChange={(e) => setKg(Number(e.target.value))}
            className="w-full border p-2 rounded-lg"
          />

          <p className="text-lg font-semibold">💰 Toplam: {totalPrice} TL</p>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Sipariş Ver
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-green-700 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderForm;
