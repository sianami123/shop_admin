import { useEffect, useState } from "react";
import { customersAPI } from "../../api/api";
import Layout from "../layout/layout";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    customersAPI.getCustomers().then((res) => {
      setCustomers(res.data);
      console.log(res);
    });
  }, []);
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1>Customers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.length > 0 &&
            customers.map((customer: any) => (
              <div
                key={customer.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-bold">{customer.name}</h2>
                <p className="text-gray-600">{customer.email}</p>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
