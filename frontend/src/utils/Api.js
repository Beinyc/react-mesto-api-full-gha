import { config } from "./utils.js"

export default class Api {
  constructor({ config }) {
    this._urlSrvers = config.urlSrvers
  }

  _serverResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`код ошибки: ${res.status}`)
    }
  }

  getUserData() {
    return fetch(`${this._urlSrvers}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  getInitialCards() {
    return fetch(`${this._urlSrvers}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  editProfile(data) {
    return fetch(`${this._urlSrvers}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._serverResponse)
  }

  createNewCard(cardData) {
    return fetch(`${this._urlSrvers}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._urlSrvers}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  cardLike(cardId) {
    return fetch(`${this._urlSrvers}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._urlSrvers}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  updateUserModule(data) {
    return fetch(`${this._urlSrvers}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this._serverResponse(res)
    })
  }
}

const tokenApi = new Api({ config })

export { tokenApi }
