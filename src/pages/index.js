import { initialCards, config } from "../utils/constants.js";
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithDelete } from "../components/PopupWithDelete.js";
import "../pages/index.css";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1",
  headers: {
    authorization: "d1d57a13-4584-442b-a02a-78fc4756e763",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getProfileInfo(), api.getCards()])
.then(([resUser, resCard]) => {
  userCurrentId = resUser._id;
  userInfo.setUserInfo(resUser);
  userInfo.setUserAvatar(resUser);
  cardsContainer.renderer(resCard, userCurrentId)
})
.catch((err) => alert(err))

const buttonEditOpen = document.querySelector(".profile__button_act_edit");
const buttonAddOpen = document.querySelector(".profile__button_act_add");
const popupAvatar = document.querySelector(".profile__avatar");
let currentUserId;

const photoCardPopup = new PopupWithImage('.popup_type_photo');

const createCard = (data, user) => {
  const card = new Card({data: data, userId: user, templateSelector: '.template-card',

  handleCardDelete: (cardID, cardElement) => {
    popupFormDelete.open(cardID, cardElement);
  },

  handleCardClick: () => {
    cardImagePopup.open(data);
  },

  handleCardLike: (cardId) => {
    api.putCardLike(cardId)
    .then((res) => {
      card.renderCardLike(res);
    })
    .catch((err) => alert(err))
  },

  handleCardDeleteLike: (cardId) => {
    api.deleteCardLike(cardId)
    .then((res) => {
      card.renderCardLike(res)
    })
    .catch((err) => alert(err))
  }


  });

  return card.generateCard();
}

const cardSection = new Section({
  renderer: (card, idUser) => {
    cardSection.addItem(createCard(card, idUser));
  }
}, '.elements');

cardSection.renderer(initialCards);

const profileInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserDescription: '.profile__description',
  selectorUserAvatar: '.profile__avatar'
});

const popupFormProfile = new PopupWithForm('.popup_edit_profile', {
  submitFunc: (data) => {
    api.setUserInfoApi(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupFormProfile.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormProfile.renderPreloader(false);
    })
  }
})

buttonEditOpen.addEventListener('click', () => {
  popupFormProfile.open();
  popupFormProfile.setInputValues(profileInfo.getUserInfo());
  validationForm['form-profile'].resetValidation();
})

const popupFormAddCards = new PopupWithForm('.popup_add_photo', {
  submitFunc: ({ link, name }) => {
    api.addNewCard(data)
    .then((newCard) => {
      cardsContainer.prependItem(createCard(newCard, userCurrentId));
      popupFormAddCards.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormAddCards.renderPreloader(false);
    })
  }
})

buttonAddOpen.addEventListener('click', () => {
  popupFormAddCards.open();
  validationForm['form-photo'].resetValidation();
});

const popupFormAvatar = new PopupWithForm('.popup_type_avatar', {
  submitCallback: (data) => {
    popupFormAvatar.renderPreloader(true, 'Загрузка...')
    api.setUserAvatar(data)
    .then((resUser) => {
      userInfo.setUserAvatar(resUser);
      popupFormAvatar.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormAvatar.renderPreloader(false);
    })
  }
})

popupAvatar.addEventListener('click', () => {
  popupFormAvatar.open();
  validationForm['form-avatar'].clearValidationForm();
})

const popupFormDelete = new PopupWithDelete('.popup_type_delete', {
  submitCallback: (id, card) => {
    api.deleteCard(id)
    .then(() => {
      card.deleteCard();
      popupFormDelete.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormDelete.renderPreloader(false);
    })
  }
})

photoCardPopup.setEventListeners();
popupFormProfile.setEventListeners();
popupFormAddCards.setEventListeners();
popupFormAvatar.setEventListeners();
popupFormDelete.setEventListeners();

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
