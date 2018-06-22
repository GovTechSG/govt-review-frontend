import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
// import API from '../../../../_utilities/api';
// import { API_URL_PREFIX } from '../../../../_utilities/api_url_prefix';
// import PageLoadSpinner from '../../../animation/PageLoadSpinner';
import './CompanyReviews.scss';

export default class CompanyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // reviewData: null,
    };
  }

  componentDidMount() {
    /* const { id } = this.props.companyData;
    const url = `${API_URL_PREFIX}/api/v1/companies/${id}/clients`;
    this._asyncRequest = API.get({
      url,
      data: {
        sort_by: 'created_at',
        filter_by: 'nil',
        desc: 'true',
        page: 1,
        per_page: 3
      }
    }).then(reviewData => {
      this.setState({ reviewData });
    }).fail(() => {
      const reviewData = 'Fail';
      this.setState({ reviewData });
    }); */
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    // if (!this.state.reviewData) {
    //   return (
    //     <div className="page-load-spinner">
    //       <PageLoadSpinner />
    //     </div>
    //   );
    // }
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

