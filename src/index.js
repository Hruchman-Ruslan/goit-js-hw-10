import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { getRefs } from './js/get_refs';
import { createListMarkupCountry } from './js/createListMarcupCountry';
import { createListMarkupInfoCountry } from './js/createListMarcupInfoCountry';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

export const DEBOUNCE_DELAY = 300;

const refs = getRefs();

const onFetchInfo = () =>
  Notify.info('Too many matches found. Please enter a more specific name.');

const onFetchError = () =>
  Notify.failure('Oops, there is no country with that name');

const renderCountry = country => {
  if (country.length > 10) {
    onFetchInfo();
  } else if (country.length === 1) {
    const markup = createListMarkupInfoCountry(country);
    refs.countryInfoRef.innerHTML = markup;
  } else {
    const markup = createListMarkupCountry(country);
    refs.countryListRef.innerHTML = markup;
  }
};

refs.inputRef.addEventListener(
  'input',
  debounce(e => {
    e.preventDefault();

    const searchCountry = e.target.value.trim();

    if (searchCountry) {
      fetchCountries(searchCountry).then(renderCountry).catch(onFetchError);
    }

    refs.countryListRef.innerHTML = '';
    refs.countryInfoRef.innerHTML = '';
  }, DEBOUNCE_DELAY)
);
