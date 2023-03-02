export default class Card {
  constructor(
    cardData,
    templateSelector,
    currentUserId,
    { putLike, deleteLike, handleCardDelete, handleImageClick }
  ) {
    this.putLike = putLike;
    this.deleteLike = deleteLike;
    this.selector = templateSelector;
    this.name = cardData.name;
    this.link = cardData.link;
    this.likes = cardData.likes;
    this.cardId = cardData._id;
    this.userId = currentUserId;
    this.cardOwnerId = cardData.owner._id;
    this.isLike = null;
    this.btnLikeActiveClass = "photo-elements__like-button_active";
    this.likeCounterDisabledClass = "photo-elements__like-counter_disabled";
    this.likeContainerDisabledClass = "photo-elements__like-container_disabled";
    this.handleCardDelete = handleCardDelete;
    this.handleImageClick = handleImageClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this.selector)
      .content.querySelector(".photo-elements__item")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this.element
      .querySelector(".photo-elements__like-button")
      .addEventListener("click", (evt) => {
        this._handleLikeClick(evt);
      });
  }

  _processBinBtn() {
    //отрисовываем иконку корзины и вешаем слушатель открытия попапа, если айди юзера совпадает
    if (this.userId === this.cardOwnerId) {
      this.element
        .querySelector(".photo-elements__bin-button")
        .addEventListener("click", (evt) => {
          this.handleCardDelete(evt.target, this.cardId);
        });
    } else {
      this.element.querySelector(".photo-elements__bin-button").remove();
    }
  }

  _showUserLike() {
    //закрасили, если уже есть лайк юзера
    if (this.likes) {
      this.likes.forEach((likeElementOwner) => {
        if (likeElementOwner._id === this.userId) {
          this.element
            .querySelector(".photo-elements__like-button")
            .classList.add(this.btnLikeActiveClass);
        }
      });
    }
  }

  _renderLikes() {
    //  отрисовывает количество лайков
    if (this.likes.length === 0) {
      this.element
        .querySelector(".photo-elements__like-container")
        .classList.add(this.likeContainerDisabledClass);
      this.element
        .querySelector(".photo-elements__like-counter")
        .classList.add(this.likeCounterDisabledClass);
      this.element.querySelector(".photo-elements__like-counter").textContent =
        this.likes.length.toString();
    } else {
      this.element
        .querySelector(".photo-elements__like-container")
        .classList.remove(this.likeContainerDisabledClass);
      this.element
        .querySelector(".photo-elements__like-counter")
        .classList.remove(this.likeCounterDisabledClass);
      this.element.querySelector(".photo-elements__like-counter").textContent =
        this.likes.length.toString();
    }
  }

  _processLike() {
    const likeState = this.likes.some((likeData) => {
      return likeData._id === this.userId;
    });
    this.isLike = likeState;
  }

  _handleLikeClick(evt) {
    this._processLike();
    if (this.isLike) {
      return this.deleteLike(this.cardId)
        .then((newCardData) => {
          evt.target.classList.toggle(this.btnLikeActiveClass);
          this.likes = newCardData.likes;
          this._renderLikes();
        })
        .catch((err) => {
          console.log(
            `Ошибка при отправке данных о лайке на сервер: ${err.message}`
          );
        });
    } else {
      return this.putLike(this.cardId)
        .then((newCardData) => {
          evt.target.classList.toggle(this.btnLikeActiveClass);
          this.likes = newCardData.likes;
          this._renderLikes();
        })
        .catch((err) => {
          console.log(
            `Ошибка при отправке данных о лайке на сервер: ${err.message}`
          );
        });
    }
  }

  generate() {
    this.element = this._getElement();

    this.element.querySelector(".photo-elements__title").textContent =
      this.name;
    this.element.querySelector(".photo-elements__image").src = this.link;
    this.element.querySelector(".photo-elements__image").alt = this.name;
    this.element
      .querySelector(".photo-elements__image")
      .addEventListener("click", () =>
        this.handleImageClick(this.name, this.link)
      );

    this._processBinBtn();
    this._renderLikes();
    this._showUserLike();
    this._setEventListeners();

    return this.element;
  }
}

export {
  renderCard,
  setCurrentUserId,
  createCardElement,
  photoElementsGallery,
};
