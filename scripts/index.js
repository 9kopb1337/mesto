const cardElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('.elements-template').content.querySelector('.element');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const buttonEditOpen = document.querySelector('.profile__button_act_edit');
const buttonEditClose = popupEditProfile.querySelector('.popup__button_act_exit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.querySelector('.popup__form_edit');
const nameInput = editForm.querySelector('.popup__input_type_name');
const descriptionInput = editForm.querySelector('.popup__input_type_description');
const photoPopup = document.querySelector('.popup_open_photo');
const buttonClosePhoto = photoPopup.querySelector('.popup__button_act_exit');
const popupPhotoImg = photoPopup.querySelector('.popup__photo-link');
const popupPhotoTitle = photoPopup.querySelector('.popup__photo-name');
const popupAddPhoto = document.querySelector('.popup_add_photo');
const buttonAddOpen = document.querySelector('.profile__button_act_add');
const photoForm = document.querySelector('.popup__form_photo');
const photoNameInput = photoForm.querySelector('.popup__input_type_name');
const photoLinkInput = photoForm.querySelector('.popup__input_type_description');
const buttonCloseAddPhoto = popupAddPhoto.querySelector('.popup__button_act_exit');

const openPopup = (item) => item.classList.add('popup_opened');
const closePopup = (item) => item.classList.remove('popup_opened');

const editProfile = (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
};

buttonEditOpen.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

buttonAddOpen.addEventListener('click', () => {
  openPopup(popupAddPhoto);
  photoForm.reset();
});

const createCard = (item) => {
  const card = cardTemplate.cloneNode(true);
  const photo = card.querySelector('.element__picture');
  const likeButton = card.querySelector('.element__like');
  const deleteButton = card.querySelector('.element__delete');
  photo.src = item.link;
  photo.alt = item.name;
  card.querySelector('.element__title').textContent = item.name;

  likeButton.addEventListener('click', () =>
    likeButton.classList.toggle('element__like_active')
  );

  deleteButton.addEventListener('click', () => card.remove());

  photo.addEventListener('click', () => {
    const popupPhotoImg = photoPopup.querySelector('.popup__photo-link');
    const popupPhotoTitle = photoPopup.querySelector('.popup__photo-name');
    openPopup(photoPopup);
    popupPhotoImg.src = item.link;
    popupPhotoTitle.textContent = item.name;
    popupPhotoTitle.alt = item.name;
  });
  return card;
};

const renderCards = () => cardElements.append(...initialCards.map(createCard));
renderCards();

photoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = photoNameInput.value;
  const link = photoLinkInput.value;
  const card = createCard({ name, link });
  cardElements.prepend(card);
  closePopup(popupAddPhoto);
});

const popup = document.querySelectorAll('.popup');

popup.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    event.target === popup ? closePopup(popup) : null;
    })
});

popupEditProfile.addEventListener('submit', editProfile);
buttonEditClose.addEventListener('click', () => closePopup(popupEditProfile));
buttonCloseAddPhoto.addEventListener('click', () => closePopup(popupAddPhoto));
buttonClosePhoto.addEventListener('click', () => closePopup(photoPopup));
