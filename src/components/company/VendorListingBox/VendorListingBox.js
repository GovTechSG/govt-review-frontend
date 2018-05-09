import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { resolve } from 'react-resolver';
import API from '../../../_utilities/api';
import './VendorListingBox.scss';
import { API_URL_PREFIX } from '../../../_utilities/api_url_prefix';

export class VendorListingBox extends Component {
  getIndustryString(industriesArray) {
    const len = industriesArray.length;

    if (len === 0) {
      return '';
    }

    let industryString = industriesArray[0].name;
    if (len > 1) {
      let i = 1;
      for (i, len; i < len; i++) {
        industryString += `, ${industriesArray[i].name}`;
      }
    }
    return industryString;
  }

  getProjectsString(projectsArray) {
    const len = projectsArray.length;

    if (len === 0) {
      return '';
    }

    let projectString = projectsArray[0].name;
    if (len > 1) {
      let i = 1;
      for (i, len; i < len; i++) {
        projectString += `, ${projectsArray[i].name}`;
      }
    }
    return projectString;
  }

  aggregateScoreByPercent(aggregateScore, reviewsCount) {
    return reviewsCount === 0 ? 100 : ((aggregateScore / reviewsCount) * 100);
  }

  renderChild(data, index) {
    const industryString = this.getIndustryString(data.industries);
    const projectString = this.getProjectsString(data.projects);
    const aggregateScore = this.aggregateScoreByPercent(data.aggregate_score, data.reviews_count);
    return (
      <Col sm={12} key={`$vendor-box-${index}`}>
        <Row className="vendor-item" key={`vendor-box-item-${index}`}>
          <Col xs={2}>
            <div className="logo-box">
              <img src={data.image.thumb.url} alt={data.name} />
            </div>
          </Col>
          <Col xs={7}>
            <div className="vendor-name">{data.name}</div>
            <div className="vendor-industry">{industryString}</div>
            <br />
            <div className="vendor-has-done-title">Has done project for:</div>
            <div className="vendor-has-done">{projectString}</div>
          </Col>
          <Col xs={3}>
            <div className="rating-box">
              <div className="positivity">{aggregateScore}% Positive</div>
              <hr />
              <div className="aggregate-count">{data.reviews_count} reviews</div>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }

  render() {
    const { vendorData } = this.props;

    return (
      <Row>
        <Col sm={12} className="vendor-container">
          {vendorData.map((data, index) => this.renderChild(data, index))}
        </Col>
      </Row>
    );
  }
}

export default resolve('vendorData', (props) => {
  const url = `${API_URL_PREFIX}/api/v1/companies/vendor_listings`;
  return API.get({
    url,
    data: {
      sort_by: props.selectedView
    }
  });
})(VendorListingBox);
