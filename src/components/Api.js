export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}.`);
  }

  getProfileInfo() {
    return fetch(this._url + "/cohort-63/users/me", {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkRes(res))
  }

  getCards() {
    return fetch(this._url + "/cohort-63/cards", {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  patchProfileInfo({ name, description }) {
    return fetch(this._url + "/cohort-63/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        description: description,
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

  postNewCard(formData) {
    return fetch(this._url + "/cohort-63/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        link: formData.link,
      }),
    }).then((res) => this._checkRes(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cohort-63/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  likeCard() {
    return fetch(`${this._url}/cohort-63/cards/likes/${cardId}`, {
      method: callbackIsLiked ? "DELETE" : "PUT",
      headers: this._headers,
      body: JSON.stringify({
        likes,
      }),
    }).then((res) => this._checkRes(res));
  }
}
