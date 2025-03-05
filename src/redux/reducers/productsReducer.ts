import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/Iproduct";
const initialState: IProduct[] = [
  {
    id: "1",
    title: "test",
    price: 100,
    imageURL: "test",
    rating: 5,
  },
];

const productsReducer = createSlice({
  name: "products",
  initialState: initialState as IProduct[],
  reducers: {
    setProducts: (_, action: PayloadAction<IProduct[]>) => {
      return action.payload;
    },
    addProduct: (state: IProduct[], action: PayloadAction<IProduct>) => {
      return [...state, action.payload];
    },
    deleteProduct: (state: IProduct[], action: PayloadAction<string>) => {
      const data = state.filter((item) => item.id !== action.payload);
      return data;
    },
  },
});

export const { setProducts, addProduct, deleteProduct } =
  productsReducer.actions;
export default productsReducer.reducer;
