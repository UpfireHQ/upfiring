import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = (state) => state && state.language || null;

/**
 * Select the language locale
 */

const makeSelectLocale = () => createSelector(
  selectLanguage,
  (languageState) => languageState && languageState.language || null
);

export {
  selectLanguage,
  makeSelectLocale
};
