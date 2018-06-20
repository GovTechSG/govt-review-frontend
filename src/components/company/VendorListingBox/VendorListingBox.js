import React, { Component } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
// import { resolve } from 'react-resolver';
import { FormattedMessage } from 'react-intl';
import API from '../../../_utilities/api';
import './VendorListingBox.scss';
import { API_URL_PREFIX } from '../../../_utilities/api_url_prefix';
import PageLoadSpinner from '../../animation/PageLoadSpinner';


export default class VendorListingBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorData: null,
      selectedView: this.props.selectedView,
      activePage: this.props.activePage,
      itemsCountPerPage: this.props.itemsCountPerPage,
      searchText: this.props.searchText,
      filter: this.props.filter
    };
  }

  getIndustryString(industriesArray) {
    const len = industriesArray.length;

    if (len === 0) {
      return '';
    }

    let industryString = industriesArray[0].name;
    if (len > 1) {
      let i = 1;
      for (i, len; i < len; i++) {
        industryString += `, ${industriesArray[i].name}`;
      }
    }
    return industryString;
  }

  getProjectsString(projectsArray) {
    const len = projectsArray.length;

    if (len === 0) {
      return '';
    }

    let projectString = projectsArray[0].name;
    if (len > 1) {
      let i = 1;
      for (i, len; i < len; i++) {
        projectString += `, ${projectsArray[i].name}`;
      }
    }
    return projectString;
  }

  componentDidMount() {
    this._asyncRequest = this._loadAsyncData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedView !== prevProps.selectedView ||
      this.props.activePage !== prevProps.activePage ||
      this.props.itemsCountPerPage !== prevProps.itemsCountPerPage ||
      this.props.searchText !== prevProps.searchText ||
      this.props.filter !== prevProps.filter
    ) {
      this.props.updatePagination(0);
      this._asyncRequest = this._loadAsyncData();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.selectedView === state.selectedView &&
      props.activePage === state.activePage &&
      props.itemsCountPerPage === state.itemsCountPerPage &&
      props.searchText === state.searchText &&
      props.filter === state.filter
    ) {
      return null;
    }
    return {
      vendorData: null,
      selectedView: props.selectedView,
      activePage: props.activePage,
      itemsCountPerPage: props.itemsCountPerPage,
      searchText: props.searchText,
      filter: props.filter
    };
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
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
        filter: this.state.filter
      }
    })
      .then((vendorData, textStatus, response) => { //eslint-disable-line
        this._asyncRequest = null;
        this.setState({ vendorData });
        this.props.updatePagination(response.getResponseHeader('total'));
      });
  }

  renderChild(data, index) {
    const industryString = this.getIndustryString(data.industries);
    const projectString = this.getProjectsString(data.project_industries);
    return (
      <div className="vendor-card" key={`$vendor-box-${index}`}>
        <Col xs={12}>
          <Row className="vendor-item" key={`vendor-box-item-${index}`}>
            <Col xs={2}>
              <div className="logo-box">
                <img src={data.image.thumb.url} alt={data.name} />
              </div>
            </Col>
            <Col xs={7}>
              <div className="vendor-name">{data.name}</div>
              <div className="vendor-industry">{industryString}</div>
              <br />
            </Col>
            <Col xs={3}>
              <div className="rating-box">
                <div className="positivity">
                  <div className="aggregate_score">{ data.reviews_count !== 0 && Math.round(data.ratings) }</div>
                    { data.reviews_count === 0 ?
                      <FormattedMessage id="vendorlisting.no.reviews" /> :
                      <FormattedMessage id="vendorlisting.percent.positive" />
                    }
                </div>
                <br />
                <ProgressBar>
                  <ProgressBar bsStyle="success" max={data.reviews_count} now={data.positive} key={1} />
                  <ProgressBar bsStyle="warning" max={data.reviews_count} now={data.neutral} key={2} />
                  <ProgressBar bsStyle="danger" max={data.reviews_count} now={data.negative} key={3} />
                </ProgressBar>
                <div className="aggregate-count">
                  <FormattedMessage id="vendorlisting.aggregate.count" values={{ reviews_count: data.reviews_count }} />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="vendor-has-done-row">
            <div className="vendor-has-done-title">
              { data.project_industries.length !== 0 &&
                <FormattedMessage id="vendorlisting.vendor.has.done" />
              }
            </div>
            <div className="vendor-has-done">{projectString}</div>
          </Row>
        </Col>
      </div>
    );
  }

  render() {
    const { vendorData } = this.state;
    if (!vendorData) {
      return (
        <div className="page-load-spinner">
          <PageLoadSpinner />
        </div>
      );
    }
    if (vendorData.length === 0) {
      return (
        <Row>
          <Col xs={12} className="vendor-container">
            <p className="no-results-found" id="no-results-found">
              <FormattedMessage id="vendorlisting.no.results.found" />
            </p>
          </Col>
        </Row>
      );
    }
    return (
      <Row>
        <Col xs={12} className="vendor-container">
          {vendorData.map((data, index) => this.renderChild(data, index))}
        </Col>
      </Row>
    );
  }
}
