export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers['authorization'];
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}.`);
  }

  getProfileInfo() {
    return fetch(this._url + "/cohort-63/users/me", {
      headers: {
        authorization: this._authorization
      },
    }).then((res) => this._checkRes(res));
  }

  getCards() {
    return fetch(this._url + "/cohort-63/cards", {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  patchProfileInfo(data) {
    return fetch(this._url + "/cohort-63/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        description: data.description,
      }),
    }).then((res) => this._checkRes(res));
  }

  patchAvatar(avatar) {
    return fetch(this._url + "/cohort-63/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._checkRes(res));
  }

  postNewCard(data) {
    return fetch(this._url + "/cohort-63/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkRes(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cohort-63/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cohort-63/cards/likes/${cardId}`, {
      method: callbackIsLiked ? "DELETE" : "PUT",
      headers: this._headers,
      body: JSON.stringify({
        likes,
      }),
    }).then((res) => this._checkRes(res));
  }
}
