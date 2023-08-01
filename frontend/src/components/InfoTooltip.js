import iconFailure from "../images/popup/icon-failure.svg";
import iconSuccessfully from "../images/popup/icon-successfully.svg";

export default function InfoTooltip({ isOpen, onClose, successfully }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__conteiner">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__tooltip">
          <img
            className="popup__images-tooltip"
            src={successfully ? iconSuccessfully : iconFailure}
          />
          <h3 className="popup__title-tooltip">
            {successfully
              ? "Вы успешно зарегестрировались"
              : "Что-то пошло не так. Попробуйте еще раз."}
          </h3>
        </div>
      </div>
    </div>
  );
}