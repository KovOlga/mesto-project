import { popupImage, popupAgreeDelete } from "./data.js";
import { openPopup, closePopup } from "./modal.js";
import { deleteCard, addLike, removeLike } from "./api.js";

const popupImagePicture = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const photoElementsGallery = document.querySelector(".photo-elements__list");
const photoCardTemplateContent = document.querySelector(
  "#photo-cards-template"
).content;

let currentUserId;

function setCurrentUserId(userId) {
  currentUserId = userId;
}

function renderCard(cardData) {
  photoElementsGallery.prepend(createCardElement(cardData));
}

function createCardElement(cardData) {
  // console.log(currentUserId);
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

  const counterLike = photoCardElement.querySelector(
    ".photo-elements__like-counter"
  );
  const btnLike = photoCardElement.querySelector(
    ".photo-elements__like-button"
  );

  //отрисовали, где уже есть лайк юзера
  console.log(cardData.likes);
  if (cardData.likes) {
    cardData.likes.forEach((likeElement) => {
      if (likeElement._id === currentUserId) {
        // console.log(likeElement);
        btnLike.classList.add("photo-elements__like-button_active");
      }
    });
  }

  //отрисовали количество лайков
  if (cardData.likes.length === 0) {
    counterLike.classList.add("photo-elements__like-container_disabled");
  } else {
    const str = cardData.likes.length.toString();
    counterLike.textContent = str;
  }

  //слушатель добавления/удаления лайка
  btnLike.addEventListener("click", (evt) => {
    if (btnLike.classList.contains("photo-elements__like-button_active")) {
      removeLike(cardData._id)
        .then((newLikesArr) => {
          // console.log("remove like");
          // console.log(newLikesArr.likes);

          evt.target.classList.toggle("photo-elements__like-button_active");
          if (newLikesArr.likes.length === 0) {
            counterLike.classList.add(
              "photo-elements__like-container_disabled"
            );
          } else {
            counterLike.classList.remove(
              "photo-elements__like-container_disabled"
            );
            const likeNumber = newLikesArr.likes.length.toString();
            counterLike.textContent = likeNumber;
          }
        })
        .catch((err) => {
          console.log(
            `Ошибка при отправке данных о лайке на сервер: ${err.message}`
          );
        });
    } else {
      addLike(cardData._id)
        .then((newLikesArr) => {
          // console.log("add like");
          // console.log(newLikesArr.likes);

          evt.target.classList.toggle("photo-elements__like-button_active");
          counterLike.classList.remove(
            "photo-elements__like-container_disabled"
          );
          const likeNumber = newLikesArr.likes.length.toString();
          counterLike.textContent = likeNumber;
        })
        .catch((err) => {
          console.log(
            `Ошибка при отправке данных о лайке на сервер: ${err.message}`
          );
        });
    }
  });

  const btnDeletePhotoElement = photoCardElement.querySelector(
    ".photo-elements__bin-button"
  );

  //отрисовываем иконку корзины и вешаем слушатель открытия попапа/удаления, если айди юзера совпадает
  if (currentUserId === cardData.owner._id) {
    btnDeletePhotoElement.addEventListener("click", () => {
      openPopup(popupAgreeDelete);
      const btnAgreeDelete = document.querySelector(".popup__btn-agree");
      btnAgreeDelete.addEventListener("click", () => {
        deleteCard(cardData._id)
          .then(() => {
            const dlt = btnDeletePhotoElement.closest(".photo-elements__item");
            closePopup(popupAgreeDelete);
            dlt.remove();
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
