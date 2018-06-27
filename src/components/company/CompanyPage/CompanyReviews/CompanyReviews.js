import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import API from '../../../../_utilities/api';
import { API_URL_PREFIX } from '../../../../_utilities/api_url_prefix';
import PageLoadSpinner from '../../../animation/PageLoadSpinner';
import './CompanyReviews.scss';

export default class CompanyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: null,
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
    }).fail(() => {
      const reviewData = 'Fail';
      this.setState({ reviewData });
    });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    // <ProgressBar>
    //   <ProgressBar bsStyle="success" max={data.reviews_count} now={data.positive} key={1} />
    //   <ProgressBar bsStyle="warning" max={data.reviews_count} now={data.neutral} key={2} />
    //   <ProgressBar bsStyle="danger" max={data.reviews_count} now={data.negative} key={3} />
    // </ProgressBar>
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
    return (
      <div className="vendor-card">
        <Col xs={12}>
          <Row className="vendor-item">

          </Row>
        </Col>
      </div>
    );
  }
}
