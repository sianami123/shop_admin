import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { productsAPI } from "../../api/api";
import { IProduct } from "../../interfaces/Iproduct";
import Layout from "../layout/layout";
import { MdAdd, MdArrowBack, MdRemove, MdStar } from "react-icons/md";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await productsAPI.getProductById(id);

        // Transform the response data to match our interface
        const transformedProduct: IProduct = {
          id: response.data.id.toString(),
          title: response.data.name,
          price: response.data.price ? Number(response.data.price) : 0,
          imageURL: response.data.images[0]?.src || "",
          rating: parseFloat(response.data.average_rating) || 0,
          description: response.data.description,
          short_description: response.data.short_description,
          stock_status: response.data.stock_status,
          stock_quantity: response.data.stock_quantity,
          sku: response.data.sku,
          categories: response.data.categories,
          status: response.data.status,
          regular_price: response.data.regular_price,
          sale_price: response.data.sale_price,
          weight: response.data.weight,
          dimensions: response.data.dimensions,
        };

        setProduct(transformedProduct);
      } catch (err: any) {
        setError(err.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-600">{error}</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-gray-600">Product not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* back button     */}
        <div className="flex justify-start items-center">
          <button
            onClick={() => (window.location.href = "/products")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
          >
            <MdArrowBack />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center items-start">
            {product.imageURL ? (
              <img
                src={product.imageURL}
                alt={product.title}
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="text-lg font-semibold">{product.rating}</span>
                <MdStar className="w-5 h-5 text-yellow-500 ml-1" />
              </div>
              {product.categories && (
                <span className="text-gray-500">
                  in {product.categories.map((cat) => cat.name).join(", ")}
                </span>
              )}
            </div>

            <div className="space-y-2">
              {product.sale_price ? (
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-red-600">
                    ${product.sale_price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.regular_price}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${product.regular_price || product.price}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Stock Status
                </h3>
                <div className="mt-1">
                  <span
                    className={`px-3 py-1 rounded-md inline-flex items-center ${
                      product.stock_status === "instock"
                        ? "bg-green-100 text-green-800"
                        : product.stock_status === "outofstock"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                        {/* increase stock quantity */}
                        <MdAdd />
                      </button>
                      {product.stock_quantity !== null
                        ? `${product.stock_quantity} in stock`
                        : product.stock_status}
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                        {/* decrease stock quantity */}
                        <MdRemove />
                      </button>
                    </div>
                  </span>
                </div>
              </div>

              {product.short_description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quick Overview
                  </h3>
                  <div
                    className="mt-1 text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: product.short_description,
                    }}
                  />
                </div>
              )}

              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Description
                  </h3>
                  <div
                    className="mt-1 text-gray-600"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              {product.sku && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">SKU</h3>
                  <p className="mt-1 text-gray-600">{product.sku}</p>
                </div>
              )}

              {product.weight && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Weight
                  </h3>
                  <p className="mt-1 text-gray-600">{product.weight} kg</p>
                </div>
              )}

              {product.dimensions &&
                Object.values(product.dimensions).some((dim) => dim) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Dimensions
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {product.dimensions.length} × {product.dimensions.width} ×{" "}
                      {product.dimensions.height} cm
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
