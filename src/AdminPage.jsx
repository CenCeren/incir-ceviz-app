import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const ADMIN_PASSWORD = "12345";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (authenticated) {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, snapshot => {
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setAuthenticated(true);
    else alert("Hatalı şifre");
  };

  if (!authenticated)
    return (
      <form onSubmit={handleLogin} style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Admin Girişi</h2>
        <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Giriş</button>
      </form>
    );

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Paneli</h2>
      {orders.map(order => (
        <div key={order.id}>
          {order.name} - {order.kg} kg
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
