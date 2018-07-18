import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGlobe from '@fortawesome/fontawesome-free-solid/faGlobe';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import API from '../../../../_utilities/api';
import { API_URL_PREFIX } from '../../../../_utilities/api_url_prefix';
import PageLoadSpinner from '../../../animation/PageLoadSpinner';
import './CompanyInfo.scss';

export default class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grantData: null,
      clientData: null
    };
  }

  componentDidMount() {
    const { id } = this.props.companyData;
    let url = `${API_URL_PREFIX}/api/v1/companies/${id}/clients`;
    this._asyncRequest = API.get({
      url,
      data: {
        sort_by: 'created_at',
        filter_by: 'nil',
        desc: 'true',
        page: 1,
        per_page: 3
      }
    }).then(clientData => {
      this.setState({ clientData });
    }).fail(() => {
      const clientData = 'Fail';
      this.setState({ clientData });
    });
    url = `${API_URL_PREFIX}/api/v1/companies/${id}/grants`;
    this._asyncRequest = API.get({
      url,
      data: {
        sort_by: 'reviews_count',
        filter_by: 'nil',
        desc: 'true',
        page: 1,
        per_page: 3
      }
    }).then(grantData => {
      this.setState({ grantData });
    }).fail(() => {
      const grantData = 'Fail';
      this.setState({ grantData });
    });
  }

  getIndustryString(industriesArray) {
    if (!industriesArray) {
      return '';
    }

    let industriesString = '';
    for (const data of industriesArray) industriesString += `${data.name}, `;
    return industriesString.substring(0, industriesString.length - 2);
  }

  getProjectsString(projectsArray) {
    if (!projectsArray) {
      return '';
    }

    let projectString = '';
    for (const data of projectsArray) projectString += `${data.name}, `;
    return projectString.substring(0, projectString.length - 2);
  }

  generatePrevClients(clientData) {
    if (clientData !== 'Fail' && clientData.length !== 0) {
      return (
        <Col sm={6} id="previous-clients">
          <div className="companyinfo-subheader">
            <FormattedMessage id="companyinfo-previous-clients" />
          </div>
          <div className="client-images">
            { clientData.map((data) => {
              return <span key={data.name}><Link to={`/company/${data.id}`}><img src={data.image.thumb.url} alt={data.name} title={data.name} /></Link></span>;
            })}
          </div>
        </Col>
      );
    }
    return <div />;
  }

  generateGrants(grantData) {
    if (grantData !== 'Fail' && grantData.length !== 0) {
      return (
        <Col sm={6} id="grants">
          <div className="companyinfo-subheader">
            <FormattedMessage id="companyinfo-grants-experience" />
          </div>
          <div className="grants-experience">
          {grantData.map((data) => {
            return <li key={data.name}><span>{data.name}</span></li>;
            })}
          </div>
        </Col>
      );
    }
    return <div />;
  }

  generateContactDetails(url, phoneNumber) {
    return (
      <Col xs={12}>
        {url &&
        <span className="vendor-website">
          <FontAwesomeIcon icon={faGlobe} className="contact-icon" />
          <a href={url} target="_blank">{url}</a>
        </span>
        }
        {phoneNumber &&
        <span className="vendor-phone">
          <FontAwesomeIcon icon={faPhone} className="contact-icon" />
          {phoneNumber}
        </span>
        }
      </Col>
    );
  }

  render() {
    const { companyData } = this.props;
    const industryString = this.getIndustryString(companyData.industries);
    const projectString = this.getProjectsString(companyData.project_industries);
    if (!this.state.grantData || !this.state.clientData) {
      return (
        <div className="page-load-spinner">
          <PageLoadSpinner />
        </div>
      );
    }
    return (
      <div className="vendor-card">
        <Col xs={12}>
          <Row className="vendor-item">
            <Col xs={1} className="companyinfo-logo-box">
              <img src={companyData.image.thumb.url} alt={companyData.name} title={companyData.name} />
            </Col>
            <Col xs={11}>
              <span className="vendor-name">{companyData.name}</span>
              {companyData.uen &&
              <span className="vendor-uen"><FormattedMessage id="companyinfo.uen" values={{ uen: companyData.uen }} /></span>}
              <div className="vendor-industry">{industryString}</div>
            </Col>
          </Row>
          <Row className="vendor-description">
            <Col xs={10}>
              <div className="vendor-description-text">
                {companyData.description}
              </div>
            </Col>
          </Row>
          <Row className="vendor-contact-details">
            {this.generateContactDetails(companyData.url, companyData.phone_number)}
          </Row>
          {projectString !== '' &&
            <Row className="companyinfo-has-done">
              <Col xs={9}>
                <div className="companyinfo-has-done"><FormattedMessage id="companyinfo-has-done" /></div>
                <div className="companyinfo-has-done-text">{projectString}</div>
              </Col>
            </Row>
          }
          <div className="companypage-border" />
          <Row>
            {this.generatePrevClients(this.state.clientData)}
            {this.generateGrants(this.state.grantData)}
          </Row>
        </Col>
      </div>
    );
  }
}
