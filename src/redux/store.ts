import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const combinedReducers = combineReducers({
  products: productsReducer,
});

const persistedReducer = persistReducer({
  key : "products",
  storage : storage ,
  whitelist : ['products']
},combinedReducers)


const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleWare) => getDefaultMiddleWare({serializableCheck : false})
});


export default store;
export const persistor = persistStore(store)
