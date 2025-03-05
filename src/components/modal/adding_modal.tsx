import {
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addProduct } from "../../redux/reducers/productsReducer";
import axios from "axios";

interface IPropsModal {
  isOpen: boolean;
  onClose: () => void;
}

function AddingModal({ onClose, isOpen }: IPropsModal) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>();
  const [imageURL, setImageURL] = useState("");
  const [inventory, setInventory] = useState<number>();

  const handleCreateProduct = async () => {
    try {
      const response = await axios.post(
        "https://67c1934d61d8935867e38135.mockapi.io/shop",
        {
          title,
          price,
          imageURL,
          inventory,
          id: Date.now().toString,
        }
      );

      console.log(response);
      if (response?.status === 201) {
        if (price && inventory) {
          dispatch(addProduct({ title, price, imageURL, inventory }));
          onClose();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
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
            placeholder="https://via.placeholder.com/150"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
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
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddingModal;
