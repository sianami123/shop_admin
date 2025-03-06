import { Route, Routes } from "react-router";
import ProductsPage from "./pages/products/products_page";
import ProductDetail from "./components/products/productDetail";
import OrdersPage from "./pages/orders/ordersPage";
import OrderDetail from "./components/orders/orderDetail";
import CustomersPage from "./pages/customers/customersPage";
import Auth from "./components/login/auth";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Routes>
    </div>
  );
}
export default App;
