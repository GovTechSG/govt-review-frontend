import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft';
import './CompanyPage.scss';
import API from '../../../_utilities/api';
import { API_URL_PREFIX } from '../../../_utilities/api_url_prefix';
import CompanyInfo from './CompanyInfo/CompanyInfo';
import CompanyScoresReviews from './CompanyScoresReviews/CompanyScoresReviews';
import CompanyOfferings from './CompanyOfferings/CompanyOfferings';
import PageLoadSpinner from '../../animation/PageLoadSpinner';

export default class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyData: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const url = `${API_URL_PREFIX}/api/v1/companies/${id}`;
    this._asyncRequest = API.get({
      url
    }).then(companyData => {
      this.setState({ companyData });
    }).fail(() => {
      const companyData = 'Fail';
      this.setState({ companyData });
    });
  }

  render() {
    const { companyData } = this.state;
    if (!companyData) {
      return (
        <div className="page-load-spinner">
          <PageLoadSpinner />
        </div>
      );
    }

    if (companyData === 'Fail') {
      return (
        <div>
          <Row>
            <Col sm={12}>
              <div className="back-to-vendors-list">
                <Link to="/demo">
                  <FontAwesomeIcon icon={faAngleDoubleLeft} />
                  <span className="companypage-back">
                    <FormattedMessage id="companypage.back" />
                  </span>
                </Link>
              </div>
            </Col>
          </Row>
          <div>
            Company Not Found!
          </div>
        </div>
      );
    }
    return (
      <div className="company-container">
        <Row>
          <Col sm={12}>
            <div className="back-to-vendors-list">
              <Link to="/demo">
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                <span className="companypage-back">
                  <FormattedMessage id="companypage.back" />
                </span>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <CompanyInfo companyData={companyData} />
        </Row>
        <Row>
          <CompanyOfferings companyId={companyData.id} companyName={companyData.name} />
        </Row>
        <Row>
          <CompanyScoresReviews companyId={companyData.id} />
        </Row>
      </div>
    );
  }
}
