import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
export async function fetchPictures(term, currentPage) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: '35947372-f7304d47210ac11edb1e8f45f',
      q: term,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: currentPage,
    },
  });
  return response;
}
