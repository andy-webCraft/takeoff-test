import React, { FC, MouseEvent, ReactNode } from "react";
import s from "./Button.module.scss";

type ButtonProps = {
  clickHandler?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

const Button: FC<ButtonProps> = ({ clickHandler, children }) => {
  return (
    <button className={s.btn} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
