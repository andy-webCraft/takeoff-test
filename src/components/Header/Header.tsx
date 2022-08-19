import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { authSelect, logOut } from "../../redux/slices/auth.slice";
import Button from "../common/Button/Button";
import s from "./Header.module.scss";

const Header = () => {
  const { isLogin } = useAppSelector(authSelect);

  const dispatch = useAppDispatch();

  return (
    <header className={s.wrapper}>
      <Link to="/">
        <h1 className={s.title}>Taskoff Test</h1>
      </Link>

      <div className={s.links}>
        <NavLink to="/">Contacts</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>

      {isLogin && (
        <div className={s.actions}>
          <Button clickHandler={() => dispatch(logOut())}>Sign out</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
