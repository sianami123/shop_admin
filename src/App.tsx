import { Route, Routes } from "react-router";
import ProductsPage from "./pages/products/productsPage";
import ProductDetail from "./components/products/productDetail";
import OrdersPage from "./pages/orders/ordersPage";
import OrderDetail from "./components/orders/orderDetail";
import CustomersPage from "./pages/customers/customersPage";
import LoginPage from "./pages/login/loginPage";
import InventoryPage from "./pages/inventory/inventoryPage";
import ProfilePage from "./pages/profile/profilePage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
export default App;
