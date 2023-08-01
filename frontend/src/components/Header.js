import { Link, useLocation, useNavigate } from "react-router-dom";
import hederLogo from "../images/header/header__logo.svg";
import { ProtectedRoute } from "./ProtectedRoute";
import { useEffect, useState } from "react";

export default function Header({ userEmail, loggedIn, setLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";

  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    setLoggedIn(false);
  }

  return (
    <header className="header">
      <Link className="header__link" to="/">
        <img src={hederLogo} alt="логотип хедер" className="header__logo" />
      </Link>

      {!loggedIn ? (
        <Link to={path} className="header__link">
          {location.pathname === "/sign-in" ? "Зарегестрироваться" : "Войти"}
        </Link>
      ) : (
        <div className="header__container">
          <p className="header__paragraph">{userEmail}</p>
          <button className="header__button" onClick={signOut}>
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}