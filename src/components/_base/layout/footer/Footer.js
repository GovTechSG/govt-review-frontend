import React, { Component } from 'react';
import styles from './footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer nocontent" id="footer-content">
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
          <span className={styles.browserSupport} id="browser-support">
            Government Review Platform is best viewed with Chrome, Firefox, Safari and Internet Explorer 10 and above
          </span>
        </div>
      </div>
    );
  }
}
