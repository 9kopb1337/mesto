const popupEditProfile = document.querySelector(".popup_edit_profile");
const buttonEditOpen = document.querySelector(".profile__button_act_edit");
const buttonClose = document.querySelector(".popup__button_act_exit");
const getName = document.querySelector(".profile__name");
const getDescription = document.querySelector(".profile__description");
const editForm = document.querySelector(".popup__form_edit");
let nameInput = editForm.querySelector(".popup__input_type_name");
let descriptionInput = editForm.querySelector(".popup__input_type_description");

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

const elementsList = document.querySelector(".elements");
const elementTemplate = document.querySelector(".elements-template").content;

initialCards.forEach((element) => {
  const cardElement = elementTemplate.cloneNode(true);

  cardElement.querySelector(".element__title").textContent = element.name;
  cardElement.querySelector(".element__picture").src = element.link;

  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  })

  cardElement.querySelector('.element__delete').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  })

  elementsList.append(cardElement);
});

function openEditPopup() {
  popupEditProfile.classList.add("popup_opened");
  nameInput.value = getName.textContent;
  descriptionInput.value = getDescription.textContent;
}

function closeEditPopup() {
  popupEditProfile.classList.remove("popup_opened");
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  getName.textContent = nameInput.value;
  getDescription.textContent = descriptionInput.value;
  closeEditPopup();
}

buttonEditOpen.addEventListener("click", openEditPopup);
buttonClose.addEventListener("click", closeEditPopup);
editForm.addEventListener("submit", editFormSubmitHandler);

const popupAddPhoto = document.querySelector(".popup_add_photo");
const buttonAddOpen = document.querySelector(".profile__button_act_add");
const buttonClosePhoto = document.querySelector(
  ".popup__button_act_exit_photo"
);
const getPhotoName = document.querySelector(".element__title");
const getPhotoLink = document.querySelector(".element__picture");
const addPhotoForm = document.querySelector(".popup__form_photo");
let photoNameInput = addPhotoForm.querySelector(
  ".popup__input_type_name_photo"
);
let photoLinkInput = addPhotoForm.querySelector(
  ".popup__input_type_photo_link"
);

function openAddPopup() {
  popupAddPhoto.classList.add("popup_opened");
}

function closeAddPopup() {
  popupAddPhoto.classList.remove("popup_opened");
}

function addPhotoSubmitHandler(evt) {
  evt.preventDefault();
  const cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector(".element__title").textContent =
    photoNameInput.value;
  cardElement.querySelector(".element__picture").src = photoLinkInput.value;

  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  })

  cardElement.querySelector('.element__delete').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  })

  cardElement.querySelector('.element__picture').addEventListener('click', () => {

  })

  elementsList.prepend(cardElement);

  closeAddPopup();
  photoNameInput.value = "";
  photoLinkInput.value = "";
}

buttonAddOpen.addEventListener("click", openAddPopup);
buttonClosePhoto.addEventListener("click", closeAddPopup);
addPhotoForm.addEventListener("submit", addPhotoSubmitHandler);


const photoPopup = document.querySelector('.popup_open_photo');
const oneMorePopup = document.querySelector('.popup__photo');
const photo = document.querySelector('.element__picture');
const photoLink = document.querySelector('.element__picture').src;
const photoName = document.querySelector('.element__title').textContent;
const photoPopupClose = document.querySelector('.popup__button_act_exit_photo_popup');

function openPhotoPopup() {
  photoPopup.classList.add("popup_opened");
  photoPopup.querySelector(".popup__photo-link").src = photo.src;
  photoPopup.querySelector(".popup__photo-name").textContent = photoName;
}

function closePhotoPopup() {
  photoPopup.classList.remove("popup_opened");
}

photo.addEventListener('click', openPhotoPopup);
photoPopupClose.addEventListener('click', closePhotoPopup);
