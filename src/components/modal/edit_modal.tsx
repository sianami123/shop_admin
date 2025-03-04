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
  const [rating, setRating] = useState(product.rating);

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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
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
export default EditModal;
