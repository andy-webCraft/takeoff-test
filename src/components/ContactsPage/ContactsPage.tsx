import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { authSelect } from "../../redux/slices/auth.slice";
import {
  addContactThunk,
  contactsSelect,
  deleteContactThunk,
  getContactsThunk,
} from "../../redux/slices/contacts.slice";
import { IUser } from "../../types";
import ContactForm from "../ContactForm/ContactForm";
import Contact from "../Contact/Contact";
import s from "./ContactsPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ContactsPage = () => {
  const { contacts } = useAppSelector(contactsSelect);
  const { isLogin } = useAppSelector(authSelect);

  let [filtredContacts, setFiltredContacts] = useState(contacts);
  let [filter, setFilter] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogin) dispatch(getContactsThunk());
  }, []);

  useEffect(() => {
    if (filter) {
      const filtred = contacts.filter(
        (item) => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
      );
      setFiltredContacts(filtred);
    } else setFiltredContacts(contacts);
  }, [filter, contacts]);

  const addHandler = (newContact: IUser) => {
    dispatch(addContactThunk(newContact));
  };

  const deleteHandler = (id: number) => {
    dispatch(deleteContactThunk(id));
  };

  if (!isLogin) return <Navigate to="/login" />;

  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <ContactForm id={contacts.length + 1} submitHandler={addHandler} />

        <div className={s.filter}>
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            name="filter"
            placeholder="search..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <ul className={s.list}>
        {filtredContacts.length ? (
          filtredContacts.map((item) => (
            <Contact
              key={item.id}
              id={item.id}
              name={item.name}
              email={item.email}
              phone={item.phone}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <span>Nothing found...</span>
        )}
      </ul>
    </div>
  );
};

export default ContactsPage;
