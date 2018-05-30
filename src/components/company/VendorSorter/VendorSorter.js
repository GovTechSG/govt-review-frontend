import React, { Component } from 'react';
import { Nav, NavItem, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Pagination from 'react-js-pagination';
import VendorListingBox from '../VendorListingBox/VendorListingBox';
// import API from '../../../_utilities/api';
import './VendorSorter.scss';

export default class VendorSorter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedView: 'best_ratings',
      activePage: 1,
      itemsCountPerPage: 5,
      totalItemsCount: 100
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
  }

  handleSelect(eventKey, event) {
    event.preventDefault();
    this.setState({
      selectedView: eventKey,
      activePage: 1
    });
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber
    });
  }

  updatePagination(itemsCount) {
    if (itemsCount !== this.state.totalItemsCount) {
      this.setState({
        totalItemsCount: itemsCount
      });
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={12}>
            <Nav className="nav-sorter" bsStyle="tabs" activeKey={this.state.selectedView} onSelect={(k, event) => this.handleSelect(k, event)}>
              <NavItem eventKey="best_ratings">
                <FormattedMessage id="vendorsorter.best.ratings" />
              </NavItem>
              <NavItem eventKey="newly_added" id="newly_added">
                <FormattedMessage id="vendorsorter.newly.added" />
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <VendorListingBox
              selectedView={this.state.selectedView}
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemsCountPerPage}
              updatePagination={this.updatePagination}
              className="vendor-listing-box"
            />
          </Col>
        </Row>
        <Pagination
          className="pagination"
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={this.state.totalItemsCount}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}
