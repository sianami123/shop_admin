import { useState, useEffect } from "react";
import Layout from "../layout/layout";
import { productsAPI } from "../../api/api";
import { MdDeleteForever, MdOutlineEditNote } from "react-icons/md";
import AddingModal from "../modal/adding_modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  deleteProduct,
} from "../../redux/reducers/productsReducer";
import { IProduct } from "../../interfaces/Iproduct";
import EditModal from "../modal/edit_modal";
import axios from "axios";

import {
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { PaginationRoot } from "../../components/ui/pagination";
import { LinkButton } from "../ui/link-button";

export default function Products() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  async function fetchProducts() {
    // setLoading(true);
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
      }));
      dispatch(setProducts(transformedProducts));
    } catch (error: any) {
      setError(error.message);
    } finally {
      // setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    if (selectedProduct) {
      onOpen();
    }
  };

  const handleAddProduct = () => {
    setIsEditMode(false);
    onOpen();
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await axios.delete(
        `https://wordpress-x84owsw4g8wswwgcw8sc4c04.callfornia.com/wp-json/wc/v3/products/${id}`
      );
      if (res.status === 200) {
        dispatch(deleteProduct(id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Layout>
      <Stack width="full" gap="5">
        <div className="flex justify-between items-center">
          <Heading size="xl">Products</Heading>
          <LinkButton onClick={handleAddProduct}>Add Product</LinkButton>
        </div>

        {/* {loading && <div>Loading products...</div>} */}

        {error && (
          <div className="text-red-500">Error loading products: {error}</div>
        )}

        {/* {!loading && !error && products.length === 0 && (
          <div>No products found</div>
        )} */}

        {products.length > 0 && (
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Rating</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products?.map((item: IProduct) => (
                <Tr key={item.id}>
                  <Td>
                    <img
                      className="min-h-20 w-20 p-2 rounded-lg"
                      src={item.imageURL}
                      alt={item.title}
                    />
                  </Td>
                  <Td>{item.title}</Td>
                  <Td isNumeric>
                    $
                    {typeof item.price === "number"
                      ? item.price.toFixed(2)
                      : "0.00"}
                  </Td>
                  <Td isNumeric>{item.rating}</Td>
                  <Td isNumeric>
                    <button
                      onClick={() => handleDeleteProduct(item.id!)}
                      className="bg-red-700 rounded-lg p-2 mx-2"
                    >
                      <MdDeleteForever />
                    </button>
                    <button
                      onClick={() => handleEditProduct(item)}
                      className="bg-yellow-500 rounded-lg p-2"
                    >
                      <MdOutlineEditNote />
                    </button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        <PaginationRoot
          count={products?.length || 0}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
        />
      </Stack>

      {isEditMode ? (
        selectedProduct && (
          <EditModal
            onClose={onClose}
            isOpen={isOpen}
            product={selectedProduct}
          />
        )
      ) : (
        <AddingModal onClose={onClose} isOpen={isOpen} />
      )}
    </Layout>
  );
}
