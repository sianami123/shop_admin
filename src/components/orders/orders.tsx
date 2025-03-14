import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import orderAPI from "../../api/orderAPI";

interface OrderDetail {
  // Add other detail fields as needed
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

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    orderAPI.getOrders().then((res: any) => {
      console.log(res.records);
      setOrders(res.records);
    });
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {orders.map((order) => (
            <OrderCard key={order.id} orderItem={order} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

function OrderCard({ orderItem }: { orderItem: Order }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order #{orderItem.id}</h2>
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
          {new Date(orderItem.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={orderItem.main_image}
              alt={orderItem.product_title}
              className="w-20 h-20 rounded-md object-cover"
            />
            <div>
              <h3 className="font-medium">{orderItem.product_title}</h3>
              <p className="text-sm text-gray-600">
                {orderItem.product_company_title}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">In Stock:</span>
              <span className="ml-2 font-medium">{orderItem.in_stock}</span>
            </div>
            <div>
              <span className="text-gray-600">Discount:</span>
              <span className="ml-2 font-medium">
                {orderItem.discount_percent}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="font-medium">Price:</span>
          <span className="text-lg font-semibold">${orderItem.price}</span>
        </div>
      </div>
    </div>
  );
}
