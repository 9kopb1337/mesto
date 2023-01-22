const popup = document.querySelector(".popup");
const buttonEditOpen = document.querySelector(".profile__button_act_edit");
const buttonClose = document.querySelector(".popup__button_act_exit");
const getName = document.querySelector(".profile__name");
const getDescription = document.querySelector(".profile__description");
const editForm = document.querySelector(".popup__container");
let nameInput = editForm.querySelector(".popup__input_type_name");
let descriptionInput = editForm.querySelector(".popup__input_type_description");

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
