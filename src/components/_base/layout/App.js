import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import './App.scss';
import CompanyIndexPage from '../../company/index/CompanyIndexPage';

class App extends Component {
  render() {
    return (
      <div className="base-container">
        <Header />
        <div className="main">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={CompanyIndexPage} />
            <Route exact path="/companies" component={CompanyIndexPage} />
          </Switch>
        </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}


export default App;
