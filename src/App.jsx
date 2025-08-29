import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OrderForm from "./OrderForm";
import AdminPage from "./AdminPage";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-green-600 text-white flex justify-between">
        <Link to="/" className="font-bold">🌰 Sipariş</Link>
        <Link to="/admin">📋 Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<OrderForm />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
