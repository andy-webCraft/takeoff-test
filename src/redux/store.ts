import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import contactsReducer from "./slices/contacts.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
