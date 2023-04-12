export class Card {
  constructor({
    data,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard,
    handleRemoveCardLike,
    templateSelector,
    userId,
  }) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._likesNumber = data.likes.length;
    this._handleDeleteCard = handleDeleteCard;
    this._handleRemoveCardLike = handleRemoveCardLike;
    this.cardData = data;
    this.idCard = data._id;
    this._name = data.name;
    this._link = data.link;
    this._dataLikes = data.likes;
    this._idUserCard = data.owner._id;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this.cardElement = this._getTemplate();

    this._cardElementTitle =
      this.cardElement.querySelector(".element__title");
    this._cardElementPicture =
      this.cardElement.querySelector(".element__picture");
    this._cardElementLike = this.cardElement.querySelector(".element__like");
    this._cardElementLikesNumber = this.cardElement.querySelector(
      ".element__likes-number"
    );
    this._cardElementDelete =
      this.cardElement.querySelector(".element__delete");

    this._cardElementTitle.textContent = this._name;
    this._cardElementPicture.src = this._link;
    this._cardElementPicture.alt = this._name;

    this.renderLikes(this.cardData);

    if (this._idUserCard !== this._userId) {
      this._cardElementDelete.remove();
    }

    this._setEventListeners();

    return this.cardElement;
  }

  isLiked() {
    return this._dataLikes.some((like) => like._id === this._userId);
  }

  likePhoto() {
    if (this.isLiked()) {
      this._handleRemoveCardLike(this.idCard);
    } else {
      this._handleLikeCard(this.idCard);
    }
  }

  renderLikes(card) {
    this._dataLikes = card.likes;

    if (this._dataLikes.length === 0) {
      this._cardElementLikesNumber.textContent = "0";
    } else {
      this._cardElementLikesNumber.textContent = this._dataLikes.length;
    }

    if (this.isLiked()) {
      this._cardElementLike.classList.add("element__like_active");
    } else {
      this._cardElementLike.classList.remove("element__like_active");
    }
  }

  deleteCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  _setEventListeners() {
    this._cardElementLike.addEventListener("click", () => this.likePhoto());
    this._cardElementDelete.addEventListener("click", () => this._handleDeleteCard(this, this.idCard));
    this._cardElementPicture.addEventListener("click", () => this._handleCardClick());
  }
}
