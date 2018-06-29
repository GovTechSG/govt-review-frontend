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
      filter: 'ALL',
      per_page: reviewsPerPage
    };
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidMount() {
    this._asyncRequest = this._loadAsyncData();
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  _loadAsyncData() {
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

  handleChangeFilter(key) {
    this.setState({
      filter: key,
      per_page: reviewsPerPage
    }, () => {
      this._asyncRequest = this._loadAsyncData();
    });
  }

  handleLoadMore() {
    this.setState({
      per_page: this.state.per_page + reviewsPerPage
    }, () => {
      this._asyncRequest = this._loadAsyncData();
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
    const toLoadMore = this.toLoadMore(reviewData);
    return (
      <div className="vendor-card">
        <Col xs={12}>
          <Row className="reviews-header">
            <FormattedMessage id="companyscores.reviews" />
          </Row>
          <CompanyScores reviewData={reviewData} reviewCount={reviewCount} />
          <CompanyReviews
            reviewCount={reviewCount}
            reviewData={reviewData}
            handleChangeFilter={this.handleChangeFilter}
            handleLoadMore={this.handleLoadMore}
            toLoadMore={toLoadMore}
          />
        </Col>
      </div>
    );
  }
}
