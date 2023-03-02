export default class Card {
  constructor(
    card,
    user,
    template,
    { putLike, deleteLike, handleCardDelete, handleImageClick }
  ) {
    this._image = card.link;
    this._likes = card.likes;
    this._name = card.name;
    this._cardOwnerId = card.owner._id;
    this._cardId = card._id;
    this._userId = user;
    this._isLiked = card.likes.find((item) => item._id === this._userId);
    this._isMine = this._cardOwnerId === this._userId;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._deleteCard = handleCardDelete;
    this._handleImageClick = handleImageClick;
    this.templateSelector = template;
    this._likeContainerDisableClass = "photo-elements__like-container_disabled";
    this._likeCounterDisableClass = "photo-elements__like-counter_disabled";
    this._likeActiveBtn = "photo-elements__like-button_active";
  }
  _getElement() {
    const newCard = document
      .querySelector(this.templateSelector)
      .content.querySelector(".photo-elements__item")
      .cloneNode(true);
    return newCard;
  }
  generateCard() {
    this._card = this._getElement();
    console.log(this._card);
    this._card.querySelector(".photo-elements__image").src = this._image;
    this._card.querySelector(".photo-elements__image").alt = this._name;
    this._card.querySelector(".photo-elements__title").textContent = this._name;
    // this._renderLikes();
    // this._deleteButton();
    // this._setEventListeners();
    return this._card;
  }
  _renderLikes() {
    if (this._likes === 0) {
      this._card
        .querySelector(".photo-elements__like-container")
        .classList.add(this._likeContainerDisableClass);
      this._card
        .querySelector(".photo-elements__like-counter")
        .classList.add(this._likeCounterDisableClass);
    } else {
      this._card
        .querySelector(".photo-elements__like-container")
        .classList.remove(this._likeContainerDisableClass);
      this._card
        .querySelector(".photo-elements__like-counter")
        .classList.remove(this._likeCounterDisableClass);
      this._card.querySelector(".photo-elements__like-counter").textContent =
        this._likes;
    }
  }
  _toggleLike() {
    if (!this._isLiked) {
      return this._putLike(this._cardId).then((newCardData) => {
        this._likes = newCardData.length;
        this._renderLikes();
        this._isLiked = true;
        this._like.classList.add(this._likeActiveBtn);
      });
    } else {
      return this._deleteLike(this._cardId).then((newCardData) => {
        this._likes = newCardData.length;
        this._renderLikes();
        this._isLiked = false;
        this._like.classList.remove(this._likeActiveBtn);
      });
    }
  }

  _setEventListeners() {
    this._like.addEventListener("click", this._toggleLike());
    this._card
      .querySelector("photo-elements__image")
      .addEventListener(
        "click",
        this._handleImageClick(this._name, this._image)
      );

    if (!this._isMine) {
      this._element.querySelector(".photo-elements__bin-button").remove();
    } else {
      this._element
        .querySelector(".photo-elements__bin-button")
        .addEventListener("click", (evt) => {
          handleCardDelete(evt.target, this._cardId);
        });
    }
  }
}
