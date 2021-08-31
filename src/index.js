import './css/style.css';
import getPictures from './js/api-service';
import createCard from './template/card.hbs';
import * as basicLightbox from 'basiclightbox';

const Refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnMore: document.querySelector('.btn-more'),
};
const state = {
  page: 1,
  query: '',
};

Refs.form.addEventListener('submit', onSubmit);
Refs.btnMore.addEventListener('click', onBtnMore);
Refs.gallery.addEventListener('click', onImgClick);
Refs.btnMore.style.visibility = 'hidden';

async function onSubmit(e) {
  e.preventDefault();
  Refs.btnMore.style.visibility = 'hidden';

  state.query = e.currentTarget.elements.query.value;
  state.page = 1;

  const {
    data: { hits },
  } = await getPictures(state.query, state.page);
  if (hits.length > 11) {
    Refs.btnMore.style.visibility = 'visible';
  }
  const markup = createCard(hits);
  Refs.gallery.innerHTML = markup;
}

async function onBtnMore(e) {
  state.page += 1;

  const {
    data: { hits },
  } = await getPictures(state.query, state.page);
  const markup = createCard(hits);
  Refs.gallery.insertAdjacentHTML('beforeend', markup);

  Refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
function onImgClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const currentImg = e.target.dataset.src;
  const instance = basicLightbox.create(`
    <img src="${currentImg}" width="800" height="600">
`);

  instance.show();
}
