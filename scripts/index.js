import { initialCards, config } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const cardElements = document.querySelector(".elements");
const cardTemplate = document
  .querySelector(".elements-template")
  .content.querySelector(".element");

const popupEditProfile = document.querySelector(".popup_edit_profile");
const buttonEditOpen = document.querySelector(".profile__button_act_edit");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.querySelector(".popup__form_edit");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const descriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);

const popupList = document.querySelectorAll(".popup");
const photoPopup = document.querySelector(".popup_open_photo");
const popupPhotoImg = photoPopup.querySelector(".popup__photo-link");
const popupPhotoTitle = photoPopup.querySelector(".popup__photo-name");

const popupAddPhoto = document.querySelector(".popup_add_photo");
const buttonAddOpen = document.querySelector(".profile__button_act_add");
const photoForm = document.querySelector(".popup__form_photo");
const photoNameInput = photoForm.querySelector(".popup__input_type_name");
const photoLinkInput = photoForm.querySelector(
  ".popup__input_type_description"
);

const buttonClose = document.querySelector(".popup__button_act_exit");

const handleCardClick = (elementPhoto) => {
  popupPhotoImg.src = elementPhoto.link;
  popupPhotoImg.alt = elementPhoto.name;
  popupPhotoTitle.textContent = elementPhoto.name;

  openPopup(photoPopup);
};

const createCard = (cardData) => {
  const card = new Card(cardData, ".elements-template", handleCardClick);

  return card.generateCard();
};

initialCards.forEach((cardData) => {
  cardElements.append(createCard(cardData));
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

buttonEditOpen.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

popupEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
});

buttonAddOpen.addEventListener("click", () => {
  openPopup(popupAddPhoto);
  photoForm.reset();
});

const addCard = (card) => {
  cardElements.prepend(createCard(card));
};

photoForm.addEventListener("submit", (event) => {
  event.preventDefault(event);
  addCard({
    name: photoNameInput.value,
    link: photoLinkInput.value,
    alt: photoNameInput.value,
  });
  closePopup(popupAddPhoto);
});

popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.closest(".popup__button_act_exit")
    ) {
      closePopup(evt.currentTarget);
    }
  });
});

const validationProfileEdit = new FormValidator(config, popupEditProfile);
validationProfileEdit.enableValidation();

const validationPhotoAdd = new FormValidator(config, popupAddPhoto);
validationPhotoAdd.enableValidation();
