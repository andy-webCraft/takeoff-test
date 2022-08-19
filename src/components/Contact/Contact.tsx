import React, { FC, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { updateContactThunk } from "../../redux/slices/contacts.slice";
import { IUser } from "../../types";
import ContactForm from "../ContactForm/ContactForm";
import s from "./Contact.module.scss";
import {
  faEnvelope,
  faPenToSquare,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button/Button";

type ContactProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  deleteHandler: (id: number) => void;
};

const Contact: FC<ContactProps> = ({
  id,
  name,
  email,
  phone,
  deleteHandler,
}) => {
  let [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();

  const editHandler = (contact: IUser) => {
    dispatch(updateContactThunk(contact));
    setEditMode(false);
  };

  return (
    <li className={s.wrapper}>
      <div className={s.info}>
        {editMode ? (
          <ContactForm
            id={id}
            initialName={name}
            initialEmail={email}
            initialPhone={phone}
            submitHandler={editHandler}
          />
        ) : (
          <>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>

            <Button clickHandler={() => setEditMode(!editMode)}>
              Edit
              <FontAwesomeIcon className={s.icon} icon={faPenToSquare} />
            </Button>
          </>
        )}
      </div>

      <div className={s.actions}>
        {phone && (
          <a className={s.action} href={`tel:+${phone}`}>
            <FontAwesomeIcon className={s.icon} icon={faPhone} />
          </a>
        )}

        {email && (
          <a className={s.action} href={`mailto:${email}`}>
            <FontAwesomeIcon className={s.icon} icon={faEnvelope} />
          </a>
        )}

        <Button clickHandler={() => deleteHandler(id)}>
          Delete
          <FontAwesomeIcon className={s.icon} icon={faTrash} />
        </Button>
      </div>
    </li>
  );
};

export default Contact;
