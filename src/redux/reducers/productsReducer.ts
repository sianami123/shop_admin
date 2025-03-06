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
    updateProduct: (
      state: IProduct[],
      action: PayloadAction<Partial<IProduct>>
    ) => {
      const data = state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
      return data;
    },
    increaseQuantity: (state: IProduct[], action: PayloadAction<IProduct>) => {
      const data = state.map((item) =>
        item.id === action.payload.id
          ? { ...item, stock_quantity: action.payload.stock_quantity || 0 + 1 }
          : item
      );
      return data;
    },
    decreaseQuantity: (state: IProduct[], action: PayloadAction<IProduct>) => {
      const data = state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              stock_quantity: action.payload.stock_quantity || 0 - 1,
            }
          : item
      );
      return data;
    },
    deleteProduct: (state: IProduct[], action: PayloadAction<string>) => {
      const data = state.filter((item) => item.id !== action.payload);
      return data;
    },
  },
});

export const { setProducts, addProduct, deleteProduct, updateProduct } =
  productsReducer.actions;
export default productsReducer.reducer;
