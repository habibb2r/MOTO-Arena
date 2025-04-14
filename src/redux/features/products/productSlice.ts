import {  createSlice } from "@reduxjs/toolkit";

export interface TProduct {
  _id?: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  description: string;
  inStock: boolean;
  photo: string;
}
export interface TSearch {
  searchTerm: string;
  minPrice: number;
  maxPrice: number;
  category: string;
  brand: string;
}

interface ProductsState {
  products: TProduct[];
  search: TSearch;  
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  search:{
    searchTerm: "",
    minPrice: 0,
    maxPrice: Infinity,
    category: "",
    brand: "",
  },
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
 
});



export default productsSlice.reducer;
