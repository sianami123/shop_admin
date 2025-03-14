import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { productAPI } from "../../api/api";
import {
  IProduct,
  IProductDetail,
  IProductCreate,
} from "../../interfaces/Iproduct";
import { updateProduct } from "../../redux/reducers/productsReducer";

interface IEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
}

function EditModal({ onClose, isOpen, product }: IEditModalProps) {
  const dispatch = useDispatch();
  const [productTitle, setProductTitle] = useState(product.product_title);
  const [productCompanyTitle, setProductCompanyTitle] = useState(
    product.product_company_title
  );
  const [mainImage, setMainImage] = useState(product.main_image);
  const [images, setImages] = useState<string[]>(product.images);
  const [price, setPrice] = useState(product.price);
  const [inStock, setInStock] = useState(product.in_stock);
  const [discountPercent, setDiscountPercent] = useState(
    product.discount_percent
  );
  const [details, setDetails] = useState<IProductDetail[]>(product.details);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (product) {
      setProductTitle(product.product_title);
      setProductCompanyTitle(product.product_company_title);
      setMainImage(product.main_image);
      setImages(product.images);
      setPrice(product.price);
      setInStock(product.in_stock);
      setDiscountPercent(product.discount_percent);
      setDetails(product.details);
    }
  }, [product]);

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!productTitle.trim()) {
      newErrors.productTitle = "Product title is required";
    }
    if (!productCompanyTitle.trim()) {
      newErrors.productCompanyTitle = "Company title is required";
    }
    if (!mainImage.trim()) {
      newErrors.mainImage = "Main image URL is required";
    }
    if (!price || price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDetail = () => {
    setDetails([...details, { title: "", content: "" }]);
  };

  const handleDetailChange = (
    index: number,
    field: keyof IProductDetail,
    value: string
  ) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const handleRemoveDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleUpdateProduct = async (id: string) => {
    if (!validateFields()) {
      return;
    }

    try {
      const updatedData: IProductCreate = {
        product_title: productTitle,
        product_company_title: productCompanyTitle,
        price: price,
        main_image: mainImage,
        images: images,
        in_stock: inStock,
        discount_percent: discountPercent,
        details: details.filter((detail) => detail.title && detail.content),
      };

      const response = await productAPI.updateProduct(id, updatedData);
      console.log(response);
      if (response.createdAt) {
        dispatch(updateProduct({ id, ...updatedData }));
        onClose();
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="p-6 space-y-6 overflow-y-auto flex-grow">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Edit Product</h2>
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
                Company Title
              </label>
              <input
                type="text"
                value={productCompanyTitle}
                onChange={(e) => setProductCompanyTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.productCompanyTitle && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.productCompanyTitle}
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
                  onChange={(e) => setPrice(Number(e.target.value))}
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
                <div key={index} className="grid grid-cols-2 gap-4 items-start">
                  <div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={detail.title}
                      onChange={(e) =>
                        handleDetailChange(index, "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Content"
                      value={detail.content}
                      onChange={(e) =>
                        handleDetailChange(index, "content", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {details.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDetail(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
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
            onClick={() => handleUpdateProduct(product.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
