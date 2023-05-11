import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (order, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/orders`, order);
            return response?.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

