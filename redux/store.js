import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	storage,
	key: "root",
};

let store;

const persistedReducer = persistReducer(persistConfig, reducer);

if (typeof window === "undefined") {
	store = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }),
	});
} else {
	store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }),
	});
}
export default store;
