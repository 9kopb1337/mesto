const cardElements = document.querySelector(".elements");
const cardTemplate = document.querySelector(".elements-template").content.querySelector(".element");
const popupEditProfile = document.querySelector(".popup_edit_profile");
const buttonEditOpen = document.querySelector(".profile__button_act_edit");
const buttonEditClose = popupEditProfile.querySelector(".popup__button_act_exit");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.querySelector(".popup__form_edit");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const descriptionInput = profileEditForm.querySelector(".popup__input_type_description");
const photoPopup = document.querySelector(".popup_open_photo");
const buttonClosePhoto = photoPopup.querySelector(".popup__button_act_exit");
const popupPhotoImg = photoPopup.querySelector(".popup__photo-link");
const popupPhotoTitle = photoPopup.querySelector(".popup__photo-name");
const popupAddPhoto = document.querySelector(".popup_add_photo");
const buttonAddOpen = document.querySelector(".profile__button_act_add");
const photoForm = document.querySelector(".popup__form_photo");
const photoNameInput = photoForm.querySelector(".popup__input_type_name");
const photoLinkInput = photoForm.querySelector(".popup__input_type_description");
const buttonCloseAddPhoto = popupAddPhoto.querySelector(".popup__button_act_exit");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
