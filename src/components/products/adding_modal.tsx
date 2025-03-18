import { useDispatch } from "react-redux";
import { useState } from "react";
import { addProduct } from "../../redux/reducers/productsReducer";
import productAPI from "./productAPI";
import { IProduct } from "./Iproduct";

interface IPropsModal {
  isOpen: boolean;
  onClose: () => void;
}

interface IDetail {
  title: string;
  content: string;
}

function AddingModal({ onClose, isOpen }: IPropsModal) {
  const dispatch = useDispatch();
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState<number>(0);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [details, setDetails] = useState<IDetail[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!productTitle.trim()) {
      newErrors.productTitle = "Product title is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!mainImage.trim()) {
      newErrors.mainImage = "Main image is required";
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = "Price must be a valid number greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDetail = () => {
    setDetails([...details, { title: "", content: "" }]);
  };

  const handleDetailChange = (
    index: number,
    field: keyof IDetail,
    value: string
  ) => {
    const newDetails = [...details];
    newDetails[index] = { ...newDetails[index], [field]: value };
    setDetails(newDetails);
  };

  const handleRemoveDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleCreateProduct = async () => {
    if (!validateForm()) return;

    try {
      const newProduct: Omit<IProduct, "id" | "createdAt"> = {
        title: productTitle,
        description,
        mainImage,
        imageURL: [mainImage, ...images],
        price: Number(price),
        stock: inStock,
        discount: discountPercent,
        details,
      };

      const response = await productAPI.createProduct(newProduct);
      console.log("response:", response);
      if (response.createdAt) {
        dispatch(addProduct(response));
        onClose();
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setErrors({ submit: "Failed to create product" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="p-6 space-y-6 overflow-y-auto flex-grow">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add Product</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Title
              </label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.productTitle && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.productTitle}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Image URL
              </label>
              <input
                type="text"
                value={mainImage}
                onChange={(e) => setMainImage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.mainImage && (
                <p className="text-red-500 text-xs mt-1">{errors.mainImage}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Images (One URL per line)
              </label>
              <textarea
                value={images.join("\n")}
                onChange={(e) =>
                  setImages(
                    e.target.value.split("\n").filter((url) => url.trim())
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  value={inStock}
                  onChange={(e) => setInStock(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Percentage
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Product Details
                </label>
                <button
                  type="button"
                  onClick={handleAddDetail}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add Detail
                </button>
              </div>
              {details.map((detail, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={detail.title}
                      onChange={(e) =>
                        handleDetailChange(index, "title", e.target.value)
                      }
                      placeholder="Detail title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={detail.content}
                      onChange={(e) =>
                        handleDetailChange(index, "content", e.target.value)
                      }
                      placeholder="Detail content"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveDetail(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateProduct}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddingModal;
