import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = "a45e2d90be474410afb0d4dd9f518529";
const BASE_URL = 'https://api.spoonacular.com/food/products';

interface Product {
  id: number;
  title: string;
  image: string;
}

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get(`${BASE_URL}/search?apiKey=${API_KEY}`);
  return response.data.products;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id: number) => {
  // Mocking DELETE operation
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
