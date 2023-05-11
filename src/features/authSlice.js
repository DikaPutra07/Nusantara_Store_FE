import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import jwtDecode from "jwt-decode";

const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    email: "",
    id: "",
    shop: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (values, { rejectWithValue }) => {
        try {
            await axios.post(`${url}/users/register`, {
                name: values.name,
                email: values.email,
                password: values.password,
                shop: values.shop,
            });
        }
        catch (err) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${url}/users/login`, {
                email: values.email,
                password: values.password,
            });
            
            console.log(token);

            localStorage.setItem("token", token.data.data.token);
            return token.data.data.token;
        }
        catch (err) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        loadUser: (state, action) => {
            const token = state.token;
            if (token) {
                const user = jwtDecode(token);
                return {
                    ...state,
                    token: token,
                    name: user.name,
                    email: user.email,
                    id: user.id,
                    shop: user.shop,
                    userLoaded: true,
                };
            }
        },

        logoutUser: (state, action) => {
            localStorage.removeItem("token");
            return {
                ...state,
                token: "",
                name: "",
                email: "",
                id: "",
                shop: "",
                userLoaded: false,
            };
        }
    },
    extraReducers: (builder) => {
        // REGISTER
        builder.addCase(registerUser.pending, (state, action) => {
            return {
                ...state, registerStatus: "loading"
            };
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            return {
                ...state,
                registerStatus: "success",
            };
            
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                ...state,
                registerStatus: "failed",
                registerError: action.payload.message,
            };
        });

        // LOGIN
        builder.addCase(loginUser.pending, (state, action) => {
            return {
                ...state, loginStatus: "loading"
            };
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if(action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    id: user.id,
                    shop: user.shop,
                    loginStatus: "success",
                };
            } else return state;
            
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: "failed",
                loginError: action.payload.message,
            };
        });
    }
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
