import { useState, useEffect } from "react";
import Layout from "../layout/layout";
import { productsAPI } from "../../api/api";
import { MdDeleteForever, MdOutlineEditNote, MdStar } from "react-icons/md";
import AddingModal from "../modal/adding_modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  deleteProduct,
} from "../../redux/reducers/productsReducer";
import { IProduct } from "../../interfaces/Iproduct";
import EditModal from "../modal/edit_modal";

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
      const response = await productsAPI.getProducts();
      console.log("Products fetched successfully:", response.data);
      // Transform WooCommerce data to match our interface
      const transformedProducts = response.data.map((item: any) => ({
        id: item.id.toString(),
        title: item.name,
        price: item.price ? Number(item.price) : 0,
        imageURL: item.images[0]?.src || "",
        rating: parseFloat(item.average_rating) || 0,
        description: item.description,
        short_description: item.short_description,
        stock_status: item.stock_status,
        stock_quantity: item.stock_quantity,
        sku: item.sku,
        categories: item.categories,
        status: item.status,
        date_created: item.date_created,
        date_modified: item.date_modified,
        on_sale: item.on_sale,
        regular_price: item.regular_price,
        sale_price: item.sale_price,
        weight: item.weight,
        dimensions: item.dimensions,
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
    try {
      const res = await productsAPI.deleteProduct(id);
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
                      Regular Price
                    </th>
                    <th className="min-w-[120px] p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="min-w-[100px] p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="w-20 p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
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
                          {item.imageURL ? (
                            <img
                              className="h-20 w-20 p-2 rounded-lg object-cover"
                              src={item.imageURL}
                              alt={item.title}
                            />
                          ) : (
                            <div className="h-20 w-20 p-2 rounded-lg bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-sm text-gray-500">
                            {item.categories?.map((cat) => cat.name).join(", ")}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        $
                        {item.regular_price ||
                          (typeof item.price === "number"
                            ? item.price.toFixed(2)
                            : "0.00")}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end">
                          <span
                            className={`px-3 py-1 rounded-md inline-flex items-center ${
                              item.stock_status === "instock"
                                ? "bg-green-100 text-green-800"
                                : item.stock_status === "outofstock"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.stock_quantity !== null
                              ? `${item.stock_quantity} in stock`
                              : item.stock_status}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="capitalize">{item.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span>{item.rating}</span>
                          <MdStar className="w-4 h-4 text-yellow-500" />
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
