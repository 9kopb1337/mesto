export class Card {
  constructor({data, handleCardClick, deleteCard, likeCard, cardSelector, userId}) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._likeCard = likeCard;
    this._ownerId = data.ownerId;
    this._userId = userId;
    this._idCard = data.id;
    this._likes = data.likes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  _likePhoto() {
    if (this.isLiked()) {
      this._elementLike.classList.toggle("element__like_active");
    }
  }

  toggleLikeState(res) {
    this._elementNumOfLikes.textContent = res.likes.length;
    this._elementLike.classList.toggle('element__like_active');
  }

  _deletePhoto() {
    this._element.remove();
  }

  _setEventListeners() {
    this._elementLike.addEventListener("click", () => this._likeCard());
    this._elementDelete.addEventListener("click", () => this._deleteCard());
    this._elementPhoto.addEventListener("click", () =>  this._handleCardClick());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;
    this._elementNumOfLikes.textContent = this._likes.length;

    this._elementLike = this._element.querySelector(".element__like");
    this._elementDelete = this._element.querySelector(".element__delete");
    this._elementPhoto = this._element.querySelector(".element__picture");
    this._elementNumOfLikes = this._element.querySelector('.element__likes-number');
    if (this._ownerId != this._userId) {
      this._element.querySelector('.element__delete').classList.add('.element__delete_hidden');
    }

    this._likePhoto();
    this._setEventListeners();

    return this._element;
  }
}

