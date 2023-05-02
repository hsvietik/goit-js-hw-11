import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures } from './js/fetchPictures';
import { createMarkup } from './js/createMarkup';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage;
let term;
const lightbox = new SimpleLightbox('.gallery a', {
  captions: false,
});
loadMoreBtn.addEventListener('click', loadMorePictures);
searchForm.addEventListener('submit', searchPictures);

function searchPictures(evt) {
  evt.preventDefault();
  currentPage = 1;
  term = evt.target.searchQuery.value.trim();
  if (!term) {
    cleanFields();
    return Notify.failure(`Enter a search query, please.`);
  }
  fetchPictures(term, currentPage)
    .then(data => {
      if (!data.data.hits.length) {
        cleanFields();
        return Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
      Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
      gallery.innerHTML = createMarkup(data.data.hits);
      lightbox.refresh();

      loadMoreBtn.style.display = 'block';
    })
    .catch(err => {
      Notify.failure(`Oops, something went wrong`);
    });
}

function loadMorePictures() {
  currentPage += 1;
  fetchPictures(term, currentPage)
    .then(data => {
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.data.hits));
      lightbox.refresh();
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      if (currentPage > data.data.totalHits / 40) {
        loadMoreBtn.style.display = 'none';
        gallery.insertAdjacentHTML(
          'beforeend',
          `<p class='result-text'>We're sorry, but you've reached the end of search results.</p>`
        );
      }
    })
    .catch(err => {
      Notify.failure(`Oops, something went wrong`);
    });
}
function cleanFields() {
  searchForm.reset();
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
}
