import { Route, Routes } from "react-router";
import LoginPage from "./pages/login/login";
import ProductsPage from "./pages/products/products_page";
import ProductDetail from "./components/products/productDetail";
import OrdersPage from "./pages/orders/ordersPage";
import OrderDetail from "./components/orders/orderDetail";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
      </Routes>
    </div>
  );
}
export default App;
