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
      </div>
    </Layout>
  );
}
