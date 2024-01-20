"use strict";

import axios from 'axios';
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

let page = 1;
let searchQuery = '';
let totalHits = 0;

const form = document.querySelector('.form');
const myGallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

const searchParams = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};

const showMessage = (message, backgroundColor, messageSize) => {
  iziToast.show({
    message: message,
    backgroundColor: backgroundColor,
    messageColor: '#FFFFFF',
    maxWidth: 300,
    timeout: 2000,
    progressBar: false,
    position: 'topRight',
    transitionIn: 'bounceInRight',
    transitionOut: 'fadeOutLeft',
    messageSize: messageSize,
  });
};

const clearGallery = () => {
  myGallery.innerHTML = '';
};

const toggleLoader = (state) => {
  loader.style.display = state ? 'block' : 'none';
};

const scrollPageByGalleryCardHeight = () => {
  const firstGalleryCard = myGallery.querySelector('.gallery-item');

  if (firstGalleryCard) {
    const cardHeight = firstGalleryCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
};

const renderImage = (image) => `
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
  </li>`;

const fetchData = async (searchParams) => {
  try {
    const response = await axios.get(`${BASE_URL}${new URLSearchParams(searchParams)}`);

    if (response.status !== 200) {
      throw new Error(`Something went wrong. Please try again later.`);
    }

    const { hits, totalHits: newTotalHits } = response.data;

    return { hits, newTotalHits };
  } catch (error) {
    console.error(error.message);
    return { hits: [], newTotalHits: 0 };
  }
};

const handleApiResponse = async (searchParams) => {
  toggleLoader(true);
  const { hits, newTotalHits } = await fetchData(searchParams);
  toggleLoader(false);

  if (hits.length === 0) {
    showMessage('Sorry, there are no images matching your search query. Please try again!', '#EF4040', 12);
  } else {
    hits.forEach((image) => {
      myGallery.innerHTML += renderImage(image);
    });

    lightbox.refresh();
    totalHits = newTotalHits;

    if (myGallery.children.length >= totalHits) {
      loadMoreButton.style.display = 'none';
      showMessage("We're sorry, but you've reached the end of search results.", '#4e75ff', 14);
    } else {
      loadMoreButton.style.display = 'block';
      scrollPageByGalleryCardHeight();
    }
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  searchQuery = event.target.elements.search.value.trim();

  if (!searchQuery) {
    showMessage('Please enter a valid search query!', '#EF4040', 12);
    return;
  }

  page = 1;
  clearGallery();

  searchParams.q = searchQuery;
  handleApiResponse(searchParams);
};

const handleLoadMore = async () => {
  searchParams.page = page;
  handleApiResponse(searchParams);
};

loadMoreButton.addEventListener('click', async () => {
  toggleLoader(true);
  page += 1;
  await handleLoadMore();
  toggleLoader(false);
});

form.addEventListener('submit', handleFormSubmit);
