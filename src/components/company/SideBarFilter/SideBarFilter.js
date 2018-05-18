import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
// import API from '../../_utility/Api';
import './SideBarFilter.scss';
import IndustryFilter from './IndustryFilter/IndustryFilter';
import GrantFilter from './GrantFilter/GrantFilter';


export default class SideBarFilter extends Component {
  render() {
    return (
      <Row className="sidebar">
        <Col sm={12}>
          <div className="industry-group-title">
            <FormattedMessage id="filter.industry" />
          </div>
          <IndustryFilter />
          <br />
          <div className="grant-group-title">
            <FormattedMessage id="filter.grant" />
          </div>
          <GrantFilter />
        </Col>
      </Row>
    );
  }
}
