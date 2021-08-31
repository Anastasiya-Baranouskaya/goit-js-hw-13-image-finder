// https://pixabay.com/api/

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '23179182-e4180ebf4fb1d604ce9d1efc0';

function getPictures(query, page) {
  return axios.get(`?image_type=photo&orientation=horizontal&q=${query}
  &page=${page}&per_page=12&key=${KEY}`);
}

export default getPictures;
