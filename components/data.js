const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const formProfile = document.forms.profile;
const formPlace = document.forms.card;

const nameInput = formProfile.name;
const jobInput = formProfile.job;

const popupProfile = document.querySelector(".popup_profile");

const popupImage = document.querySelector(".popup_image-window");

export {
  initialCards,
  profileName,
  profileJob,
  formProfile,
  formPlace,
  nameInput,
  jobInput,
  popupProfile,
  popupImage,
};
