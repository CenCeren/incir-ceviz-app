import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const ADMIN_PASSWORD = "1234";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else setError("❌ Şifre yanlış!");
  };

  useEffect(() => {
    if (!authenticated) return;
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Girişi</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre" className="w-full border p-2 rounded-lg mb-4"/>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Giriş Yap</button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">📋 Gelen Siparişler</h1>
      <div className="grid gap-4">
        {orders.length === 0 && <p className="text-gray-500">Henüz sipariş yok.</p>}
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 shadow rounded-xl">
            <p><b>👤 Müşteri:</b> {order.name}</p>
            <p><b>🛒 Ürün:</b> {order.product}</p>
            <p><b>⚖️ Kilo:</b> {order.kg} kg</p>
            <p><b>💰 Fiyat:</b> {order.totalPrice} TL</p>
            <p className="text-sm text-gray-500">📅 {order.createdAt?.toDate?.()?.toLocaleString() || "Tarih yok"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
