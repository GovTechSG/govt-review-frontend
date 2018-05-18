import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from '../src/components/_base/layout/App';


describe('/', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <IntlProvider>
        <App />
      </IntlProvider>
      , div
    );
  });
});
