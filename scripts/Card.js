const popupElement = document.querySelector(".popup_open_photo");
const popupImage = document.querySelector(".popup__photo-link");
const popupText = document.querySelector(".popup__photo-name");
const popupCloseButton = document.querySelector(".popup__button_act_exit");

class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _handleOpenPopup() {
    popupImage.src = this._link;
    popupText.textContent = this._name;
    popupElement.classList.add('popup_opened');
    document.addEventListener("keydown", closeByEscape);
  }

  _handleClosePopup() {
    popupImage.src = '';
    popupElement.classList.remove('popup_opened');
    document.removeEventListener("keydown", closeByEscape);
  }

  _setEventListeners() {
    this._element.querySelector(".element__picture").addEventListener("click", () => {
      this._handleOpenPopup();
    });

    popupCloseButton.addEventListener("click", () => {
      this._handleClosePopup();
    });

    this._element.querySelector(".element__delete").addEventListener("click", () => {
      this._element.remove();
    })

    this._element.querySelector(".element__like").addEventListener("click", () => {
      this._element.querySelector(".element__like").classList.toggle("element__like_active");
    })

  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__picture").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }

}

initialCards.forEach((item) => {
  const card = new Card(item, ".elements-template");
  const cardElement = card.generateCard();

  document.querySelector(".elements").append(cardElement);
});
