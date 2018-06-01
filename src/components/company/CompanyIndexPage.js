import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
// import { IntlProvider } from 'react-intl';
import './CompanyIndexPage.scss';
import SideBarFilter from './SideBarFilter/SideBarFilter';
import VendorSorter from './VendorSorter/VendorSorter';

export default class CompanyIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = { title: 'Government Review Platform' };
  }

  componentWillMount() {
    document.title = this.state.title;
  }

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
