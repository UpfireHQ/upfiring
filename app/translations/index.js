import { intl, locale } from '../containers/LanguageProvider';

const messages = {
  en: {}
};

export default (id, values, defaultValue) => {
  if (!(messages[locale][id] && messages[locale][id][JSON.stringify(values)])) {
    if (!messages[locale][id]) {
      messages[locale][id] = {};
    }
    messages[locale][id][JSON.stringify(values)] = intl.formatMessage({
      id,
      defaultMessage: ''
    }, values);
  }
  return messages[locale][id][JSON.stringify(values)] || defaultValue;
};
