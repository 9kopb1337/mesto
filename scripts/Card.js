class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _likePhoto() {
    this._elementLike.classList.toggle("element__like_active");
  }

  _deletePhoto() {
    this._element.remove();
  }

  _setEventListeners() {
    this._elementLike.addEventListener("click", () => this._likePhoto());
    this._elementDelete.addEventListener("click", () => this._deletePhoto());
    this._elementPhoto.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__picture").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__picture").alt = this._name;

    this._elementLike = this._element.querySelector(".element__like");
    this._elementDelete = this._element.querySelector(".element__delete");
    this._elementPhoto = this._element.querySelector(".element__picture");

    this._setEventListeners();

    return this._element;
  }
}

export { Card };
