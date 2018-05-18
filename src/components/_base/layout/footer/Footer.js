import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer nocontent" id="footer-content">
        <span><a href="#"> <FormattedMessage id="footer.aboutus" /> </a></span> |
        <span><a href="#"> <FormattedMessage id="footer.news" /> </a></span> |
        <span><a href="#"> <FormattedMessage id="footer.howitworks" /> </a></span> |
        <span><a href="#"> <FormattedMessage id="footer.faq" /> </a></span> |
        <span><a href="#"> <FormattedMessage id="footer.feedback" /> </a></span> |
        <span><a href="#"> <FormattedMessage id="footer.privacy" /> </a></span> |
        <span><a href="#"> <FormattedMessage id="footer.termsofuse" /> </a></span>
        <p className={styles.copyright} id="copyright-label">
          <FormattedMessage id="footer.copyright" values={{ year: new Date().getFullYear() }} />
        </p>
        <div className={styles.footerInfo}>
          <span className={styles.browserSupport} id="browser-support">
            <FormattedMessage id="footer.browsersupport" />
          </span>
        </div>
      </div>
    );
  }
}
