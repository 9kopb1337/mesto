const popup = document.querySelector(".popup");
const buttonEditOpen = document.querySelector(".profile__button_act_edit");
const buttonClose = document.querySelector(".popup__button_act_exit");
const getName = document.querySelector(".profile__name");
const getDescription = document.querySelector(".profile__description");
const editForm = document.querySelector(".popup__form");
let nameInput = editForm.querySelector(".popup__input_type_name");
let descriptionInput = editForm.querySelector(".popup__input_type_description");

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = getName.textContent;
  descriptionInput.value = getDescription.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  getName.textContent = nameInput.value;
  getDescription.textContent = descriptionInput.value;
  closePopup();
}

buttonEditOpen.addEventListener("click", openPopup);
buttonClose.addEventListener("click", closePopup);
editForm.addEventListener("submit", formSubmitHandler);
