const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formPlace = document.forms.place;
const formPlaceFields = Array.from(formPlace.querySelectorAll('.popup__input'));
const buttonSubmitFormPlace = formPlace.querySelector('.popup__button_act_submit');

formPlaceFields.forEach((elementField) => {
  const elementError = formPlace.querySelector(`#${elementField.id} + .form__item-error`);

  elementField.addEventListener('input', (e) => {
    const field = e.target;

    const fieldIsValid = field.validity.valid;
    elementError.textContent = field.validationMessage;

    if (!fieldIsValid) {
      field.classList.add('form__item-input_invalid');
    } else {
      field.classList.remove('form__item-input_invalid');
    }

    const formIsValid = formPlaceFields.every(({ validity}) => validity.valid);
    if (formIsValid) {
      buttonSubmitFormPlace.removeAttribute('disabled');
    } else {
      buttonSubmitFormPlace.setAttribute('disabled', 'disabled');
    }
  });
})

const submitPlaceHandler = (e) => {
  e.preventDefault();

  const formIsValid = formPlaceFields.every(({ validity }) => validity.valid);
  if(formIsValid) {
    const name = e.target.name.value;
    const link = e.target.link.value;

    closePopup(popupPlace);

    const place = createPlace(name, link);

    addPlace(place);
  }
}
