import { tokenAuthorization } from "./utils.js"

export default class Api {
  constructor({ tokenAuthorization }) {
    this.tokenAuthorization = tokenAuthorization
    this._urlSrvers = this.tokenAuthorization.urlSrvers
    this._headers = this.tokenAuthorization.headers
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
      credentials: "include",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  getInitialCards() {
    return fetch(`${this._urlSrvers}/cards`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  editProfile(data) {
    return fetch(`${this._urlSrvers}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._serverResponse)
  }

  createNewCard(cardData) {
    return fetch(`${this._urlSrvers}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
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
      credentials: "include",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  cardLike(cardId) {
    return fetch(`${this._urlSrvers}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._urlSrvers}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  updateUserModule(data) {
    return fetch(`${this._urlSrvers}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._serverResponse(res)
    })
  }
}

const tokenApi = new Api({ tokenAuthorization })

export { tokenApi }
