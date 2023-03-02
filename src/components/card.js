export default class Card {
  constructor(
    cardData,
    templateSelector,
    currentUserId,
    { putLike, deleteLike, handleCardDelete, handleImageClick }
  ) {
    this.putLike = putLike;
    this.deleteLike = deleteLike;
    this.templateSelector = templateSelector;
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
      .querySelector(this.templateSelector)
      .content.querySelector(".photo-elements__item")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this.btnLike.addEventListener("click", (evt) => {
      this._handleLikeClick(evt);
    });

    this.image.addEventListener("click", () => {
      this.handleImageClick(this.name, this.link);
    });

    this.binBtnElement = this.element.querySelector(
      ".photo-elements__bin-button"
    );

    if (this.userId === this.cardOwnerId) {
      this.binBtnElement.addEventListener("click", (evt) => {
        this.handleCardDelete(evt.target, this.cardId);
      });
    } else {
      this.binBtnElement.remove();
    }
  }

  _showUserLike() {
    //закрасили, если уже есть лайк юзера
    if (this.likes) {
      this.likes.forEach((likeElementOwner) => {
        if (likeElementOwner._id === this.userId) {
          this.btnLike.classList.add(this.btnLikeActiveClass);
        }
      });
    }
  }

  _renderLikes() {
    //  отрисовывает количество лайков
    this.likeContainer = this.element.querySelector(
      ".photo-elements__like-container"
    );
    this.likeCounter = this.element.querySelector(
      ".photo-elements__like-counter"
    );
    if (this.likes.length === 0) {
      this.likeContainer.classList.add(this.likeContainerDisabledClass);
      this.likeCounter.classList.add(this.likeCounterDisabledClass);
      this.likeCounter.textContent = this.likes.length.toString();
    } else {
      this.likeContainer.classList.remove(this.likeContainerDisabledClass);
      this.likeCounter.classList.remove(this.likeCounterDisabledClass);
      this.likeCounter.textContent = this.likes.length.toString();
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

    this.image = this.element.querySelector(".photo-elements__image");
    this.btnLike = this.element.querySelector(".photo-elements__like-button");

    this.element.querySelector(".photo-elements__title").textContent =
      this.name;
    this.image.src = this.link;
    this.image.alt = this.name;

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
