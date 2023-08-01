import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { autHorizen } from "../utils/Auth.js";
import * as auth from "../utils/Auth.js";

export default function Login({
  handleLogin,
  setInfoTooltip,
  setSuccessfully,
}) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigete = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .autHorizen(formValue.email, formValue.password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        handleLogin();
        navigete("/");
      })
      .catch(() => {
        setSuccessfully(false);
        setInfoTooltip(true);
      });
  };

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          className="register__input"
          type="email"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          required
        ></input>
        <input
          placeholder="Пароль"
          className="register__input"
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          required
        ></input>
        <button className="register__button" onSubmit={handleSubmit}>
          Войти
        </button>
      </form>
    </div>
  );
}
