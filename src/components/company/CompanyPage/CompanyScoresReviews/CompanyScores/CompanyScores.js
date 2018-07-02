import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import './CompanyScores.scss';


export default class CompanyScores extends Component {
  render() {
    const { reviewData } = this.props;
    return (
      <Row className="vendor-item">
        <Col xs={2}>
          <div className="rating-box">
          </div>
        </Col>
        <Col xs={4} className="font-13">
          <Row>
            <Col xs={12} className="col-bottom-padding-10">
              <div className="review-count">
                <FormattedMessage id="companyscores.review.count" values={{ count: this.props.reviewCount }} />
              </div>
            </Col>
          </Row>
          {reviewData.positive_count &&
          <Row>
            <Col xs={3}>
              <FormattedMessage id="companyscores.positive" />
            </Col>
            <Col xs={7} className="review-bar">
              <ProgressBar max={this.props.reviewCount} now={reviewData.positive_count} key={1} />
            </Col>
            <Col xs={2}>
              {Math.round(reviewData.positive_count / this.props.reviewCount * 100)}%
            </Col>
          </Row>}
          {reviewData.positive_count &&
          <Row>
            <Col xs={3}>
              <FormattedMessage id="companyscores.neutral" />
            </Col>
            <Col xs={7} className="review-bar">
              <ProgressBar max={this.props.reviewCount} now={reviewData.neutral_count} key={1} />
            </Col>
            <Col xs={2}>
              {Math.round(reviewData.neutral_count / this.props.reviewCount * 100)}%
            </Col>
          </Row>}
          {reviewData.positive_count &&
          <Row>
            <Col xs={3}>
              <FormattedMessage id="companyscores.negative" />
            </Col>
            <Col xs={7} className="review-bar">
              <ProgressBar max={this.props.reviewCount} now={reviewData.negative_count} key={1} />
            </Col>
            <Col xs={2} >
              {Math.round(reviewData.negative_count / this.props.reviewCount * 100)}%
            </Col>
          </Row>}
        </Col>
        <Col xs={6} className="col-border-left">
          <Row>
            <Col xs={12} className="col-bottom-padding-10">
              <div className="review-count">
                <FormattedMessage id="companyscores.aspects" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
