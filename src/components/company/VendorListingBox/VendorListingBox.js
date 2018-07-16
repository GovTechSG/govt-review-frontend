import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './VendorListingBox.scss';
import PageLoadSpinner from '../../animation/PageLoadSpinner';


export default class VendorListingBox extends Component {
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

  renderChild(data, index) {
    const industryString = this.getIndustryString(data.industries);
    const projectString = this.getProjectsString(data.project_industries);
    return (
      <div className="vendor-card" key={`$vendor-box-${index}`}>
        <Col xs={12}>
          <Row className="vendor-item" key={`vendor-box-item-${index}`}>
            <Col xs={2}>
              <div className="logo-box">
                <img src={data.image.thumb.url} alt={data.name} />
              </div>
            </Col>
            <Col xs={7}>
              <div className="vendor-name">
                <Link to={`/company/${data.id}`}>{data.name}</Link>
              </div>
              <div className="vendor-industry">{industryString}</div>
              <br />
            </Col>
            <Col xs={3}>
              <div className="rating-box">
              </div>
            </Col>
          </Row>
          <Row className="vendor-has-done">
            { data.project_industries.length !== 0 &&
              <div className="vendor-has-done-title">
                <FormattedMessage id="vendorlisting.vendor.has.done" />
              </div>
            }
            <div className="vendor-has-done-text">{projectString}</div>
          </Row>
        </Col>
      </div>
    );
  }

  render() {
    const { vendorData } = this.props;
    if (!vendorData) {
      return (
        <div className="page-load-spinner">
          <PageLoadSpinner />
        </div>
      );
    }
    if (vendorData === 'Fail') {
      return (
        <Row>
          <Col xs={12} className="vendor-container">
            <p className="no-results-found" id="no-results-found">
              <FormattedMessage id="vendorlisting.error" />
            </p>
          </Col>
        </Row>
      );
    }

    if (vendorData.length === 0) {
      return (
        <Row>
          <Col xs={12} className="vendor-container">
            <p className="no-results-found" id="no-results-found">
              <FormattedMessage id="vendorlisting.no.results.found" />
            </p>
          </Col>
        </Row>
      );
    }
    return (
      <Row>
        <Col xs={12} className="vendor-container">
          {vendorData.map((data, index) => this.renderChild(data, index))}
        </Col>
      </Row>
    );
  }
}
