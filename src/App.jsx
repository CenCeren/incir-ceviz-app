import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderForm from "./OrderForm";
import AdminPage from "./AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderForm />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
