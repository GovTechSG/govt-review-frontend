import React, { Component } from 'react';
import { Nav, NavItem, Row, Col, FormControl, FormGroup, ControlLabel, InputGroup, Glyphicon } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import ReactPaginate from 'react-paginate';
import VendorListingBox from '../VendorListingBox/VendorListingBox';
import API from '../../../_utilities/api';
import { API_URL_PREFIX } from '../../../_utilities/api_url_prefix';
import './VendorSorter.scss';


export default class VendorSorter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedView: 'aggregate_score',
      activePage: 1,
      itemsCountPerPage: 5,
      currentItemsCount: 0,
      searchText: '',
      filterUrl: this.props.filterUrl,
      vendorData: null
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.searchCompany = this.searchCompany.bind(this);
  }

  handleSelect(eventKey, event) {
    event.preventDefault();
    this.setState({
      selectedView: eventKey,
      activePage: 1,
    }, () => {
      this.updateVendorListingData();
    });
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber.selected + 1,
    }, () => {
      window.scrollTo(0, 0);
      this.updateVendorListingData();
    });
  }

  searchCompany(e) {
    e.preventDefault();
    this.setState({
      searchText: this.input.value,
      activePage: 1,
    }, () => {
      this.updateVendorListingData();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.filterUrl !== prevProps.filterUrl) {
      this.updateVendorListingData();
    }
  }

  componentDidMount() {
    this._asyncRequest = this._loadAsyncData();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.filterUrl !== state.filterUrl) {
      return {
        filterUrl: props.filterUrl,
        activePage: 1
      };
    }
    // No state update necessary
    return null;
  }

  updateVendorListingData() {
    this.setState({
      vendorData: null,
      currentItemsCount: 0
    }, () => {
      this._asyncRequest = this._loadAsyncData();
    });
  }

  _loadAsyncData() {
    const url = `${API_URL_PREFIX}/api/v1/companies`;
    return API.get({
      url,
      data: {
        sort_by: this.state.selectedView,
        page: this.state.activePage,
        per_page: this.state.itemsCountPerPage,
        search: this.state.searchText,
        filter: this.state.filterUrl
      }
    })
      .then((vendorData, textStatus, response) => { //eslint-disable-line
        this._asyncRequest = null;
        this.setState({
          vendorData,
          currentItemsCount: parseInt(response.getResponseHeader('total'), 10)
        });
      })
      .fail(() => {
        this.setState({
          vendorData: 'Fail',
          currentItemsCount: 0
        });
      });
  }

  getStartCount() {
    return this.state.itemsCountPerPage * (this.state.activePage - 1) + 1;
  }

  getEndCount() {
    return Math.min(this.state.itemsCountPerPage * this.state.activePage, this.state.currentItemsCount);
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={12}>
          <div className="col-xs-12">
            <form onSubmit={this.searchCompany}>
              <FormGroup validationState={null}>
                <ControlLabel className="search-control-label">
                  <FormattedMessage id="vendorsorter.find.consultants" />
                </ControlLabel>
                <InputGroup>
                  <FormattedMessage id="vendorsorter.search.company">
                    { message => (
                      <FormControl
                        id="company-search-bar"
                        type="text"
                        placeholder={message}
                        inputRef={ref => { this.input = ref; }}
                      />
                      )
                    }
                  </FormattedMessage>
                  <InputGroup.Addon>
                    <Glyphicon glyph="search" />
                  </InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </form>
          </div>
            <Nav className="nav-sorter" pullLeft bsStyle="tabs" activeKey={this.state.selectedView} onSelect={(k, event) => this.handleSelect(k, event)}>
              <NavItem eventKey="aggregate_score" id="best_ratings">
                <FormattedMessage id="vendorsorter.best.ratings" />
              </NavItem>
              <NavItem eventKey="created_at" id="newly_added">
                <FormattedMessage id="vendorsorter.newly.added" />
              </NavItem>
            </Nav>
            { this.state.currentItemsCount !== 0 &&
              <div className="total-items" id="total-items">
                <FormattedMessage
                  id="vendorsorter.pageinfo"
                  values={{
                    startCount: this.getStartCount(),
                    endCount: this.getEndCount(),
                    totalCount: this.state.currentItemsCount
                  }}
                />
              </div>
            }
          </Col>
        </Row>
        <div className="vendorsorter-border"></div>
        <Row>
          <Col sm={12}>
            <VendorListingBox
              vendorData={this.state.vendorData}
              className="vendor-listing-box"
            />
          </Col>
        </Row>
        {this.state.currentItemsCount !== 0 &&
          <div id="pagination">
            <ReactPaginate
              pageCount={Math.ceil(this.state.currentItemsCount / this.state.itemsCountPerPage)}
              forcePage={this.state.activePage - 1}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              previousLabel="PREV"
              nextLabel="NEXT"
              breakLabel={<a className="btn btn-break">...</a>}
              onPageChange={this.handlePageChange}
              containerClassName="pagination"
              pageLinkClassName="btn btn-default"
              previousLinkClassName="prev-next prev"
              nextLinkClassName="prev-next next"
            />
          </div>
        }
      </div>
    );
  }
}
