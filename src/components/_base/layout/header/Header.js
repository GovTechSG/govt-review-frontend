/* eslint complexity: [2,7] */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import $ from 'jquery';
import classNames from 'classnames';
import grpLogoMain from './grp-logo.svg';
import govtLogo from './govt-logo.svg';
import grpLogoAffix from './grp-affix.svg';

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

  componentDidMount() {
    $('.nav a').click(() => {
      this.closeNav();
    });
  }
  closeNav() {
    $('.navbar-collapse').collapse('hide');
  }

  render() {
    return (
      <div className={classNames('header', { sticky: this.props.sticky })}>
        <div className="bgp-masthead hidden-xs hidden-sm">
          <div className="bgp-header-logo-container" id="bgp-header-logo">
            <a href="/">
              <img className="bgp-header-logo" src={grpLogoMain} alt="G Review Portal" />
            </a>
          </div>

          <div className="pull-right">
            <div id="bgp-gvt-logo-container">
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
          <div className="navbar navbar-default bgp-topnavi-wrapper">
            <div className="bgp-nav-logo" id="bgp-nav-logo">
              <a href="/"><img src={grpLogoAffix} alt="Home" /></a>
            </div>

            <button
              className="navbar-toggle bgp-mobile-nav-btn"
              data-target="#bgp-navbar-collapse"
              data-toggle="collapse"
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <div id="bgp-navbar-collapse" className="collapse navbar-collapse no-transition">
              <ul className="nav navbar-nav bgp-topnavi">

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
    window.localStorage.setItem('bgp-logged-out', Date.now());
    window.location = '/saml/slo';
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  sticky: PropTypes.bool
};
