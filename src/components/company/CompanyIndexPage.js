import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './CompanyIndexPage.scss';
import SideBarFilter from './SideBarFilter/SideBarFilter';
import VendorSorter from './VendorSorter/VendorSorter';

export default class CompanyIndexPage extends Component {
  render() {
    return (
      <Row className="company-index">
        <Col lg={3} md={3} sm={12} xs={12}>
          <SideBarFilter />
        </Col>
        <Col lg={9} md={9} sm={12} xs={12}>
          <VendorSorter />
        </Col>
      </Row>
    );
  }
}
