import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import API from '../../../../_utilities/api';
import { API_URL_PREFIX } from '../../../../_utilities/api_url_prefix';
import PageLoadSpinner from '../../../animation/PageLoadSpinner';
import './CompanyOfferings.scss';

export default class CompanyOfferings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offeringData: null,
    };
  }

  componentDidMount() {
    const id = this.props.companyDataId;
    const url = `${API_URL_PREFIX}/api/v1/companies/${id}/offerings`;
    this._asyncRequest = API.get({
      url,
      data: {
        sort_by: 'aggregate_score',
        desc: 'true',
        page: 1,
        per_page: 3
      }
    }).then(offeringData => {
      this.setState({ offeringData });
    }).fail(() => {
      const offeringData = 'Fail';
      this.setState({ offeringData });
    });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (!this.state.offeringData) {
      return (
        <div className="page-load-spinner">
          <PageLoadSpinner />
        </div>
      );
    }
    if (this.state.offeringData === 'Fail') {
      return (
        <div />
      );
    }
    return (
      <div className="vendor-card">
        <Col xs={12}>
          <Row className="reviews-header">
            <FormattedMessage id="companyofferings-lising" values={{ companyName: this.props.companyName }} />
          </Row>
          <Row className="vendor-item">

          </Row>
        </Col>
      </div>
    );
  }
}

