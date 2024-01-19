"use strict";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/?';

const API_KEY = '41881692-6f4b64110761e7ecb64cd986a';

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

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  enableKeyboard: true,
  docClose: true,
});

const showLoader = state => {
  loader.style.display = state ? 'block' : 'none';
};

const handleFormSubmit = event => {
  event.preventDefault();
  const searchQuery = event.target.elements.search.value.trim();
  if (!searchQuery) {
    console.error('Please enter a valid search query.');
    return;
  }
  
clearPreviousResults();
    
  showLoader(true);
  searchParamsDefault.q = encodeURIComponent(searchQuery);
  
  const searchParams = new URLSearchParams(searchParamsDefault);
  const url = `${BASE_URL}${searchParams}`;  
  getImages(url);
  event.currentTarget.reset();
};

const getImages = url => {
  showLoader(true);
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Something went wrong. Please try again later.`);
      }
      return response.json();
    })
    .then(({ hits }) => {
      if (hits.length === 0) {
        showNoImagesMessage();
      } else {
        renderImages(hits);
        lightbox.refresh();
      }
    })
    .catch(error => {
      console.error(error.message);
    })
    .finally(() => {
      showLoader(false);
    });

    
};

const showNoImagesMessage = () => {
    iziToast.error({
     message: `Sorry, there are no images matching your search query. Please try again!`,
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

const renderImages = hits => {
  myGallery.innerHTML = hits.map(image =>   `
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
  myGallery.innerHTML = '';
};

form.addEventListener('submit', handleFormSubmit);