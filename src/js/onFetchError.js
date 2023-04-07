import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const onFetchError = () =>
  Notify.failure('Oops, there is no country with that name');
