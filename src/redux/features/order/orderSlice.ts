import { createSlice } from "@reduxjs/toolkit";

  

const initialState = {
 orderData: []
};

const authSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
  },
});

export default authSlice.reducer;
