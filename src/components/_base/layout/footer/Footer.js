import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import styles from '../../../../assets/scss/footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <I18n ns="translations">
      {
        (t) => (
          <div className="footer nocontent">
            <span><a href="#"> About Us </a></span> |
            <span><a href="#"> News </a></span> |
            <span><a href="#"> How it works </a></span> |
            <span><a href="#"> FAQ </a></span> |
            <span><a href="#"> Contact Us/Feedback </a></span> |
            <span><a href="#"> Privacy Statement </a></span> |
            <span><a href="#"> Terms of Use </a></span>
            <p className={styles.copyright} id="copyright-label">
              &#169; {new Date().getFullYear()} Copyright Government of Singapore
            </p>
            <div className={styles.footerInfo}>
              <span className={styles.browserSupport}>{t('footer.browser_support')}</span>
            </div>
          </div>
        )
      }
      </I18n>
    );
  }
}
