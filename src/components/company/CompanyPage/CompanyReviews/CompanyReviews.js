import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import API from '../../../../_utilities/api';
import { API_URL_PREFIX } from '../../../../_utilities/api_url_prefix';
import PageLoadSpinner from '../../../animation/PageLoadSpinner';
import './CompanyReviews.scss';

export default class CompanyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: {
        review_count: 10,
        positive: 5,
        neutral: 3,
        negative: 2
      },
    };
  }

  componentDidMount() {
    const id = this.props.companyId;
    const url = `${API_URL_PREFIX}/api/v1/companies/${id}/reviews`;
    this._asyncRequest = API.get({
      url,
      data: {}
    }).then(reviewData => {
      this.setState({ reviewData });
    // }).fail(() => {
    //   const reviewData = 'Fail';
    //   this.setState({ reviewData });
    });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (!this.state.reviewData) {
      return (
        <div className="page-load-spinner">
          <PageLoadSpinner />
        </div>
      );
    }
    if (this.state.reviewData === 'Fail') {
      return (
        <div />
      );
    }
    const { reviewData } = this.state;
    return (
      <div className="vendor-card">
        <Col xs={12}>
          <Row className="vendor-item">
            <Col xs={2}>
              <div className="rating-box">
              </div>
            </Col>
            <Col xs={3} style={{ fontSize: '12px' }}>
              <Row>
                <Col xs={12}>
                </Col>
              </Row>
              {this.state.reviewData.positive &&
              <Row>
                <Col xs={3}>
                  <FormattedMessage id="companyreviews.positive" />
                </Col>
                <Col xs={7}>
                  <ProgressBar max={reviewData.review_count} now={reviewData.positive} key={1} />
                </Col>
                <Col xs={2}>
                  {Math.round(reviewData.positive / reviewData.review_count * 100)}%
                </Col>
              </Row>}
              {this.state.reviewData.positive &&
              <Row>
                <Col xs={3}>
                  <FormattedMessage id="companyreviews.neutral" />
                </Col>
                <Col xs={7}>
                  <ProgressBar max={reviewData.review_count} now={reviewData.neutral} key={1} />
                </Col>
                <Col xs={2}>
                  {Math.round(reviewData.neutral / reviewData.review_count * 100)}%
                </Col>
              </Row>}
              {this.state.reviewData.positive &&
              <Row>
                <Col xs={3}>
                  <FormattedMessage id="companyreviews.negative" />
                </Col>
                <Col xs={7}>
                  <ProgressBar max={reviewData.review_count} now={reviewData.negative} key={1} />
                </Col>
                <Col xs={2} >
                  {Math.round(reviewData.negative / reviewData.review_count * 100)}%
                </Col>
              </Row>}
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}
