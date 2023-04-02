import { initialCards, config } from "../utils/constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm";
import { PopupWithImage } from "./PopupWithImage";
import "../pages/index.css";

const buttonEditOpen = document.querySelector(".profile__button_act_edit");
const buttonAddOpen = document.querySelector(".profile__button_act_add");

const photoCardPopup = new PopupWithImage('.popup_type_photo');

const createCard = (cardData) => {
  const card = new Card(cardData, '.elements-template', () => {
    photoCardPopup.open(cardData);
  });

  return card.generateCard();
};

const cardSection = new Section({
  renderer: (card) => {
    cardSection.addItem(createCard(card));
  }
}, '.elements');

cardSection.renderer(initialCards);

const profileInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserDescription: '.profile__description'
});

const popupFormProfile = new PopupWithForm('.popup_edit_profile', {
  submitCallback: (data) => {
    profileInfo.setUserInfo(data);
  }
})

buttonEditOpen.addEventListener('click', () => {
  popupFormProfile.open();
  popupFormProfile.setInputValues(profileInfo.getUserInfo());
  validationForm['form-profile'].resetValidation();
})

const popupFormAddCards = new PopupWithForm('.popup_add_photo', {
  submitFunc: ({ link, name }) => {
    cardSection.addItem(createCard({
      name: name,
      link: link
    }))
  }
})

buttonAddOpen.addEventListener('click', () => {
  popupFormAddCards.open();
  validationForm['form-photo'].resetValidation();
});

photoCardPopup.setEventListeners();
popupFormProfile.setEventListeners();
popupFormAddCards.setEventListeners();

const validationForm = {};
const enableValidation = (data) => {
  const listForm = Array.from(document.querySelectorAll(data.formSelector))
  listForm.forEach((formElement) => {
    const formValidator = new FormValidator(data, formElement);
    const formName = formElement.getAttribute('name');

    validationForm[formName] = formValidator;
    formValidator.enableValidation();
  })
}
enableValidation(config);
