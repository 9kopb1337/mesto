import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selectorPopup, { submitCallback }) {
    super(selectorPopup);
    this._submitCallback = (...args) => {
      this.renderLoading(true);
      submitCallback(...args).finally(() => this.renderLoading(false));
    };
    this._formSubmit = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(
      this._formSubmit.querySelectorAll(".popup__input")
    );
    this._submitBtn = this._formSubmit.querySelector(
      ".popup__button_act_submit"
    );
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues = (data) => {
    this._inputList.forEach((input, i) => {
      input.value = Object.values(data)[i];
    });
  };

  close() {
    this._formSubmit.reset();
    super.close();
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    this._submitBtn.textContent = isLoading ? loadingText : this._submitBtnText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSubmit.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }
}
