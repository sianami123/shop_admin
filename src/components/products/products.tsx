import { useState, useEffect } from "react";
import Layout from "../layout/layout";
import { productAPI } from "../../api/api";
import { MdDeleteForever, MdOutlineEditNote } from "react-icons/md";
import AddingModal from "./adding_modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  deleteProduct,
} from "../../redux/reducers/productsReducer";
import { IProduct } from "../../interfaces/Iproduct";
import EditModal from "./edit_modal";

export default function Products() {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);

  async function fetchProducts() {
    setError(null);
    try {
      const response = await productAPI.getProducts();
      console.log("Products fetched successfully:", response);
      // Transform API data to match our interface
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
    } catch (error: any) {
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setOpen(true);
  };

  const handleAddProduct = () => {
    setIsEditMode(false);
    setOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!id) return;
    try {
      const res = await productAPI.deleteProduct(id);
      console.log(res);
      if (res.status === 200) {
        dispatch(deleteProduct(id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>

          {error && (
            <div className="text-red-600">Error loading products: {error}</div>
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
                    <th className="w-24 p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                          <span
                            className={`px-3 py-1 rounded-md inline-flex items-center ${
                              item.in_stock > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.in_stock} in stock
                          </span>
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
                          <button
                            onClick={() => handleDeleteProduct(item.id!)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <MdDeleteForever className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEditProduct(item)}
                            className="p-1 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
                          >
                            <MdOutlineEditNote className="w-5 h-5" />
                          </button>
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
      {isEditMode ? (
        selectedProduct && (
          <EditModal
            onClose={() => setOpen(false)}
            isOpen={open}
            product={selectedProduct}
          />
        )
      ) : (
        <AddingModal onClose={() => setOpen(false)} isOpen={open} />
      )}
    </>
  );
}
