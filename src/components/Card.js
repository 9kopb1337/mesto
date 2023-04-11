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
    this._setLike = handleLikeCard;
    this._likesNumber = data.likes.length;
    this._deleteCard = handleDeleteCard;
    this._removeLike = handleRemoveCardLike;
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
    this.photoElement = this._getTemplate();

    this._photoElementTitle =
      this.photoElement.querySelector(".element__title");
    this._photoElementPicture =
      this.photoElement.querySelector(".element__picture");
    this._photoElementLike = this.photoElement.querySelector(".element__like");
    this._photoElementLikesNumber = this.photoElement.querySelector(
      ".element__likes-number"
    );
    this._photoElementDelete =
      this.photoElement.querySelector(".element__delete");

    this._photoElementTitle.textContent = this._name;
    this._photoElementPicture.src = this._link;
    this._photoElementPicture.alt = this._name;

    this.renderLikes(this.cardData);

    if (this._idUserCard !== this._userId) {
      this._photoElementDelete.remove();
    }

    this._setEventListeners();

    return this.photoElement;
  }

  isLiked() {
    return this._dataLikes.some((like) => like._id === this._userId);
  }

  likePhoto() {
    if (this.isLiked()) {
      this._removeLike(this.idCard);
    } else {
      this._setLike(this.idCard);
    }
  }

  renderLikes(card) {
    this._dataLikes = card.likes;

    if (this._dataLikes.length === 0) {
      this._photoElementLikesNumber.textContent = "0";
    } else {
      this._photoElementLikesNumber.textContent = this._dataLikes.length;
    }

    if (this.isLiked()) {
      this._photoElementLike.classList.add("element__like_active");
    } else {
      this._photoElementLike.classList.remove("element__like_active");
    }
  }

  deletePhoto() {
    this.photoElement.remove();
  }

  _setEventListeners() {
    this._photoElementLike.addEventListener("click", () => this.likePhoto());
    this._photoElementDelete.addEventListener("click", () => this._deleteCard(this, this.idCard));
    this._photoElementPicture.addEventListener("click", () => this._handleCardClick());
  }
}
