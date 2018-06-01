import React, { Component } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { resolve } from 'react-resolver';
import { FormattedMessage } from 'react-intl';
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

  renderChild(data, index) {
    const industryString = this.getIndustryString(data.industries);
    const projectString = this.getProjectsString(data.project_industries);
    return (
      <div className="vendor-card" key={`$vendor-box-${index}`}>
        <Col sm={12}>
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
            </Col>
            <Col xs={3}>
              <div className="rating-box">
                <div className="positivity">
                  <div className="aggregate_score">{ data.reviews_count !== 0 && Math.round(data.ratings) }</div>
                    { data.reviews_count === 0 ?
                      <FormattedMessage id="vendorlisting.no.reviews" /> :
                      <FormattedMessage id="vendorlisting.percent.positive" />
                    }
                </div>
                <br />
                <ProgressBar>
                  <ProgressBar bsStyle="success" max={data.reviews_count} now={data.positive} key={1} />
                  <ProgressBar bsStyle="warning" max={data.reviews_count} now={data.neutral} key={2} />
                  <ProgressBar bsStyle="danger" max={data.reviews_count} now={data.negative} key={3} />
                </ProgressBar>
                <div className="aggregate-count">
                  <FormattedMessage id="vendorlisting.aggregate.count" values={{ reviews_count: data.reviews_count }} />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="vendor-has-done-row">
            <div className="vendor-has-done-title">
              <FormattedMessage id="vendorlisting.vendor.has.done" />
            </div>
            <div className="vendor-has-done">{projectString}</div>
          </Row>
        </Col>
      </div>
    );
  }

  componentDidMount() {
    const { vendorData } = this.props;
    this.props.updatePagination(vendorData.count);
  }

  componentDidUpdate() {
    const { vendorData } = this.props;
    this.props.updatePagination(vendorData.count);
  }

  render() {
    const { vendorData } = this.props;

    return (
      <Row>
        <Col sm={12} className="vendor-container">
          {vendorData.companies.map((data, index) => this.renderChild(data, index))}
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
      sort_by: props.selectedView,
      page: props.activePage,
      per_page: props.itemsCountPerPage
    }
  });
})(VendorListingBox);
