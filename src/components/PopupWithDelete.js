import Popup from "./Popup.js";

export class PopupWithDelete extends Popup {
  constructor(selectorPopup, { submitCallback }) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._buttonSubmit = this._popup.querySelector('.popup__button_act_submit');
  }

  openWarning(cardElement, idCard) {
    super.open();
    this.id = idCard;
    this.card = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._submitCallback(this.id, this.card);
    })
  }
}
