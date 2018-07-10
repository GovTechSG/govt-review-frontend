import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import CompanyIndexPage from '../../../company/CompanyIndexPage';
import CompanyPage from '../../../company/CompanyPage/CompanyPage';

export default class DemoPage extends Component {
  render() {
    const CompanyPageRouter = withRouter(CompanyPage);
    return (
      <div className="base-container">
          <Header logout={this.props.logout} />
          <div className="common-main">
            <Switch>
              <Route exact path="/demo" component={CompanyIndexPage} />
              <Route path="/demo/company/:id" component={CompanyPageRouter} />
            </Switch>
          </div>
        <Footer />
      </div>
    );
  }
}
