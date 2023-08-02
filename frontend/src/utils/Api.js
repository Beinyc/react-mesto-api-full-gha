import { config } from "./utils.js"

export default class Api {
  constructor({ config }) {
    // this.tokenAuthorization = tokenAuthorization
    this._urlSrvers = config.urlSrvers
    this._headers = config.headers
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
      headers: this._headers,
      credentials: 'include'
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  getInitialCards() {
    return fetch(`${this._urlSrvers}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include'
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  editProfile(data) {
    return fetch(`${this._urlSrvers}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._serverResponse)
  }

  createNewCard(cardData) {
    return fetch(`${this._urlSrvers}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
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
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  cardLike(cardId) {
    return fetch(`${this._urlSrvers}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._urlSrvers}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._serverResponse(res)
    })
  }

  updateUserModule(data) {
    return fetch(`${this._urlSrvers}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    }).then((res) => {
      return this._serverResponse(res)
    })
  }
}

const tokenApi = new Api({ config })

export { tokenApi }
