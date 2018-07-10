import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import DemoPage from './demo/DemoPage';
import Login from '../../auth/Login';

const ProtectedRoute = ({ isAllowed, ...props }) => {
  if (isAllowed) {
    return <Route {...props} />;
  }
  return <Redirect to="/demo/login" />;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      authFailed: false
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(inputUser, inputPass) {
    if (inputUser === process.env.REACT_APP_USERNAME && inputPass === process.env.REACT_APP_PASSWORD) {
      this.setState({
        isAuth: true,
        authFailed: false
      });
    } else {
      this.setState({
        isAuth: false,
        authFailed: true
      });
    }
  }

  logout() {
    this.setState({
      isAuth: false,
      authFailed: false
    });
  }

  renderLogin() {
    if (!this.state.isAuth) {
      return (<Route
        path="/demo/login"
        render={() => <Login authenticate={this.login} authFailed={this.state.authFailed} />}
      />);
    }
    return <Redirect to="/demo" />;
  }

  render() {
    return (
      <div>
          <HashRouter basename="/">
            <Switch>
              <ProtectedRoute isAllowed={this.state.isAuth} exact path="/demo" render={() => <DemoPage logout={this.logout} />} />
              <ProtectedRoute isAllowed={this.state.isAuth} path="/demo/company/:id" render={() => <DemoPage logout={this.logout} />} />
              {this.renderLogin()}
            </Switch>
          </HashRouter>
      </div>
    );
  }
}


export default App;
