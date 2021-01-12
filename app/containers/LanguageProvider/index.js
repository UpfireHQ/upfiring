/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

import { DEFAULT_LOCALE } from './constants';

export let intl;
export let locale;

export class LanguageProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    locale = this.props.locale ? this.props.locale : DEFAULT_LOCALE;
    intl = new IntlProvider({
      locale: locale,
      messages: this.props.messages[locale]
    }, {}).getChildContext().intl;
    return (
      <IntlProvider locale={locale} key={locale}
                    messages={this.props.messages[locale]}>
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({locale})
);

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
