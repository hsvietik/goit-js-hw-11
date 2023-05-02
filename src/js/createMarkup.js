export function createMarkup(hits) {
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
        return `<a class='card-link photo-card' href=${largeImageURL}><img class='card-img' src="${webformatURL}" alt="${tags}" loading="lazy" /><div class="info"><p class="info-item"><b>Likes</b>${likes}</p><p class="info-item"><b>Views</b>${views}</p><p class="info-item"><b>Comments</b>
        ${comments}</p><p class="info-item"><b>Downloads</b>${downloads}</p></div></a>`;
      }
    )
    .join('');
}
