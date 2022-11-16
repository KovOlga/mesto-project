const popupProfile = document.querySelector('.popup_profile');
const popupNewPlace = document.querySelector('.popup_new-place');
const popupImage = document.querySelector('.popup_image-window');


const popupProfile = document.querySelector('.popupProfile');
document.addEventListener('DOMContentLoaded', function () {
    popupProfile.classList.add('popupProfileTransitions')
});

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
    popupProfile.classList.add('popupProfile_opened');
});
const closePopupProfileButton = document.querySelector('.popupProfile__close-button');
closePopupProfileButton.addEventListener('click', function () {
    popupProfile.classList.remove('popupProfile_opened');
});

const nameInput = document.querySelector('.popupProfile__item_input_name');
const jobInput = document.querySelector('.popupProfile__item_input_job');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

const formElement = document.querySelector('.popupProfile__form');
function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupProfile.classList.remove('popupProfile_opened');
};
formElement.addEventListener('submit', formSubmitHandler);

const popupNewPlace = document.querySelector('.popupNewPlace');
document.addEventListener('DOMContentLoaded', function () {
    popupNewPlace.classList.add('popupNewPlaceTransitions')
});

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', function () {
    popupNewPlace.classList.add('popupNewPlace_opened');
});
const closeNewPlaceButton = document.querySelector('.popupNewPlace__close-button');
closeNewPlaceButton.addEventListener('click', function () {
    popupNewPlace.classList.remove('popupNewPlace_opened');
});

const photoElementsList = document.querySelector('.photo-elements__list');
const photoCardsTemplate = document.querySelector('#photo-cards-template').content;


const popupImageContainer = document.querySelector('.popupImage__container');
document.addEventListener('DOMContentLoaded', function () {
    popupImageContainer.classList.add('popupImageTransitions')
});
const imageCloseBtn = popupImageContainer.querySelector('.popupImage__close-button');

initialCards.forEach(function (element) {
    const cardElemenInitial = photoCardsTemplate.cloneNode(true);

    cardElemenInitial.querySelector('.photo-elements__image').src = element.link;
    cardElemenInitial.querySelector('.photo-elements__image').alt = element.name;
    cardElemenInitial.querySelector('.photo-elements__title').textContent = element.name;
    cardElemenInitial.querySelector('.photo-elements__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('photo-elements__like-button_active');
    });

    cardElemenInitial.querySelector('.photo-elements__image').addEventListener('click', function () {
        popupImageContainer.querySelector('.popupImage__image').src = element.link;
        popupImageContainer.querySelector('.popupImage__image').alt = element.name;
        popupImageContainer.querySelector('.popupImage__caption').textContent = element.name;

        popupImageContainer.classList.add('popupImage_opened');
        imageCloseBtn.addEventListener('click', function () {
            popupImageContainer.classList.remove('popupImage_opened');
        });
    });

    photoElementsList.append(cardElemenInitial);
});

const deleteButtonsArray = document.querySelectorAll('.photo-elements__bin-button');
deleteButtonsArray.forEach(function (dlt) {
    dlt.addEventListener('click', function () {
        const photoElementsItem = dlt.closest('.photo-elements__item');
        photoElementsItem.remove();
    });
});

const newPlaceForm = document.querySelector('.popupNewPlace__form');

function addPhotoCard(evt) {
    evt.preventDefault();

    const inputPlace = document.querySelector('.popupNewPlace__item_input_place');
    const inputImage = document.querySelector('.popupNewPlace__item_input_image');
    const newPhotoItem = photoCardsTemplate.querySelector('.photo-elements__item').cloneNode(true);

    newPhotoItem.querySelector('.photo-elements__image').src = inputImage.value;
    newPhotoItem.querySelector('.photo-elements__image').alt = inputPlace.value;
    newPhotoItem.querySelector('.photo-elements__title').textContent = inputPlace.value;

    newPhotoItem.querySelector('.photo-elements__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('photo-elements__like-button_active');
    });

    const dltBtn = newPhotoItem.querySelector('.photo-elements__bin-button');
    dltBtn.addEventListener('click', function () {
        const dlt = newPhotoItem.closest('.photo-elements__item');
        dlt.remove();
    });

    newPhotoItem.querySelector('.photo-elements__image').addEventListener('click', function () {
        popupImageContainer.querySelector('.popupImage__image').src = newPhotoItem.querySelector('.photo-elements__image').src;
        popupImageContainer.querySelector('.popupImage__image').alt = newPhotoItem.querySelector('.photo-elements__title').textContent;
        popupImageContainer.querySelector('.popupImage__caption').textContent = newPhotoItem.querySelector('.photo-elements__title').textContent;

        popupImageContainer.classList.add('popupImage_opened');
        imageCloseBtn.addEventListener('click', function () {
            popupImageContainer.classList.remove('popupImage_opened');
        });
    });

    popupNewPlace.classList.remove('popupNewPlace_opened');

    inputImage.value = '';
    inputPlace.value = '';

    photoElementsList.prepend(newPhotoItem);
};

newPlaceForm.addEventListener('submit', addPhotoCard);
