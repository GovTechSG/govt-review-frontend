import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import './App.scss';
import CompanyIndexPage from '../../company/CompanyIndexPage';
import CompanyPage from '../../company/CompanyPage/CompanyPage';

class App extends Component {
  render() {
    return (
      <div className="base-container">
        <Header />
        <div className="common-main">
        <BrowserRouter>
          <Switch>
            <Route exact path="/portal" component={CompanyIndexPage} />
            <Route path="/portal/company/:id" component={CompanyPage} />
          </Switch>
        </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}


export default App;
