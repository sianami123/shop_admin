import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
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
  const [rating, setRating] = useState(0);

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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant="filled"
              placeholder="Products name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="number"
              variant="filled"
              placeholder="Products price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <Input
              type="number"
              variant="filled"
              placeholder="Products inventory"
              value={inventory}
              onChange={(e) => setInventory(Number(e.target.value))}
            />
            <InputGroup size="sm">
              <InputLeftAddon>https://</InputLeftAddon>
              <Input
                placeholder="mysite"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleCreateProduct();
              }}
              variant="ghost"
            >
              create product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AddingModal;
