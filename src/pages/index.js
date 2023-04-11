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
  profileInfo.setUserInfo(resUser);
  profileInfo.setUserAvatar(resUser);
  cardSection.renderContent(resCard, currentUserId)
}).catch(err => console.log(err));

const photoCardPopup = new PopupWithImage('.popup_type_photo');

const createCard = (data, user) => {
  const card = new Card({data: data, userId: user, templateSelector: '.elements-template',

  handleCardClick: () => {
    photoCardPopup.open(data);
  },

  handleLikeCard: (cardId) => {
    indexApi.likeCard(cardId)
    .then((res) => {
      card.renderLikes(res);
    }).catch((err) => alert(err))
  },

  handleRemoveCardLike: (cardId) => {
    indexApi.removeLikeCard(cardId).then((res) => {
      card.renderLikes(res)
    }).catch((err) => alert(err))
  },

  handleDeleteCard: (cardID, cardElement) => {
    popupCardDelete.open(cardID, cardElement);
  }

  });

  return card.generateCard();
}

const cardSection = new Section({
  renderer: (item, userId) => {
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
    }).catch((err) => alert(err))
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
      cardSection.addItem(createCard(newCard, currentUserId));
      popupFormAddCards.close();
    }).catch((err) => alert(err))
  }
})

buttonAddOpen.addEventListener('click', () => {
  popupFormAddCards.open();
  validationForm['form-photo'].resetValidation();
});

const popupAvatarForm = new PopupWithForm('.popup_edit_avatar', {
  submitCallback: (data) => {
    indexApi.patchAvatar(data)
    .then((resUser) => {
      profileInfo.patchAvatar(resUser);
      popupAvatarForm.close();
    }).catch((err) => alert(err))
  }
})

popupAvatar.addEventListener('click', () => {
  popupAvatarForm.open();
  validationForm['form-avatar'].resetValidation();
})

const popupCardDelete = new PopupWithDelete('.popup_delete_photo', {
  submitCallback: (id, card) => {
    indexApi.deleteCard(id)
    .then(() => {
      card.deleteCard();
      popupCardDelete.close();
    }).catch((err) => alert(err))
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
