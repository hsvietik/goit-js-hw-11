import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures } from './js/fetchPictures';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
let page = 1;
searchForm.addEventListener('submit', handleSubmit);
function handleSubmit(evt) {
  evt.preventDefault();
  const term = evt.target.searchQuery.value;
  fetchPictures(term, page)
    .then(data => {
      gallery.innerHTML = createMarkup(data.data.hits);
    })
    .catch(err => {
      Notify.failure(`Oops, something went wrong`);
    });
}
function createMarkup(hits) {
  return hits
    .map(
      ({
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card" id='${id}'><img src="${webformatURL}" alt="${tags}" loading="lazy" /><div class="info">
    <p class="info-item"><b>Likes</b>${likes}</p><p class="info-item"><b>Views</b>${views}</p><p class="info-item"><b>Comments</b>
      ${comments}</p><p class="info-item"><b>Downloads</b>${downloads}</p></div></div>`;
      }
    )
    .join('');
}
