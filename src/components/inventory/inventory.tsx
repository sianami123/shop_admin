import { useState, useEffect } from "react";
import Layout from "../layout/layout";
import { productAPI } from "../../api/api";
import { MdOutlineEditNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../interfaces/Iproduct";
import {
  setProducts,
  updateProduct,
} from "../../redux/reducers/productsReducer";

export default function Inventory() {
  const [error, setError] = useState<string | null>(null);
  const [editingProducts, setEditingProducts] = useState<{
    [key: string]: number;
  }>({});
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);

  const handleEditClick = (productId: string, currentQuantity: number) => {
    setEditingProducts((prev) => ({
      ...prev,
      [productId]: currentQuantity,
    }));
  };

  const handleQuantityChange = (productId: string, value: number) => {
    setEditingProducts((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleUpdateQuantities = async () => {
    setError(null);
    setUpdating(true);
    try {
      const updates = Object.entries(editingProducts).map(([id, quantity]) => ({
        id,
        in_stock: quantity,
      }));

      // Process each update sequentially
      for (const update of updates) {
        try {
          const response = await productAPI.updateProduct(update.id, {
            in_stock: update.in_stock,
          });

          if (response && response.data) {
            dispatch(
              updateProduct({
                id: update.id,
                in_stock: response.data.in_stock,
              })
            );
          }
        } catch (err: any) {
          console.error(`Failed to update product ${update.id}:`, err);
          setError((prev) =>
            prev
              ? `${prev}, Failed to update product ${update.id}`
              : `Failed to update product ${update.id}`
          );
        }
      }

      // Clear editing state after all updates are processed
      setEditingProducts({});
    } catch (err: any) {
      setError("Failed to process updates: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  async function fetchProducts() {
    setError(null);
    try {
      const response = await productAPI.getProducts();
      console.log("Products fetched successfully:", response);

      if (response && response.records) {
        const transformedProducts = response.records.map((item: any) => ({
          id: item.id,
          product_title: item.product_title,
          product_company_title: item.product_company_title,
          price: item.price,
          main_image: item.main_image,
          images: item.images,
          in_stock: item.in_stock,
          discount_percent: item.discount_percent,
          createdAt: item.createdAt,
          details: item.details,
        }));
        dispatch(setProducts(transformedProducts));
      } else {
        setError("Invalid response format from server");
      }
    } catch (error: any) {
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Layout>
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                Object.keys(editingProducts).length > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleUpdateQuantities}
              disabled={Object.keys(editingProducts).length === 0 || updating}
            >
              {updating ? "Updating..." : "Update Inventory"}
            </button>
          </div>

          {error && (
            <div className="text-red-600 p-4 bg-red-50 rounded-md">
              Error: {error}
            </div>
          )}

          {products.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-32 p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="min-w-[200px] p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="min-w-[120px] p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="min-w-[120px] p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="min-w-[100px] p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="w-20 p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="w-32 p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((item: IProduct) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex justify-center items-center">
                          {item.main_image ? (
                            <img
                              className="h-20 w-20 p-2 rounded-lg object-cover"
                              src={item.main_image}
                              alt={item.product_title}
                            />
                          ) : (
                            <div className="h-20 w-20 p-2 rounded-lg bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div
                          onClick={() =>
                            (window.location.href = `/products/${item.id}`)
                          }
                          className="flex flex-col gap-1 cursor-pointer hover:text-blue-500"
                        >
                          <div className="font-semibold">
                            {item.product_title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.details
                              ?.map((detail) => detail.content)
                              .join(", ")}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end">
                          {editingProducts.hasOwnProperty(item.id) ? (
                            <input
                              type="number"
                              min="0"
                              value={editingProducts[item.id]}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-20 px-2 py-1 border rounded-md"
                              disabled={updating}
                            />
                          ) : (
                            <span
                              className={`px-3 py-1 rounded-md inline-flex items-center ${
                                item.in_stock > 0
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.in_stock} in stock
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span>{item.product_company_title}</span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end">
                          <span>{item.discount_percent}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          {!editingProducts.hasOwnProperty(item.id) &&
                            !updating && (
                              <button
                                onClick={() =>
                                  handleEditClick(item.id, item.in_stock)
                                }
                                className="p-2 text-blue-600 hover:text-blue-800"
                                title="Edit quantity"
                              >
                                <MdOutlineEditNote className="w-5 h-5" />
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
