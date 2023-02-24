const closeByOverlay = (evt) => {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
};

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

const editProfile = (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
};

buttonEditOpen.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

buttonAddOpen.addEventListener("click", () => {
  openPopup(popupAddPhoto);
  photoForm.reset();
});

const createCard = (cardData) => {
  const card = cardTemplate.cloneNode(true);
  const photo = card.querySelector(".element__picture");
  const like = card.querySelector(".element__like");
  const trash = card.querySelector(".element__delete");
  photo.src = cardData.link;
  photo.alt = cardData.name;
  card.querySelector(".element__title").textContent = cardData.name;

  like.addEventListener("click", () =>
    like.classList.toggle("element__like_active")
  );

  trash.addEventListener("click", () => card.remove());

  photo.addEventListener("click", () => {
    openPopup(photoPopup);
    popupPhotoImg.src = cardData.link;
    popupPhotoTitle.textContent = cardData.name;
    popupPhotoTitle.alt = cardData.name;
  });
  return card;
};

const renderInitialCards = () => cardElements.append(...initialCards.map(createCard));
renderInitialCards();

photoForm.addEventListener("submit", (event) => {
  event.preventDefault(event);
  const name = photoNameInput.value;
  const link = photoLinkInput.value;
  const card = createCard({ name, link });
  cardElements.prepend(card);
  closePopup(popupAddPhoto);
});

const popupList = document.querySelectorAll(".popup");

popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')){
  closePopup(evt.currentTarget);
  }
  });
  });

popupEditProfile.addEventListener("submit", editProfile);

buttonEditClose.addEventListener("click", () => closePopup(popupEditProfile));
buttonCloseAddPhoto.addEventListener("click", () => closePopup(popupAddPhoto));
buttonClosePhoto.addEventListener("click", () => closePopup(photoPopup));
