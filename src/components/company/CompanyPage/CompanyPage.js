import React, { Component } from 'react';
import { resolve } from 'react-resolver';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft';
import './CompanyPage.scss';
import API from '../../../_utilities/api';
import { API_URL_PREFIX } from '../../../_utilities/api_url_prefix';
import CompanyInfo from './CompanyInfo/CompanyInfo';

export class CompanyPage extends Component {
  render() {
    const { companyData } = this.props;
    return (
      <div className="container">
        <Row>
          <Col xs={12} sm={12}>
            <div className="back-to-vendors-list">
              <a href="/demo">
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                <span style={{ marginLeft: '15px' }}>
                  <FormattedMessage id="companypage.back" />
                </span>
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <CompanyInfo companyData={companyData} />
        </Row>
      </div>
    );
  }
}

export default resolve('companyData', (props) => {
  const { id } = props.match.params;
  const url = `${API_URL_PREFIX}/api/v1/companies/${id}`;
  return API.get({
    url,
  });
})(CompanyPage);
