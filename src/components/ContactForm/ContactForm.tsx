import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, FormEvent, useState } from "react";
import { IUser } from "../../types";
import Button from "../common/Button/Button";
import s from "./ContactForm.module.scss";

type ContactFormProps = {
  id: number;
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
  submitHandler: (contact: IUser) => void;
};

const ContactForm: FC<ContactFormProps> = ({
  id,
  initialName,
  initialEmail,
  initialPhone,
  submitHandler,
}) => {
  let [name, setName] = useState(initialName || "");
  let [email, setEmail] = useState(initialEmail || "");
  let [phone, setPhone] = useState(initialPhone || "");

  const formHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newContact: IUser = { id, name, email, phone };
    submitHandler(newContact);

    !initialName && setName("");
    !initialEmail && setEmail("");
    !initialPhone && setPhone("");
  };

  return (
    <form className={s.wrapper} onSubmit={formHandler}>
      <div className={s.field}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className={s.field}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={s.field}>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <Button>
        Save
        <FontAwesomeIcon className={s.icon} icon={faSave} />
      </Button>
    </form>
  );
};

export default ContactForm;
