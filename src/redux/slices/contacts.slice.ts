import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { IUser } from "../../types";
import { RootState } from "../store";

type ContactsState = {
  contacts: IUser[] | [];
  error: string | null;
};

const initialState: ContactsState = {
  contacts: [],
  error: null,
};

const contactsSlice = createSlice({
  name: "contactsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContactsThunk.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
    builder.addCase(addContactThunk.fulfilled, (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    });
    builder.addCase(deleteContactThunk.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter(
        (item) => item.id !== action.payload
      );
    });
    builder.addCase(updateContactThunk.fulfilled, (state, action) => {
      state.contacts = state.contacts.map((item) => {
        if (item.id === action.payload.id) item = action.payload;
        return item;
      });
    });
  },
});

export const getContactsThunk = createAsyncThunk<IUser[], undefined, {}>(
  "getContacts",
  async () => {
    const response = await api.getContacts();
    return response.data;
  }
);

export const addContactThunk = createAsyncThunk<IUser, IUser, {}>(
  "addContact",
  async (newContact) => {
    const response = await api.addContact(newContact);
    return response.data;
  }
);

export const deleteContactThunk = createAsyncThunk<number, number, {}>(
  "deleteContact",
  async (id) => {
    await api.deleteContact(id);
    return id;
  }
);

export const updateContactThunk = createAsyncThunk<IUser, IUser, {}>(
  "updateContact",
  async (contact) => {
    const response = await api.updateContact(contact);
    return response.data;
  }
);

export const contactsSelect = (state: RootState) => state.contacts;

export default contactsSlice.reducer;
