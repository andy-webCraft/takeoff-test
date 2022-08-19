import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ContactsPage from "./components/ContactsPage/ContactsPage";
import LoginPage from "./components/LoginPage/LoginPage";
import s from "./App.module.scss";

const App = () => {
  return (
    <div className={s.wrapper}>
      <Header />

      <div className={s.body}>
        <Routes>
          <Route path="/" element={<ContactsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
