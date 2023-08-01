import React from "react";
import App from "./App.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  handleCardLike,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onClickCard,
  cards,
  handleCardDelete,
  userEmail,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__info">
            <div
              onClick={onEditAvatar}
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
            <div className="profile__edit" onClick={onEditProfile}>
              <div className="profile__row">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__redact" type="button"></button>
              </div>
              <p className="profile__status">{currentUser.about}</p>
            </div>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__button"
            type="button"
          ></button>
        </section>
        <div className="elements">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onLikeCrad={handleCardLike}
              onClickCard={onClickCard}
              onCardDelete={handleCardDelete}
            />
          ))}
        </div>
      </main>
    </>
  );
}
