import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { mountWithIntl, shallowWithIntl } from './helpers/intl-enzyme-test-helper';
import App from '../src/components/_base/layout/App';
import Login from '../src/components/auth/Login';
import DemoPage from '../src/components/_base/layout/demo/DemoPage';

enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  let render;

  before(() => {
    render = shallowWithIntl(<App />);
    render.setState({
      isAuth: false
    });
  });

  it('renders without crashing', () => {
    chai.expect(render.find(BrowserRouter)).to.have.length(1);
    chai.expect(render.find(BrowserRouter).prop('basename')).to.eq('/demo');
  });

  it('renders route to login page if not auth', () => {
    const loginRoute = render.find(Route);
    chai.expect(loginRoute).to.have.length(1);
    chai.expect(render.find(Redirect)).to.have.length(0);

    chai.expect(loginRoute.prop('path')).to.eq('/login');
  });

  it('redirects to demo page if auth', () => {
    render.setState({
      isAuth: true
    });
    const redirectRoute = render.find(Redirect);
    chai.expect(redirectRoute).to.have.length(1);
    chai.expect(render.find(Route)).to.have.length(0);
    chai.expect(redirectRoute.prop('to')).to.eq('/');
  });

  describe('Login functionality', () => {
    before(() => {
      render = mountWithIntl(<App />);
      render.setState({
        isAuth: false
      });
    });

    it('renders login page when not auth', () => {
      chai.expect(render.find(Login)).to.have.length(1);
      chai.expect(render.find(DemoPage)).to.have.length(0);
    });
  });
});
