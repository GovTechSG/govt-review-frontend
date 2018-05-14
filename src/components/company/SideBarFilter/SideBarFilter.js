import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
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
            Filter by Your Industry
          </div>
          <IndustryFilter />
          <br />
          <div className="grant-group-title">
            Filter by Your Grant
          </div>
          <GrantFilter />
        </Col>
      </Row>
    );
  }
}
