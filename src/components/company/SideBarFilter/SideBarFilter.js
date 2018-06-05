import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
// import API from '../../_utility/Api';
import './SideBarFilter.scss';
import IndustryFilter from './IndustryFilter/IndustryFilter';
import GrantFilter from './GrantFilter/GrantFilter';


export default class SideBarFilter extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(industryId) {
    this.props.handleFilterChange(industryId);
  }

  render() {
    return (
      <Row className="sidebar">
        <Col sm={12}>
          <div className="industry-group-title">
            <FormattedMessage id="sidebarfilter.industry" />
          </div>
          <IndustryFilter handleFilterChange={this.handleFilterChange} />
          <br />
          <div className="grant-group-title">
            <FormattedMessage id="sidebarfilter.grant" />
          </div>
          <GrantFilter />
        </Col>
      </Row>
    );
  }
}
