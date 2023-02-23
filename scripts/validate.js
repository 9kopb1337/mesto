const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_act_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__item-error',
  errorClass: 'form__item-error'
}

const formProfile = document.forms.profile;
const formPhoto = document.forms.photo;

const enableValidation = () => {
  const formPlace = document.forms.profile;
  const formPlaceFields = Array.from(formPlace.querySelectorAll('.popup__input'));
  const buttonSubmitFormPlace = formPlace.querySelector('.popup__button_act_submit');

 formPlaceFields.forEach((elementField) => {
  const elementError = formPlace.querySelector(`#${elementField.id} + .form__item-error`);

  elementField.addEventListener('input', (evt) => {
    const field = evt.target;
    const fieldIsValid = field.validity.valid;
    elementError.textContent = field.validationMessage;

    if (!fieldIsValid) {
      field.classList.add('form__item-input_invalid');
    } else {
      field.classList.remove('form__item-input_invalid');
    }

    const formIsValid = formPlaceFields.every(({ validity }) => validity.valid);
    if (formIsValid) {
      buttonSubmitFormPlace.removeAttribute('disabled');
    } else {
      buttonSubmitFormPlace.setAttribute('disabled', 'disabled');
    }
  })
 })
}

const formList = Array.from(document.querySelectorAll(".form"));
formList.forEach((formElement) => {
  formElement.addEventListener("submit", enableValidation)
})

enableValidation();
