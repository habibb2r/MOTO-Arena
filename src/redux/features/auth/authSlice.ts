import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TLogUser {
  name: string;
  email: string;
  role: string;
  photoURL:string;
}
interface TAuthState {
  token: string | null;
  user: TLogUser | null;
}

const initialState: TAuthState = {
  token: localStorage.getItem("accessToken") || null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ token: string; user: TLogUser }>
    ) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.token = action.payload.token;
      localStorage.setItem("accessToken", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export const isAuthenticated = (state: { auth: TAuthState }) =>
  !!state.auth.token;
export default authSlice.reducer;


export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
