import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "./api";

export const createCart = createAsyncThunk(
    "cart/createCart",
    async (values, { rejectWithValue }) => {
        try {
            await axios.post(`${url}/carts`, {
                user_id: values.user_id,
                product_id: values.product_id,
                product_name: values.product_name,
                product_image: values.product_image,
                product_price: values.product_price,
                shop: values.shop,
                quantity: values.quantity,
            });
        } catch (err) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const getCartByUserId = createAsyncThunk(
    "cart/getCartByUserId",
    async (user_id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${url}/carts/user/${user_id}`
            );
            return response.data;
        } catch (err) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            await axios.put(`${url}/carts/${id}`, {
                quantity: data.quantity,
            });
        } catch (err) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${url}/carts/${id}`);
        } catch (err) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteCartByUserId = createAsyncThunk(
    "cart/deleteCartByUserId",
    async (user_id, { rejectWithValue }) => {
        try {
            await axios.delete(`${url}/carts/delete-user/${user_id}`);
        } catch (err) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);



