import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../components/products/Iproduct";
const initialState: IProduct[] = [
  {
    id: "1",
    title: "test",
    price: 100,
    imageURL: ["test"],
    createdAt: new Date().toISOString(),
    discount: 0,
    mainImage: "test",
    description: "test description",
    stock: 0,
    details: [],
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
          ? { ...item, stock: (item.stock || 0) + 1 }
          : item
      );
      return data;
    },
    decreaseQuantity: (state: IProduct[], action: PayloadAction<IProduct>) => {
      const data = state.map((item) =>
        item.id === action.payload.id
          ? { ...item, stock: Math.max((item.stock || 0) - 1, 0) }
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

export const {
  setProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  increaseQuantity,
  decreaseQuantity,
} = productsReducer.actions;
export default productsReducer.reducer;
