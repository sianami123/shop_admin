import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { productsAPI } from "../../api/api";
import { IProduct } from "../../interfaces/Iproduct";
import { updateProduct } from "../../redux/reducers/productsReducer";

interface IEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
}

function EditModal({ onClose, isOpen, product }: IEditModalProps) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [imageURL, setImageURL] = useState(product.imageURL);
  const [description, setDescription] = useState(product.description || "");
  const [shortDescription, setShortDescription] = useState(
    product.short_description || ""
  );
  const [sku, setSku] = useState(product.sku || "");
  const [stockQuantity, setStockQuantity] = useState(
    product.stock_quantity || 0
  );
  const [regularPrice, setRegularPrice] = useState(product.regular_price || "");
  const [salePrice, setSalePrice] = useState(product.sale_price || "");
  const [weight, setWeight] = useState(product.weight || "");
  const [dimensions, setDimensions] = useState(
    product.dimensions || { length: "", width: "", height: "" }
  );

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setImageURL(product.imageURL);
      setDescription(product.description || "");
      setShortDescription(product.short_description || "");
      setSku(product.sku || "");
      setStockQuantity(product.stock_quantity || 0);
      setRegularPrice(product.regular_price || "");
      setSalePrice(product.sale_price || "");
      setWeight(product.weight || "");
      setDimensions(
        product.dimensions || { length: "", width: "", height: "" }
      );
    }
  }, [product]);

  const handleUpdateProduct = async (id: string) => {
    try {
      // Create an object to store changed values
      const changedValues: Partial<IProduct> = {};

      // Compare each field with the original product
      if (title !== product.title) changedValues.title = title;
      if (price !== product.price) changedValues.price = price;
      if (imageURL !== product.imageURL) changedValues.imageURL = imageURL;
      if (description !== product.description)
        changedValues.description = description;
      if (shortDescription !== product.short_description)
        changedValues.short_description = shortDescription;
      if (sku !== product.sku) changedValues.sku = sku;
      if (stockQuantity !== product.stock_quantity)
        changedValues.stock_quantity = stockQuantity;
      if (regularPrice !== product.regular_price)
        changedValues.regular_price = regularPrice;
      if (salePrice !== product.sale_price)
        changedValues.sale_price = salePrice;
      if (weight !== product.weight) changedValues.weight = weight;

      // Check if dimensions have changed
      if (JSON.stringify(dimensions) !== JSON.stringify(product.dimensions)) {
        changedValues.dimensions = dimensions;
      }

      // Only make API call if there are changes
      if (Object.keys(changedValues).length > 0) {
        // Add id to changed values
        changedValues.id = id;

        const response = await productsAPI.updateProduct(id, changedValues);
        if (response.status === 200) {
          // Dispatch the update to Redux store
          dispatch(updateProduct(changedValues));
          onClose();
        }
      } else {
        console.log("No changes detected");
        onClose();
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full h-full max-w-3xl overflow-y-auto">
        <div className="p-6 space-y-6">
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
                Product name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Regular price
                </label>
                <input
                  type="number"
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sale price
                </label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock quantity
              </label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Length
                </label>
                <input
                  type="text"
                  value={dimensions.length}
                  onChange={(e) =>
                    setDimensions({ ...dimensions, length: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width
                </label>
                <input
                  type="text"
                  value={dimensions.width}
                  onChange={(e) =>
                    setDimensions({ ...dimensions, width: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <input
                  type="text"
                  value={dimensions.height}
                  onChange={(e) =>
                    setDimensions({ ...dimensions, height: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  https://
                </span>
                <input
                  type="text"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdateProduct(product.id!)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
