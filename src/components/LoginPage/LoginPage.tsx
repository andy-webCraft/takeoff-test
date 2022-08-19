import React, { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { authCheckThunk, authSelect } from "../../redux/slices/auth.slice";
import Button from "../common/Button/Button";
import s from "./LoginPage.module.scss";

const LoginPage = () => {
  let [login, setLogin] = useState("");
  let [password, setPassword] = useState("");

  const { isLogin, error } = useAppSelector(authSelect);
  const dispatch = useAppDispatch();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authCheckThunk({ login, password }));
  };

  if (isLogin) return <Navigate to="/" />;

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={submitHandler}>
        <div className={s.field}>
          <label>Login:</label>
          <input
            type="text"
            name="login"
            placeholder="Enter your login..."
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className={s.field}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className={s.error}>{error}</p>}

        <Button>Sign in</Button>
      </form>
    </div>
  );
};

export default LoginPage;
