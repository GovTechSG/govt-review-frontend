import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import DemoPage from './demo/DemoPage';
import Login from '../../auth/Login';
import { API_URL_PREFIX } from '../../../_utilities/api_url_prefix';
import API from '../../../_utilities/api';

const ProtectedRoute = ({ isAllowed, ...props }) => {
  if (isAllowed) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

class App extends Component {
  constructor(props) {
    super(props);
    if (sessionStorage.getItem('authToken')) {
      this.state = {
        isAuth: true,
        authFailed: false
      };
    } else {
      this.state = {
        isAuth: false,
        authFailed: false
      };
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(inputUser, inputPass) {
    const url = `${API_URL_PREFIX}/api/v1/oauth/token`;
    API.post({
      url,
      data: {
        name: inputUser,
        password: inputPass
      }
    })
      .then(loginData => {
        this._asyncRequest = null;
        this.setState({
          isAuth: true,
          authFailed: false
        }, () => {
          sessionStorage.setItem('authToken', `${loginData.token_type} ${loginData.access_token}`);
        });
      })
      .fail(() => {
        this.setState({
          isAuth: false,
          authFailed: true
        });
      });
  }

  logout() {
    this.setState({
      isAuth: false,
      authFailed: false
    });
    this.revokeToken();
    sessionStorage.removeItem('authToken');
  }

  revokeToken() {
    const url = `${API_URL_PREFIX}/api/v1/oauth/revoke`;
    API.post({
      url,
      data: {
        token: sessionStorage.getItem('authToken').split(' ')[1]
      }
    });
  }

  renderLogin() {
    if (!this.state.isAuth) {
      return (<Route
        path="/login"
        render={() => <Login authenticate={this.login} authFailed={this.state.authFailed} />}
      />);
    }
    return <Redirect to="/" />;
  }

  render() {
    return (
      <BrowserRouter basename="/demo">
        <Switch>
          <ProtectedRoute isAllowed={this.state.isAuth} exact path="/" render={() => <DemoPage logout={this.logout} />} />
          <ProtectedRoute isAllowed={this.state.isAuth} path="/company/:id" render={() => <DemoPage logout={this.logout} />} />
          {this.renderLogin()}
          <ProtectedRoute isAllowed={this.state.isAuth} path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
