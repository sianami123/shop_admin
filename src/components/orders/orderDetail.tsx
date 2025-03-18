import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../layout/layout";
import orderAPI from "./orderAPI";

interface OrderDetail {
  title: string;
  content: string;
}

interface Order {
  id: string;
  createdAt: string;
  details: OrderDetail[];
  discount_percent: number;
  images: string[];
  in_stock: number;
  main_image: string;
  price: number;
  product_company_title: string;
  product_title: string;
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      orderAPI.getOrderById(id).then((res: any) => {
        console.log(res);
        const orderData = res[0] || null;
        setOrder(orderData);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-red-600">Order not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <button
            onClick={() => navigate("/orders")}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-150"
          >
            Back to Orders
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold">Order Details</h2>
          <p>Order ID: {order.id}</p>
          <p>Order Date: {order.createdAt}</p>
          {order.details.map((detail, index) => (
            <p key={index}>
              {detail.title}: {detail.content}
            </p>
          ))}
        </div>
      </div>
    </Layout>
  );
}
