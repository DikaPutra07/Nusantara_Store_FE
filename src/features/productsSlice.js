import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (product, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/products`, {
                name: product.name,
                category_id: product.category_id,
                image: product.image,
                shop: product.shop,
                price: product.price,
                description: product.description,
            });
            return response?.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (product, { rejectWithValue }) => {
        try {
            console.log(product.id);
            const response = await axios.put(`${url}/products/${product.id}`, {
                name: product.name,
                category_id: product.category_id,
                image: product.image,
                shop: product.shop,
                price: product.price,
                description: product.description,
            });
            return response?.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${url}/products/${id}`);
            return response?.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);