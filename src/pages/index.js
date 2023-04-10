import { config, apiRes } from "../utils/constants.js";
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithDelete } from "../components/PopupWithDelete.js";
import "../pages/index.css";

const buttonEditOpen = document.querySelector(".profile__button_act_edit");
const buttonAddOpen = document.querySelector(".profile__button_act_add");
const popupAvatar = document.querySelector(".profile__avatar");
let currentUserId;

const indexApi = new Api(apiRes);

Promise.all([indexApi.getProfileInfo(), indexApi.getCards()])
.then(([resUser, resCard]) => {
  currentUserId = resUser._id;
  profileInfo.patchProfileInfo(resUser);
  profileInfo.patchAvatar(resUser);
  cardSection.renderContent(resCard, userCurrentId)
})

const photoCardPopup = new PopupWithImage('.popup_type_photo');

const createCard = (data, user) => {
  const card = new Card({data: data, userId: user, templateSelector: '.template-card',

  handleCardClick: () => {
    photoCardPopup.open(data);
  },

  likeCard: (cardId) => {
    indexApi.likePhoto(cardId)
    .then((res) => {
      card.renderLikes(res);
    })
  },

  /*handleCardDeleteLike: (cardId) => {
    indexApi.deleteCardLike(cardId)
    .then((res) => {
      card.renderCardLike(res)
    })
    .catch((err) => alert(err))
  },*/

  deleteCard: (cardID, cardElement) => {
    popupCardDelete.open(cardID, cardElement);
  }

  });

  return card.generateCard();
}

const cardSection = new Section({
  renderContent: (item, userId) => {
    cardSection.addItem(createCard(item, userId));
  }
}, '.elements');

const profileInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserDescription: '.profile__description',
  selectorUserAvatar: '.profile__avatar'
});

const popupFormProfile = new PopupWithForm('.popup_edit_profile', {
  submitCallback: (data) => {
    indexApi.patchProfileInfo(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      popupFormProfile.close();
    })
  }
})

buttonEditOpen.addEventListener('click', () => {
  popupFormProfile.open();
  popupFormProfile.setInputValues(profileInfo.getUserInfo());
  validationForm['form-profile'].resetValidation();
})

const popupFormAddCards = new PopupWithForm('.popup_add_photo', {
  submitCallback: (data) => {
    indexApi.postNewCard(data)
    .then((newCard) => {
      cardSection.prependItem(createCard(newCard, currentUserId));
      popupFormAddCards.close();
    })
  }
})

buttonAddOpen.addEventListener('click', () => {
  popupFormAddCards.open();
  validationForm['form-photo'].resetValidation();
});

const popupAvatarForm = new PopupWithForm('.popup_type_avatar', {
  submitCallback: (data) => {
    indexApi.patchAvatar(data)
    .then((resUser) => {
      profileInfo.patchAvatar(resUser);
      popupAvatarForm.close();
    })
  }
})

popupAvatar.addEventListener('click', () => {
  popupAvatarForm.open();
  validationForm['form-avatar'].clearValidationForm();
})

const popupCardDelete = new PopupWithDelete('.popup_type_delete', {
  submitCallback: (id, card) => {
    indexApi.deleteCard(id)
    .then(() => {
      card.deleteCard();
      popupCardDelete.close();
    })
  }
})

photoCardPopup.setEventListeners();
popupFormProfile.setEventListeners();
popupFormAddCards.setEventListeners();
popupAvatarForm.setEventListeners();
popupCardDelete.setEventListeners();

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
