export class Card {
  constructor({data, handleCardClick, deleteCard, likeCard, removeCardLike, templateSelector, userId}) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._setLike = likeCard;
    this._likesNumber = data.likes.length;
    this._deleteCard = deleteCard;
    this.cardData = data;
    this.idCard = data._id;
    this._name = data.name;
    this._link = data.link;
    this._dataLikes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._removeLike = removeCardLike;
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

    this._photoElementTitle = this.photoElement.querySelector('.element__title');
    this._photoElementPicture = this.photoElement.querySelector('.element__picture');
    this._photoElementLike = this.photoElement.querySelector('.element__like');
    this._photoElementLikesNumber = this.photoElement.querySelector('.element__likes-number');
    this._photoElementDelete = this.photoElement.querySelector('.element__delete');

    this._photoElementTitle.textContent = this._name;
    this._photoElementPicture.src = this._link;
    this._photoElementPicture.alt = this._name;

    this.renderLikes(this.cardData);

    if (this._ownerId !== this._userId) {
      this._photoElementDelete.remove();
    };

    return this.photoElement;
  }

  isLiked() {
    return this._dataLikes.some(like => like._id === this._userId);
  }

  likePhoto() {
    this.isLiked() === true ? this._removeLike(this.idCard) : this._setLike(this.idCard);
  }

  renderLikes(card) {
    this._dataLikes = card.likes;

    this._dataLikes.length === 0 ? this._photoElementLikesNumber.textContent = '0' : this._photoElementLikesNumber.textContent = this._dataLikes.length;

    this.isLiked() === true ? this._photoElementLike.classList.add('element__like_active') : this._photoElementLike.classList.remove('element__like_active');
  }

  _deletePhoto() {
    this._element.remove();
  }

  _setEventListeners() {
    this._photoElementLike.addEventListener("click", () => this._likeCard());
    this._photoElementDelete.addEventListener("click", () => this._deleteCard());
    this._photoElementPicture.addEventListener("click", () =>  this._handleCardClick());
  }
}

