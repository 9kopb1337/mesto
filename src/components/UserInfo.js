export class UserInfo {
  constructor({ selectorUserName, selectorUserDescription, selectorUserAvatar }) {
    this._profileName = document.querySelector(selectorUserName);
    this._profileDescription = document.querySelector(selectorUserDescription);
    this._avatar = document.querySelector(selectorUserAvatar);
  }
  getUserInfo() {
    this._formValues = {
      profile__name: this._profileName.textContent,
      profile__description: this._profileDescription.textContent,
      profile__avatar: this._avatar.src
    }

    return this._formValues;
  }
  setUserInfo(name, description) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }
  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
