import {
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addProduct } from "../../redux/reducers/productsReducer";
import { productsAPI } from "../../api/api";
import { IProduct } from "../../interfaces/Iproduct";

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
  const [inventory, setInventory] = useState(product.inventory);

  const handleCreateProduct = async () => {
    try {
      const response = await productsAPI.createProduct({
        title,
        price,
        imageURL,
        inventory,
      });
      console.log(response);
      if (response?.status === 201) {
        dispatch(addProduct({ title, price, imageURL, inventory }));
        onClose();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Product name"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            type="number"
            label="Product price"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <TextField
            fullWidth
            type="number"
            label="Product inventory"
            variant="outlined"
            value={inventory}
            onChange={(e) => setInventory(Number(e.target.value))}
          />
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">https://</InputAdornment>
              ),
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleCreateProduct}
          color="primary"
        >
          Update Product
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
