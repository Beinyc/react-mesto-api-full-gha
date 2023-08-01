import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function Card({ card, onClickCard, onLikeCrad, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  //Проверяем стоит ли мой лайк
  const isLiked = card.likes.some((i) => i === currentUser._id)
  //Проверяем являюсь ли я владельцем карточки
  const isOwn = (card.owner?._id || card.owner) === currentUser._id;
  
  const cardDeleteButtonClassName = `elements__delete ${
    isOwn ? "elements__delete_inactive" : ""
  }`

  const cardLikeButtonClassName = `elements__like ${
    (isLiked && "elements__like_active") || " "
  }`

  function handleCardClick() {
    onClickCard(card)
  }

  function handleLikeClick() {
    onLikeCrad(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="elements__card">
      <img
        alt={card.name}
        src={card.link}
        onClick={handleCardClick}
        className="elements__image"
      />
      <div className="elements__signature">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-box">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="elements__number-like">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
          type="button"
        />
      )}
    </div>
  )
}
