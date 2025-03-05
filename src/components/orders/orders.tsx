import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import { ordersAPI } from "../../api/api";

interface WooOrder {
  id: number;
  status: string;
  total: string;
  date_created: string;
  line_items: Array<{
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    image: {
      src: string;
    };
  }>;
}

export default function Orders() {
  const [orders, setOrders] = useState<WooOrder[]>([]);
  useEffect(() => {
    ordersAPI.getOrders().then((res) => {
      console.log(res.data);
      setOrders(res.data);
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

function OrderCard({ orderItem }: { orderItem: WooOrder }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order #{orderItem.id}</h2>
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
          {orderItem.status}
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Items:</h3>
          <ul className="space-y-2">
            {orderItem.line_items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <img
                  src={item.image.src}
                  alt={item.name}
                  className="w-10 h-10 rounded-md"
                />
                <div>
                  <span className="font-medium">{item.name}</span>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                {item.variation_id > 0 ? (
                  <span className="text-sm text-gray-500">
                    Variation: #{item.variation_id}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">
                    Variation: #{item.variation_id}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="font-medium">Total:</span>
          <span className="text-lg font-semibold">${orderItem.total}</span>
        </div>
      </div>
    </div>
  );
}
