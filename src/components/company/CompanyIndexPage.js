import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
// import { IntlProvider } from 'react-intl';
import './CompanyIndexPage.scss';
import SideBarFilter from './SideBarFilter/SideBarFilter';
import VendorSorter from './VendorSorter/VendorSorter';

export default class CompanyIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Government Review Platform',
      industryFilter: new Set()
    };
    this.handleIndustryFilterChange = this.handleIndustryFilterChange.bind(this);
  }

  componentWillMount() {
    document.title = this.state.title;
  }

  handleIndustryFilterChange(industryId) {
    const industryFilter = new Set(this.state.industryFilter);
    if (this.state.industryFilter.has(industryId)) {
      industryFilter.delete(industryId);
    } else {
      industryFilter.add(industryId);
    }
    this.setState({
      industryFilter: new Set(industryFilter)
    });
  }

  render() {
    return (
      <Row className="company-index">
        <Col lg={3} md={3} sm={12} xs={12}>
          <SideBarFilter handleFilterChange={this.handleIndustryFilterChange} />
        </Col>
        <Col lg={9} md={9} sm={12} xs={12}>
          <VendorSorter industryFilter={this.state.industryFilter} />
        </Col>
      </Row>
    );
  }
}
