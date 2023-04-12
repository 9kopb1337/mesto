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

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
  }

  setUserAvatar(url) {
    this._profileAvatar.src = url.avatar;
  }
}
