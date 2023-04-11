export class UserInfo {
  constructor({ selectorUserName, selectorUserDescription, selectorUserAvatar }) {
    this._profileName = document.querySelector(selectorUserName);
    this._profileDescription = document.querySelector(selectorUserDescription);
    this._profileAvatar = document.querySelector(selectorUserAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
    }
  }

  setUserInfo({name, about}) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = about;
  }

  setUserAvatar(url) {
    this._profileAvatar.src = url.avatar;
  }
}
