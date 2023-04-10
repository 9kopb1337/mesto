import Popup from "./Popup";

export class PopupWithDelete extends Popup {
  constructor(selectorPopup, { submitFunc }) {
    super(selectorPopup);
    this._submitFunc = submitFunc;
  }

  openWarning(cardElement, idCard) {
    super.open();
    this.id = idCard;
    this.card = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._submitFunc(this.id, this.card);
    })
  }
}
