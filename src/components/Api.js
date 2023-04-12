export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers["authorization"];
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}.`);
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => this._checkRes(res))
      .catch((err) => console.log(err));
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => this._checkRes(res))
      .catch((err) => console.log(err));
  }

  patchProfileInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name, about
      }),
    })
      .then((res) => this._checkRes(res))
      .catch((err) => console.log(err));
  }

  patchAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => this._checkRes(res))
      .catch((err) => console.log(err));
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => this._checkRes(res))
      .catch((err) => console.log(err));
  }

  deleteCardApi(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._checkRes(res))
      .catch((err) => console.log(err));
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => this._checkRes(res))
      .catch((err) => console.log(err));
  }

  removeLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._checkRes(res))
      .catch((err) => console.log(err));
  }
}
