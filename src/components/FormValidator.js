class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._formSelector = config.formSelector;
    this._error = config.error;
    this._inputErrorClass = config.inputErrorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputSelector = config.inputSelector;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement) {
    this._errorElement = this._form.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._error);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._error);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._error);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._toggleButtonState();
        this._checkInputValidity(input);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }
}

export { FormValidator };
