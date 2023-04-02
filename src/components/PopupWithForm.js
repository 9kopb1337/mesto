import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selectorPopup, { submitFunc }) {
    super(selectorPopup);
    this._submitFunc = submitFunc;
    this._formSubmit = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._formSubmit.querySelectorAll('.popup__input'));
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
  close() {
    this._formSubmit.reset();
    super.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._formSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunc(this._getInputValues());
      this.close();
    })
  }
}

export { PopupWithForm };
