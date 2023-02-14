const popupEditProfile = document.querySelector(".popup_edit_profile");
const buttonEditOpen = document.querySelector(".profile__button_act_edit");
const buttonEditClose = popupEditProfile.querySelector(
  ".popup__button_act_exit"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editForm = document.querySelector(".popup__form_edit");
const nameInput = editForm.querySelector(".popup__input_type_name");
const descriptionInput = editForm.querySelector(
  ".popup__input_type_description"
);

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector(".elements-template").content;

initialCards.forEach((element) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".element__title").textContent = element.name;
  cardElement.querySelector(".element__picture").src = element.link;
  cardElement.querySelector(".element__picture").alt = element.name;

  cardElement
    .querySelector(".element__like")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like_active");
    });

  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", (evt) => {
      evt.target.closest(".element").remove();
    });

  const photoPopup = document.querySelector(".popup_open_photo");
  const photo = cardElement.querySelector(".element__picture");
  const title = cardElement.querySelector(".element__title");
  const popupPhoto = document.querySelector(".popup_type_photo");
  const buttonClosePhoto = photoPopup.querySelector(".popup__button_act_exit");

  photo.addEventListener("click", () => {
    const popupPhotoImg = popupPhoto.querySelector(".popup__photo-link");
    const popupPhotoTitle = popupPhoto.querySelector(".popup__photo-name");
    photoPopup.classList.add("popup_opened");
    popupPhotoImg.src = photo.src;
    popupPhotoTitle.textContent = title.textContent;
    popupPhotoImg.alt = title.textContent;
  });

  function closeAddPopup() {
    photoPopup.classList.remove("popup_opened");
  }

  buttonClosePhoto.addEventListener("click", closeAddPopup);

  cardsContainer.append(cardElement);
});

function openEditPopup() {
  popupEditProfile.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function closeEditPopup() {
  popupEditProfile.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeEditPopup();
}

buttonEditOpen.addEventListener("click", openEditPopup);
buttonEditClose.addEventListener("click", closeEditPopup);
editForm.addEventListener("submit", handleProfileFormSubmit);

const popupAddPhoto = document.querySelector(".popup_add_photo");
const buttonAddOpen = document.querySelector(".profile__button_act_add");
const photoForm = document.querySelector(".popup__form_photo");
const photoNameInput = photoForm.querySelector(".popup__input_type_name");
const photoLinkInput = photoForm.querySelector(
  ".popup__input_type_description"
);

function openAddPopup() {
  popupAddPhoto.classList.add("popup_opened");
}

function closeAddPopup() {
  popupAddPhoto.classList.remove("popup_opened");
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".element__title").textContent =
    photoNameInput.value;
  cardElement.querySelector(".element__picture").src = photoLinkInput.value;
  cardElement.querySelector(".element__picture").alt = photoNameInput.value;

  cardElement
    .querySelector(".element__like")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like_active");
    });

  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", (evt) => {
      evt.target.closest(".element").remove();
    });

  cardsContainer.prepend(cardElement);

  closeAddPopup();

  photoForm.reset();

  const photoPopup = document.querySelector(".popup_open_photo");
  const photo = document.querySelector(".element__picture");
  const title = document.querySelector(".element__title");
  const popupPhoto = document.querySelector(".popup_type_photo");

  photo.addEventListener("click", () => {
    const popupPhotoImg = popupPhoto.querySelector(".popup__photo-link");
    const popupPhotoTitle = popupPhoto.querySelector(".popup__photo-name");
    photoPopup.classList.add("popup_opened");
    popupPhotoImg.src = photo.src;
    popupPhotoTitle.textContent = title.textContent;
    popupPhotoImg.alt = title.textContent;
  });
}

buttonAddOpen.addEventListener("click", openAddPopup);
photoForm.addEventListener("submit", handleCardFormSubmit);
