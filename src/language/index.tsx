import { createStore } from 'redux';
import { LanguageReducer } from './LanguageReducer';

export const languageStore = createStore(LanguageReducer);

languageStore.subscribe(() => {
  localStorage.setItem('language', languageStore.getState());
});
