import axios from "axios";
import { IAuth, IUser } from "../types";

const instance = axios.create({ baseURL: "http://localhost:3001" });

export const api = {
  authCheck() {
    return instance.get<IAuth>("/auth");
  },
  getContacts() {
    return instance.get<IUser[]>("/contacts");
  },
  addContact(newContact: IUser) {
    return instance.post("contacts", newContact);
  },
  updateContact(contact: IUser) {
    return instance.put(`contacts/${contact.id}`, contact);
  },
  deleteContact(id: number) {
    return instance.delete(`/contacts/${id}`);
  },
};
