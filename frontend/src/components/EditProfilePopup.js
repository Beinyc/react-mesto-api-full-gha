import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  onLoading,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAboute(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      popupTitle={"Редактировать профиль"}
      textButton={onLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Имя"
        value={name || ""}
        onChange={handleChangeName}
        className="popup__input"
        name="form__name"
        id="name-input"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="form__input-error name-input-error"></span>
      <input
        type="text"
        placeholder="О себе"
        value={about || ""}
        onChange={handleChangeAboute}
        className="popup__input popup__about-me"
        name="form__status"
        id="status-input"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="form__input-error status-input-error"></span>
    </PopupWithForm>
  );
}