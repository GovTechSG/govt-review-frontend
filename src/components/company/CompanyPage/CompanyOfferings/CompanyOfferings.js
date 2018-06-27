import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
// import API from '../../../../_utilities/api';
// import { API_URL_PREFIX } from '../../../../_utilities/api_url_prefix';
import PageLoadSpinner from '../../../animation/PageLoadSpinner';
import './CompanyOfferings.scss';

export default class CompanyOfferings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offeringData: [],
    };
  }

  componentDidMount() {
    const id = this.props.companyId;
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

  generateOfferings(offeringData) {
    return (
      <div className="offerings">
        {offeringData.map((data) => {
          return (
            <Row key={data.name}>
              <div className="offering-name">{data.name}</div>
              <div className="offering-desc">{data.description}</div>
            </Row>
          );
        })}
      </div>
    );
  }

  render() {
    if (!this.state.offeringData) {
      return (
        <div className="page-load-spinner">
          <PageLoadSpinner />
        </div>
      );
    }
    if (this.state.offeringData === 'Fail' || this.state.offeringData.length === 0) {
      return (
        <div />
      );
    }
    return (
      <div className="vendor-card">
        <Col xs={12}>
          <Row className="reviews-header">
            <FormattedMessage id="companyofferings.listing" values={{ companyName: this.props.companyName }} />
          </Row>
          {this.generateOfferings(this.state.offeringData)}
        </Col>
      </div>
    );
  }
}

