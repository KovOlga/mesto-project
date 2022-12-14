const popupProfile = document.querySelector('.popup_profile');
const popupNewPlace = document.querySelector('.popup_new-place');
const popupImage = document.querySelector('.popup_image-window');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__item_input_name');
const jobInput = document.querySelector('.popup__item_input_job');

const photoElementsGallery = document.querySelector('.photo-elements__list');
const photoCardTemplateContent = document.querySelector('#photo-cards-template').content;

const formPlace = document.querySelector('.popup__form_place');
const inputPlace = document.querySelector('.popup__item_input_place');
const inputImage = document.querySelector('.popup__item_input_image');

const popupImagePicture = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupImageCloseBtn = document.querySelector('.popup__btn-close_image');

document.addEventListener('DOMContentLoaded', () => {
    popupProfile.classList.add('popupTransitions');
    popupNewPlace.classList.add('popupTransitions');
    popupImage.classList.add('popupTransitions');
});

function openPopup(openElement) {
    openElement.classList.add('popup_opened');
};

function closePopup(closElement) {
    closElement.classList.remove('popup_opened');
};

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupProfile);
};

function addClickEventOnElement(selector, callBackFn) {
    document.querySelector(selector).addEventListener('click', callBackFn);
};

function createCard(card) {
    const photoCardElement = photoCardTemplateContent.cloneNode(true);
    const photoElementTitle = photoCardElement.querySelector('.photo-elements__title');
    photoElementTitle.textContent = card.name;
    const photoElementImage = photoCardElement.querySelector('.photo-elements__image');
    photoElementImage.src = card.link;
    photoElementImage.alt = card.name;
    photoCardElement.querySelector('.photo-elements__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('photo-elements__like-button_active');
    });
    const photoElementDeleteBtn = photoCardElement.querySelector('.photo-elements__bin-button');
    photoElementDeleteBtn.addEventListener('click', () => {
        const dlt = photoElementDeleteBtn.closest('.photo-elements__item');
        dlt.remove();
    });

    photoElementImage.addEventListener('click', () => {
        popupImagePicture.src = photoElementImage.src;
        popupImagePicture.alt = photoElementImage.alt;
        popupImageCaption.textContent = photoElementTitle.textContent;

        openPopup(popupImage);
    });

    return photoCardElement;
};

function renderCard(card) {
    photoElementsGallery.prepend(createCard(card));
};

function submitProfileForm(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupProfile);
};

function submitNewCard(evt) {
    evt.preventDefault();

    closePopup(popupNewPlace);

    renderCard({ name: inputPlace.value, link: inputImage.value });

    formPlace.reset();
};

initialCards.forEach(renderCard);
formProfile.addEventListener('submit', submitProfileForm);
formPlace.addEventListener('submit', submitNewCard);

addClickEventOnElement('.profile__edit-button', () => openProfilePopup());
addClickEventOnElement('.popup__btn-close_profile', () => closePopup(popupProfile));
addClickEventOnElement('.profile__add-button', () => openPopup(popupNewPlace));
addClickEventOnElement('.popup__btn-close_place', () => closePopup(popupNewPlace));
addClickEventOnElement('.photo-elements__image', () => openPopup(popupImage));
addClickEventOnElement('.popup__btn-close_image', () => closePopup(popupImage));