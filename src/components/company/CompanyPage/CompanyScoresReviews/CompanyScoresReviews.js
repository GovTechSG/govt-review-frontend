import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import API from '../../../../_utilities/api';
import { API_URL_PREFIX } from '../../../../_utilities/api_url_prefix';
import PageLoadSpinner from '../../../animation/PageLoadSpinner';
import CompanyScores from './CompanyScores/CompanyScores';
import CompanyReviews from './CompanyReviews/CompanyReviews';
import './CompanyScoresReviews.scss';

const reviewsPerPage = 5;
let reviewCount;

export default class CompanyScoresReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: null,
      aspectsData: null,
      filter: 'ALL',
      per_page: reviewsPerPage
    };
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidMount() {
    this._asyncRequest = this._loadAsyncReviewData();
    this._asyncRequest = this._loadAsyncAspectData();
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  _loadAsyncReviewData() {
    const id = this.props.companyId;
    const url = `${API_URL_PREFIX}/api/v1/companies/${id}/reviews`;
    return API.get({
      url,
      data: {
        filter_by_score: this.state.filter,
        per_page: this.state.per_page,
        page: 1,
        sory_by: 'created_at',
        count: true
      }
    }).then(reviewData => {
      reviewCount = reviewData.positive_count + reviewData.neutral_count + reviewData.negative_count;
      this.setState({ reviewData });
    }).fail(() => {
      const reviewData = 'Fail';
      this.setState({ reviewData });
    });
  }

  _loadAsyncAspectData() {
    const id = this.props.companyId;
    const url = `${API_URL_PREFIX}/api/v1/companies/${id}/aspects`;
    return API.get({
      url,
      data: {
        count: true,
        sort_by: 'aspects_count',
        filter_by_score: 'POSITIVE'
      }
    }).then(aspectsData => {
      this.setState({ aspectsData });
    }).fail(() => {
      const aspectsData = 'Fail';
      this.setState({ aspectsData });
    });
  }

  handleChangeFilter(key) {
    this.setState({
      filter: key,
      per_page: reviewsPerPage
    }, () => {
      this._asyncRequest = this._loadAsyncReviewData();
    });
  }

  handleLoadMore() {
    this.setState({
      per_page: this.state.per_page + reviewsPerPage
    }, () => {
      this._asyncRequest = this._loadAsyncReviewData();
    });
  }

  toLoadMore(reviewData) {
    if (this.state.filter === 'ALL') {
      return reviewCount > this.state.per_page;
    } else if (this.state.filter === 'POSITIVE') {
      return reviewData.positive_count > this.state.per_page;
    } else if (this.state.filter === 'NEUTRAL') {
      return reviewData.neutral_count > this.state.per_page;
    }
    return reviewData.negative_count > this.state.per_page;
  }

  render() {
    if (!this.state.reviewData || !this.state.aspectsData) {
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
    const toLoadMore = this.toLoadMore(this.state.reviewData);
    return (
      <div className="vendor-card">
        <Col xs={12}>
          <Row className="reviews-header">
            <FormattedMessage id="companyscores.reviews" />
          </Row>
          <CompanyScores
            reviewData={this.state.reviewData}
            reviewCount={reviewCount}
            aspectsData={this.state.aspectsData}
          />
          <CompanyReviews
            reviewCount={reviewCount}
            reviewData={this.state.reviewData}
            handleChangeFilter={this.handleChangeFilter}
            handleLoadMore={this.handleLoadMore}
            toLoadMore={toLoadMore}
          />
        </Col>
      </div>
    );
  }
}
