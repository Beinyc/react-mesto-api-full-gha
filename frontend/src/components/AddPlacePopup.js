import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  onLoading,
}) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: title,
      link: link,
    });
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      popupTitle={"Новое место"}
      textButton={onLoading ? "Создание..." : "Создать"}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChangeTitle}
        type="text"
        value={title || ""}
        placeholder="Название"
        className="popup__input"
        name="form__name"
        id="card-input"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="form__input-error card-input-error"></span>
      <input
        onChange={handleChangeLink}
        type="url"
        value={link || ""}
        placeholder="Ссылка на картину"
        className="popup__input popup__about-me"
        name="form__status"
        id="url-input"
        required
      />
      <span className="form__input-error url-input-error"></span>
    </PopupWithForm>
  );
}