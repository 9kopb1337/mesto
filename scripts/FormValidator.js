class FormValidator {
  constructor(config, formSelector) {
    this.config = config;
    this._formSelector = formSelector;
  }

  _showInputError(inputSelector, errorMessage) {
    const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(this.config.error);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.error);
  };

  _hideInputError(inputSelector) {
    const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(this.config.error);
    errorElement.textContent = "";
  };

  _checkInputValidity(inputSelector) {
    if (!inputSelector.validity.valid) {
      showInputError(this._formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      hideInputError(this._formSelector, inputSelector);
    }
  };

  _toggleButtonState(inputList, submitButtonSelector) {
    if (hasInvalidInput(inputList)) {
      submitButtonSelector.classList.add(this.config.inactiveButtonClass);
    } else {
      submitButtonSelector.classList.remove(this.config.inactiveButtonClass);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _setEventListeners() {
    const inputList = Array.from(this._formSelector.querySelectorAll(this.config.inputSelector));
    const buttonElement = this._formSelector.querySelector(this.config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    this._formSelector.addEventListener('reset', (config) => {
      setTimeout((config) => {
        toggleButtonState(inputList, buttonElement, config)
      }, 0);
    })
    inputList.forEach((input) => {
      input.addEventListener('input', function () {
        this._checkInputValidity(this._formSelector, input);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
    });
  };
}
