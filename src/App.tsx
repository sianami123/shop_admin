import { Route, Routes } from "react-router";
import LoginPage from "./pages/login/login";
import ProductsPage from "./pages/products/products_page";
import InventoryPage from "./pages/inventory/inventoryPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </div>
  );
}
export default App;
