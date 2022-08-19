import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { IAuth } from "../../types";
import { RootState } from "../store";

type AuthState = {
  isLogin: boolean;
  error: string | null;
}

const initialState: AuthState = { isLogin: false, error: null };

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    logOut(state) {
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authCheckThunk.fulfilled, (state, action) => {
      const loginCheck = action.payload.login === action.meta.arg.login;
      const passwordCheck =
        action.payload.password === action.meta.arg.password;

      if (loginCheck && passwordCheck) {
        state.isLogin = true;
        state.error = null;
      } else {
        state.error = "Invalid login or password";
      }
    });
    builder.addCase(authCheckThunk.rejected, (state) => {
      state.error = "Network error";
    });
  },
});

export const authCheckThunk = createAsyncThunk<IAuth, IAuth, {}>(
  "authcheck",
  async ({ login, password }) => {
    const response = await api.authCheck();
    return response.data;
  }
);

export const { logOut } = authSlice.actions;

export const authSelect = (state: RootState) => state.auth;

export default authSlice.reducer;
