/* eslint complexity: [2,7] */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import '../../../../jquery';
import grpLogoMain from './grp-logo.svg';
import govtLogo from './govt-logo.svg';
import grpLogoAffix from './grp-affix.svg';
import './header.scss';
import { API_URL_PREFIX } from '../../../../_utilities/api_url_prefix';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { sticky: false };
  }

  render() {
    return (
      <div className={classNames('header', { sticky: this.props.sticky })}>
        <div className="grp-masthead hidden-xs hidden-sm">
          <div className="grp-header-logo-container" id="grp-header-logo">
            <Link to="/">
              <img className="grp-header-logo" src={grpLogoMain} alt="G Review Portal" />
            </Link>
          </div>

          <div className="pull-right">
            <div id="grp-gvt-logo-container">
              <div className="govt-logo">
                <a target="_blank" href="https://www.gov.sg">
                  <img src={govtLogo} alt="gov.sg" />
                </a>
              </div>

              <div className="lion-link">
                <a href="/feedback">
                  <FormattedMessage id="header.govt.feedback" />
                </a>
                <a href="/about_us">
                  <FormattedMessage id="header.govt.aboutus" />
                </a>
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
              <span className="sr-only">
                <FormattedMessage id="header.nav.toggle" />
              </span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <div id="grp-navbar-collapse" className="collapse navbar-collapse no-transition">
              <ul className="nav navbar-nav grp-topnavi">

                <li>
                  <a href={`${API_URL_PREFIX}/api/docs`}>
                    <FormattedMessage id="header.nav.api" />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <FormattedMessage id="header.nav.contactus" />
                  </a>
                </li>

                <li className="log-button">
                  <Button className="login" id="login-button" onClick={() => this.props.logout()} to="/demo/login" >
                    <FormattedMessage id="header.nav.logout" />
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  sticky: PropTypes.bool
};
