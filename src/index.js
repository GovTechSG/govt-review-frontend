import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import './index.scss';
import App from './components/_base/layout/App';
import messagesEn from './translations/en';

addLocaleData([...localeEn]);

const messages = {
  en: messagesEn,
};

// const language = navigator.language.split(/[-_]+/)[0];
const language = 'en';

ReactDOM.render(
  (
    <IntlProvider
      locale={language}
      messages={messages[language]}
    >
      <App />
    </IntlProvider>
  ), document.getElementById('root')
);
