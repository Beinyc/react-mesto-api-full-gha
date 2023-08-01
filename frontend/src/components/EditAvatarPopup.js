import PopupWithForm from "./PopupWithForm"
import { useEffect, useRef } from "react"

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onupdateUserModule,
  onLoading,
}) {
  const avatarRef = useRef()

  useEffect(() => {
    avatarRef.current.value = ""
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()

    onupdateUserModule({ avatar: avatarRef.current.value })
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      popupTitle={"Обновить аватар"}
      textButton={onLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        placeholder="Ссылка"
        className="popup__input"
        name="form__name"
        id="avatar-input"
        minLength="2"
        required
      />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}
