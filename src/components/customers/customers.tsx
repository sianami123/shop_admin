import { useEffect, useState } from "react";
import { customersAPI } from "../../api/api";
import Layout from "../layout/layout";

interface CustomerBilling {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avatar_url: string;
  date_created: string;
  billing: CustomerBilling;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await customersAPI.getCustomers();
        setCustomers(res.data);
      } catch (err) {
        setError("Failed to fetch customers. Please try again later.");
        console.error("Error fetching customers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600">Loading customers...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Customers</h1>
        {customers.length === 0 ? (
          <div className="text-center text-gray-600">No customers found.</div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white p-6 rounded-lg shadow-md space-y-4 flex-grow basis-80"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={customer.avatar_url}
                    alt={`${customer.first_name}'s avatar`}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-bold">
                      {customer.first_name} {customer.last_name}
                    </h2>
                    <p className="text-gray-600">{customer.email}</p>
                    <span className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                      {customer.role}
                    </span>
                  </div>
                </div>

                {customer.billing && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Billing Information</h3>
                    <p className="text-gray-600">
                      {customer.billing.address_1}
                      {customer.billing.address_2 &&
                        `, ${customer.billing.address_2}`}
                    </p>
                    <p className="text-gray-600">
                      {customer.billing.city} {customer.billing.state}{" "}
                      {customer.billing.postcode}
                    </p>
                    <p className="text-gray-600">{customer.billing.country}</p>
                    {customer.billing.phone && (
                      <p className="text-gray-600">
                        Phone: {customer.billing.phone}
                      </p>
                    )}
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  Customer since:{" "}
                  {new Date(customer.date_created).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
