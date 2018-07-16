import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import './SideBarFilter.scss';
import IndustryFilter from './IndustryFilter/IndustryFilter';
import GrantFilter from './GrantFilter/GrantFilter';


export default class SideBarFilter extends Component {
  constructor(props) {
    super(props);
    this.handleIndustryFilterChange = this.handleIndustryFilterChange.bind(this);
    this.handleGrantFilterChange = this.handleGrantFilterChange.bind(this);
  }

  handleIndustryFilterChange(industryId) {
    this.props.handleIndustryFilterChange(industryId);
  }

  handleGrantFilterChange(grantId) {
    this.props.handleGrantFilterChange(grantId);
  }

  render() {
    return (
      <Row className="sidebar">
        <Col sm={12}>
          <div className="industry-group-title">
            <FormattedMessage id="sidebarfilter.industry" />
          </div>
          <IndustryFilter handleFilterChange={this.handleIndustryFilterChange} />
          <br />
          <div className="grant-group-title">
            <FormattedMessage id="sidebarfilter.grant" />
          </div>
          <GrantFilter handleFilterChange={this.handleGrantFilterChange} />
        </Col>
      </Row>
    );
  }
}
