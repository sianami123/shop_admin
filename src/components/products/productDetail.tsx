import { useEffect, useState } from "react";
import { useParams } from "react-router";
import productAPI from "./productAPI";
import { IProduct } from "./Iproduct";
import Layout from "../layout/layout";
import { MdAdd, MdArrowBack, MdRemove } from "react-icons/md";

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
        const response = await productAPI.getProductById(id);
        console.log(response);
        const transformedProduct: IProduct = {
          id: response.id.toString(),
          title: response.title,
          price: response.price ? Number(response.price) : 0,
          imageURL: response.imageURL,
          stock: response.stock,
          discount: response.discount,
          createdAt: response.createdAt,
          description: response.description,
          mainImage: response.imageURL?.[0] || "",
          details: response.details || [],
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
                src={product.imageURL[0]}
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

            <div className="space-y-2">
              {product.price ? (
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-red-600">
                    ${product.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Stock Status
                </h3>
                <div className="mt-1">
                  <span className="px-3 py-1 rounded-md inline-flex items-center">
                    <div className="flex items-center gap-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                        <MdAdd />
                      </button>
                      {product.stock !== null
                        ? `${product.stock} in stock`
                        : product.stock}
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                        <MdRemove />
                      </button>
                    </div>
                  </span>
                </div>
              </div>

              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quick Overview
                  </h3>
                  <div
                    className="mt-1 text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: product.description,
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

              {product.discount && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Discount
                  </h3>
                  <p className="mt-1 text-gray-600">{product.discount}%</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
