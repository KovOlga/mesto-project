import { popupImage, popupAgreeDelete } from "./data.js";
import { openPopup, closePopup } from "./modal.js";
import { deleteCard, putLike, deleteLike } from "./api.js";

const popupImagePicture = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const photoElementsGallery = document.querySelector(".photo-elements__list");
const photoCardTemplateContent = document.querySelector(
  "#photo-cards-template"
).content;
const btnAgreeDelete = document.querySelector(".popup__btn-agree");
const btnLikeActiveClass = "photo-elements__like-button_active";
const likeContainerDisabledClass = "photo-elements__like-container_disabled";
const likeCounterDisabledClass = "photo-elements__like-counter_disabled";

let currentUserId;

function setCurrentUserId(userId) {
  currentUserId = userId;
}

function renderCard(cardData) {
  photoElementsGallery.prepend(createCardElement(cardData));
}

function createCardElement(cardData) {
  const photoCardElement = photoCardTemplateContent.cloneNode(true);
  const photoElementTitle = photoCardElement.querySelector(
    ".photo-elements__title"
  );
  photoElementTitle.textContent = cardData.name;
  const photoElementImage = photoCardElement.querySelector(
    ".photo-elements__image"
  );
  photoElementImage.src = cardData.link;
  photoElementImage.alt = cardData.name;

  const counterContainer = photoCardElement.querySelector(
    ".photo-elements__like-container"
  );
  const counterLike = photoCardElement.querySelector(
    ".photo-elements__like-counter"
  );
  const btnLike = photoCardElement.querySelector(
    ".photo-elements__like-button"
  );
  const btnDeletePhotoElement = photoCardElement.querySelector(
    ".photo-elements__bin-button"
  );

  let isLike;

  //закрасили, если уже есть лайк юзера
  if (cardData.likes) {
    cardData.likes.forEach((likeElementOwner) => {
      if (likeElementOwner._id === currentUserId) {
        btnLike.classList.add(btnLikeActiveClass);
      }
    });
  }

  //отрисовали количество лайков
  if (cardData.likes.length === 0) {
    counterLike.classList.add(likeCounterDisabledClass);
    counterContainer.classList.add(likeContainerDisabledClass);
  } else {
    counterLike.textContent = cardData.likes.length.toString();
  }

  function processLike() {
    const likeState = cardData.likes.some((likeData) => {
      return likeData._id === currentUserId;
    });
    isLike = likeState;
  }

  btnLike.addEventListener("click", (evt) => {
    processLike();
    if (isLike) {
      return deleteLike(cardData._id)
        .then((res) => {
          console.log("remove like");
          evt.target.classList.toggle(btnLikeActiveClass);
          if (res.likes.length === 0) {
            counterContainer.classList.add(likeContainerDisabledClass);
            counterLike.classList.add(likeCounterDisabledClass);
          } else {
            counterContainer.classList.remove(likeContainerDisabledClass);
            counterLike.classList.remove(likeCounterDisabledClass);
            counterLike.textContent = res.likes.length.toString();
          }
          cardData = res;
        })
        .catch((err) => {
          console.log(
            `Ошибка при отправке данных о лайке на сервер: ${err.message}`
          );
        });
    } else {
      return putLike(cardData._id)
        .then((res) => {
          console.log("add like");
          evt.target.classList.toggle(btnLikeActiveClass);
          counterContainer.classList.remove(likeContainerDisabledClass);
          counterLike.classList.remove(likeCounterDisabledClass);
          counterLike.textContent = res.likes.length.toString();
          cardData = res;
        })
        .catch((err) => {
          console.log(
            `Ошибка при отправке данных о лайке на сервер: ${err.message}`
          );
        });
    }
  });

  //отрисовываем иконку корзины и вешаем слушатель открытия попапа/удаления, если айди юзера совпадает
  if (currentUserId === cardData.owner._id) {
    btnDeletePhotoElement.addEventListener("click", () => {
      openPopup(popupAgreeDelete);
      btnAgreeDelete.addEventListener("click", () => {
        deleteCard(cardData._id)
          .then(() => {
            closePopup(popupAgreeDelete);
            btnDeletePhotoElement.closest(".photo-elements__item").remove();
          })
          .catch((err) => {
            console.log(`Ошибка при удалении карточки: ${err.message}`);
          });
      });
    });
  } else {
    btnDeletePhotoElement.remove();
  }

  photoElementImage.addEventListener("click", () => {
    popupImagePicture.src = photoElementImage.src;
    popupImagePicture.alt = photoElementImage.alt;
    popupImageCaption.textContent = photoElementTitle.textContent;

    openPopup(popupImage);
  });

  return photoCardElement;
}

export { renderCard, setCurrentUserId };
