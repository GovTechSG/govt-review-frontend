/* eslint complexity: [2,7] */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import '../../../../jquery';
import grpLogoMain from './grp-logo.svg';
import govtLogo from './govt-logo.svg';
import grpLogoAffix from './grp-affix.svg';
import './header.scss';

export default class Header extends Component {
  static HOME_SECTIONS = [
    '',
    'my_grants',
    'news',
    'feedback',
    'how_it_works',
    'faq',
    'logged_out'
  ];

  constructor(props) {
    super(props);
    this.state = { sticky: false };
  }

  render() {
    return (
      <div className={classNames('header', { sticky: this.props.sticky })}>
        <div className="grp-masthead hidden-xs hidden-sm">
          <div className="grp-header-logo-container" id="grp-header-logo">
            <a href="/">
              <img className="grp-header-logo" src={grpLogoMain} alt="G Review Portal" />
            </a>
          </div>

          <div className="pull-right">
            <div id="grp-gvt-logo-container">
              <div className="govt-logo">
                <a target="_blank" href="https://www.gov.sg">
                  <img src={govtLogo} alt="gov.sg" />
                </a>
              </div>

              <div className="lion-link">
                <a href="/feedback">Contact Us/Feedback</a>
                <a href="/about_us">About Us</a>
              </div>
            </div>
          </div>
        </div>

        <div id="nav" className={classNames({ sticky: this.state.sticky })}>
          <div className="navbar navbar-default grp-topnavi-wrapper">
            <div className="grp-nav-logo" id="grp-nav-logo">
              <a href="/"><img src={grpLogoAffix} alt="Home" /></a>
            </div>

            <button
              className="navbar-toggle grp-mobile-nav-btn"
              data-target="#grp-navbar-collapse"
              data-toggle="collapse"
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <div id="grp-navbar-collapse" className="collapse navbar-collapse no-transition">
              <ul className="nav navbar-nav grp-topnavi">

                <li>
                  <a href="#">News</a>
                </li>

                <li>
                  <a href="#">How it works</a>
                </li>

                <li>
                  <a href="#">FAQ</a>
                </li>

                <li className="log-button">
                  <a className="login" id="login-button" onClick={(this.login)}>Log In</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  login() {
    window.location = '/saml/sso';
  }

  logout() {
    window.localStorage.setItem('grp-logged-out', Date.now());
    window.location = '/saml/slo';
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  sticky: PropTypes.bool
};
