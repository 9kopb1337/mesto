class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._formSelector = config.formSelector;
    this._error = config.error;
    this._inputErrorClass = config.inputErrorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputSelector = config.inputSelector;
  }

  _showInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(
      `.${inputSelector.id}-error`
    );
    inputElement.classList.add(this._error);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._error);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(
      `.${inputSelector.id}-error`
    );
    inputElement.classList.remove(this._error);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(inputList) {
    if (hasInvalidInput(inputList)) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._formSelector.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState(inputList);
      }, 0);
    });
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
