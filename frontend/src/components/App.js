import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js"
import { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom"
import ImagePopup from "./ImagePopup.js"
import Card from "./Card.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import { tokenApi } from "../utils/Api.js"
import EditProfilePopup from "./EditProfilePopup.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import AddPlacePopup from "./AddPlacePopup.js"
import Register from "./Register.js"
import Login from "./Login.js"
import InfoTooltip from "./InfoTooltip.js"
import { ProtectedRoute } from "./ProtectedRoute.js"
import * as auth from "../utils/Auth.js"
import { useNavigate } from "react-router-dom"

export default function App({}) {
  const [editProfilePopup, setEditProfilePopup] = useState(false)
  const [addCardPopup, setAddCardPopup] = useState(false)
  const [editAvatarPopup, setEditAvatarPopup] = useState(false)
  const [zoomCard, setZoomCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserData] = useState("")
  const [infoTooltip, setInfoTooltip] = useState(false)
  const [successfully, setSuccessfully] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const navigate = useNavigate()

  // получаем данные аватара и профиля с сервера
  // рендер данных при открытии страницы
  useEffect(() => {
    loggedIn &&
      Promise.all([tokenApi.getUserData(), tokenApi.getInitialCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo)
          setCards(cards.data.reverse())
        })
        .catch((err) => {
          console.log(`ошибка ${err}`)
        })
    
  }, [loggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id)
    ;(isLiked
      ? tokenApi.deleteLikeCard(card._id)
      : tokenApi.cardLike(card._id, true)
    )
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === newCard.data._id ? newCard.data : c))
        )
      })
      .catch((err) => console.log(err))
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true)
  }

  function handleAddPlaceClick() {
    setAddCardPopup(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopup(true)
  }

  function closePopupAll() {
    setEditProfilePopup(false)
    setAddCardPopup(false)
    setEditAvatarPopup(false)
    setInfoTooltip(false)
    setZoomCard(null)
  }

  function handleCardClick(card) {
    setZoomCard(card)
  }

  function handleInfoTooltip() {
    setInfoTooltip(true)
  }

  function handleSuccesfyl() {
    setSuccessfully(true)
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    tokenApi
      .deleteCard(card._id)
      .then((res) => {
        setCards((cardsArray) =>
          cardsArray.filter((item) => item._id !== card._id)
        )
      })
      .catch((error) => console.log`(Ошибка: ${error})`)
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true)
    tokenApi
      .editProfile(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closePopupAll()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleupdateUserModule(link) {
    setIsLoading(true)
    tokenApi
      .updateUserModule(link)
      .then((data) => {
        setCurrentUser(data)
        closePopupAll()
      })
      .catch((err) => {
        console.log(`Возникла ошибка при изменении аватара, ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlace(data) {
    tokenApi
      .createNewCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
        closePopupAll()
      })
      .catch((err) => {
        console.log(`Возникла ошибка при добавлении карточки, ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setUserData(res.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((error) => console.log(`Произошла ошибка: ${error}`));
    }
  };

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          setLoggedIn={setLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onClickCard={handleCardClick}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
                userEmail={userEmail}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={() => setLoggedIn(true)}
                setInfoTooltip={setInfoTooltip}
                setSuccessfully={setSuccessfully}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                setInfoTooltip={setInfoTooltip}
                setSuccessfully={setSuccessfully}
              />
            }
          />
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-up" replace />
              )
            }
          />
          <Route path="*" element={<Register />} />
        </Routes>

        {loggedIn && (
          <EditProfilePopup
            isOpen={editProfilePopup}
            onClose={closePopupAll}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />
        )}

        {loggedIn && (
          <AddPlacePopup
            isOpen={addCardPopup}
            onClose={closePopupAll}
            onAddPlace={handleAddPlace}
            onLoading={isLoading}
          />
        )}

        {loggedIn && (
          <EditAvatarPopup
            isOpen={editAvatarPopup}
            onClose={closePopupAll}
            onupdateUserModule={handleupdateUserModule}
            onLoading={isLoading}
          />
        )}

        {loggedIn && <ImagePopup card={zoomCard} onClose={closePopupAll} />}

        {!loggedIn && (
          <InfoTooltip
            onClose={closePopupAll}
            isOpen={infoTooltip}
            successfully={successfully}
          />
        )}

        {loggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  )
}
