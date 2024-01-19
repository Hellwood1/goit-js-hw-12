"use strict";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '41881692-6f4b64110761e7ecb64cd986a';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  enableKeyboard: true,
  docClose: true,
});

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const form = document.querySelector('.form');
  const myGallery = document.querySelector('.gallery');
  const loader = document.querySelector('.loader');

  const searchParamsDefault = {
    key: API_KEY,
    q: 'query',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const searchQuery = event.target.elements.search.value.trim();
  if (!searchQuery) {
    showNoImagesMessage('Please enter a valid search query!');
    return;
  }

  const searchParams = { ...searchParamsDefault, q: encodeURIComponent(searchQuery) };

  clearPreviousResults();
  showLoader(true);

  const url = `${BASE_URL}${new URLSearchParams(searchParams)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Something went wrong. Please try again later.`);
    }

    const { hits } = await response.json();

    if (hits.length === 0) {
      showNoImagesMessage('Sorry, there are no images matching your search query. Please try again!');
    } else {
      renderImages(hits);
      lightbox.refresh();
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    showLoader(false);
    form.reset();
  }
};

const showNoImagesMessage = (message) => {
  iziToast.error({
    message: message,
    backgroundColor: '#EF4040',
    messageColor: '#FFFFFF',
    maxWidth: 300,
    timeout: 2000,
    progressBar: false,
    position: 'topRight',
    transitionIn: 'bounceInRight',
    transitionOut: 'fadeOutLeft',
    messageSize: 12,
  });
};

const renderImages = (hits) => {
  const myGallery = document.querySelector('.gallery');

  myGallery.innerHTML = hits.map((image) => `
    <li class='gallery-item'>
        <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class='info-container'>
          <div>
            <h3 class='card-title'>Likes</h3>
            <p class='card-info'>${image.likes}</p>
          </div>
          <div>
            <h3 class='card-title'>Views</h3>
            <p class='card-info'>${image.views}</p>
          </div>
          <div>
            <h3 class='card-title'>Comments</h3>
            <p class='card-info'>${image.comments}</p>
          </div>
          <div>
            <h3 class='card-title'>Downloads</h3>
            <p class='card-info'>${image.downloads}</p>
          </div>
        </div>
      </li>`).join('');
};

const clearPreviousResults = () => {
  const myGallery = document.querySelector('.gallery');
  myGallery.innerHTML = '';
};

const showLoader = (state) => {
  const loader = document.querySelector('.loader');
  loader.style.display = state ? 'block' : 'none';
};

const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);