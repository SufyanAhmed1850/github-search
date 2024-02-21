import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./slice/listSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
    reducer: {
        listReducer,
        userReducer,
    },
});
