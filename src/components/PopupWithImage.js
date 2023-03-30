import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoCard = this._popup.querySelector('.popup__photo-link');
    this._textCard = this._popup.querySelector('.popup__photo-name');
  }
  open(card) {
    super.open();
    this._photoCard.src = card.link;
    this._textCard.textContent = card.name;
    this._textCard.alt = card.name;
  }
}
