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
      title: 'GovReview',
      industryFilter: new Set(),
      grantFilter: new Set()
    };
    this.handleIndustryFilterChange = this.handleIndustryFilterChange.bind(this);
    this.handleGrantFilterChange = this.handleGrantFilterChange.bind(this);
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

  handleGrantFilterChange(grantId) {
    const grantFilter = new Set(this.state.grantFilter);
    if (this.state.grantFilter.has(grantId)) {
      grantFilter.delete(grantId);
    } else {
      grantFilter.add(grantId);
    }
    this.setState({
      grantFilter: new Set(grantFilter)
    });
  }

  generateFilterString() {
    let filterUrl = '';
    for (const id of this.state.industryFilter) filterUrl += `industries:${id},`;
    for (const id of this.state.grantFilter) filterUrl += `grants:${id},`;
    return filterUrl.substr(0, filterUrl.length - 1);
  }

  render() {
    return (
      <Row className="company-index">
        <Col lg={3} md={3} sm={12} xs={12}>
          <SideBarFilter handleIndustryFilterChange={this.handleIndustryFilterChange} handleGrantFilterChange={this.handleGrantFilterChange} />
        </Col>
        <Col lg={9} md={9} sm={12} xs={12}>
          <VendorSorter filterUrl={this.generateFilterString()} />
        </Col>
      </Row>
    );
  }
}
