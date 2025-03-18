import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import orderAPI from "./orderAPI";
import { useNavigate } from "react-router-dom";

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
  [key: string]: any; // To handle numeric indices
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    orderAPI.getOrders().then((res: any) => {
      // Flatten and clean up the nested array structure
      const flattenedOrders = res.records.map((order: any) => {
        // If order has numeric indices, it means it's a nested structure
        if (typeof order === "object" && "0" in order) {
          return {
            ...order[0],
            id: order.id || order[0].id,
            createdAt: order.createdAt || order[0].createdAt,
          };
        }
        return order;
      });
      setOrders(flattenedOrders);
    });
  }, []);

  const handleOrderClick = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  onClick={() => handleOrderClick(order.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16">
                        {order.main_image && (
                          <img
                            className="h-16 w-16 rounded-md object-cover"
                            src={order.main_image}
                            alt={order.product_title || "Product image"}
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {order.product_title || "Untitled Product"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.product_company_title || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.price || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.in_stock || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {order.discount_percent || 0}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-y-1">
                      {order.details &&
                        order.details.map(
                          (detail: OrderDetail, index: number) => (
                            <div key={index}>
                              <span className="font-medium">
                                {detail.title}:
                              </span>{" "}
                              {detail.content}
                            </div>
                          )
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
