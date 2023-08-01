export default function ImagePopup({ card, onClose }) {
    return (
      <div className={`popup popup_type_image ${card && "popup_opened"}`}>
        <div className="popup__images">
          <img
            className="popup__image"
            src={card?.link}
            alt={card && card.name}
          />
          <h3 className="popup__description">{card && card.name}</h3>
          <button
            type="button"
            className="popup__close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    );
  }