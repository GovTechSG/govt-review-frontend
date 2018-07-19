import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import './CompanyScores.scss';


export default class CompanyScores extends Component {
  generateAspects(aspects) {
    return (
      <Col xs={7} className="aspects-col">
        <Row>
          <Col xs={12} className="col-bottom-padding-10">
            <div className="review-count">
              <FormattedMessage id="companyscores.aspects" />
            </div>
              <div className="total-aspects">
                {aspects.map((data) => {
                  return <div key={data.aspect.id} className="aspect-box"><span className="aspect-count">{data.count}</span>{data.aspect.name}</div>;
                })}
              </div>
          </Col>
        </Row>
      </Col>
    );
  }

  generateReviewCount(reviewCount) {
    if (reviewCount === 0) {
      return <FormattedMessage id="companyscores.review.zero.count" />;
    } else if (reviewCount === 1) {
      return <FormattedMessage id="companyscores.review.single.count" />;
    }
    return <FormattedMessage id="companyscores.review.count" values={{ count: reviewCount }} />;
  }

  render() {
    const { reviewData } = this.props;
    return (
      <Row className="vendor-item row-eq-height">
        <Col xs={2} >
          <div className="company-rating-box">
            <div className="score">
              {this.props.aggregateScore === 0 ?
                '-' :
                this.props.aggregateScore
              }
            </div>
            <div className="score-total">
              <FormattedMessage id="companyscores.out.of.10" />
            </div>
          </div>
        </Col>
        <Col xs={3} className="score-col">
          <Row>
            <Col xs={12} className="col-bottom-padding-10">
              <div className="review-count">
                {
                  this.generateReviewCount(this.props.reviewCount)
                }
              </div>
            </Col>
          </Row>
          <Row id="positive-row">
            <Col xs={3} id="heading">
              <FormattedMessage id="companyscores.positive" />
            </Col>
            <Col xs={7} className="review-bar">
              <ProgressBar max={this.props.reviewCount} now={reviewData.positive_count} key={1} />
            </Col>
            <Col xs={2} id="percentage">
              {
                this.props.reviewCount === 0 ?
                <span>0%</span> :
                <span>{Math.round(reviewData.positive_count / this.props.reviewCount * 100)}%</span>
              }
            </Col>
          </Row>
          <Row id="neutral-row">
            <Col xs={3} id="heading">
              <FormattedMessage id="companyscores.neutral" />
            </Col>
            <Col xs={7} className="review-bar">
              <ProgressBar max={this.props.reviewCount} now={reviewData.neutral_count} key={1} />
            </Col>
            <Col xs={2} id="percentage">
              {
                this.props.reviewCount === 0 ?
                <span>0%</span> :
                <span>{Math.round(reviewData.neutral_count / this.props.reviewCount * 100)}%</span>
              }
            </Col>
          </Row>
          <Row id="negative-row">
            <Col xs={3} id="heading">
              <FormattedMessage id="companyscores.negative" />
            </Col>
            <Col xs={7} className="review-bar">
              <ProgressBar max={this.props.reviewCount} now={reviewData.negative_count} key={1} />
            </Col>
            <Col xs={2} id="percentage">
              {
                this.props.reviewCount === 0 ?
                <span>0%</span> :
                <span>{Math.round(reviewData.negative_count / this.props.reviewCount * 100)}%</span>
              }
            </Col>
          </Row>
        </Col>
        { this.props.aspectsData !== 'Fail' &&
          reviewData.positive_count !== 0 &&
          this.props.reviewCount !== 0 &&
          this.generateAspects(this.props.aspectsData)
        }
      </Row>
    );
  }
}
