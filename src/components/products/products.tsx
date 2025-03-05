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
  Typography,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
} from "@mui/material";

export default function Products() {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);

  const [page, setPage] = useState(1);
  const pageSize = 5;

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
    if (selectedProduct) {
      setOpen(true);
    }
  };

  const handleAddProduct = () => {
    setIsEditMode(false);
    setOpen(true);
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
    <>
      <Layout>
        <Stack spacing={2} width="100%">
          <div className="flex justify-between items-center">
            <Typography variant="h4">Products</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </div>

          {error && (
            <Typography color="error">
              Error loading products: {error}
            </Typography>
          )}

          {products.length > 0 && (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((item: IProduct) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        className="min-h-20 w-20 p-2 rounded-lg"
                        src={item.imageURL}
                        alt={item.title}
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="right">
                      $
                      {typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : "0.00"}
                    </TableCell>
                    <TableCell align="right">{item.rating}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteProduct(item.id!)}
                      >
                        <MdDeleteForever />
                      </IconButton>
                      <IconButton
                        color="warning"
                        onClick={() => handleEditProduct(item)}
                      >
                        <MdOutlineEditNote />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Stack>
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
