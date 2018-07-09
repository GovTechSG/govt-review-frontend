import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { shallowWithIntl } from '../../helpers/intl-enzyme-test-helper';
import Login from '../../../src/components/auth/Login';

enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
  let render;

  before(() => {
    render = shallowWithIntl(<Login authFailed />);
  });

  it('renders header', () => {
    const header = render.find('#login-header').find(FormattedMessage).dive().text();
    chai.expect(header).to.eq('Login to GovReview');
  });

  describe('renders username', () => {
    let usernameForm;

    before(() => {
      usernameForm = render.find(FormGroup).at(0);
    });

    it('renders label', () => {
      const label = usernameForm.find(FormattedMessage).dive().text();
      chai.expect(label).to.eq('Username');
    });

    it('renders field', () => {
      const field = usernameForm.find(FormControl);
      chai.expect(field).to.have.length(1);
    });
  });

  describe('renders password', () => {
    let passwordForm;

    before(() => {
      passwordForm = render.find(FormGroup).at(1);
    });

    it('renders label', () => {
      const label = passwordForm.find(FormattedMessage).dive().text();
      chai.expect(label).to.eq('Password');
    });

    it('renders field', () => {
      const field = passwordForm.find(FormControl);
      chai.expect(field).to.have.length(1);
    });
  });

  it('renders submit', () => {
    const button = render.find(FormGroup).at(2).find(Button);
    chai.expect(button.prop('type')).to.eq('submit');
    chai.expect(button.find(FormattedMessage).dive().text()).to.eq('Sign in');
  });

  it('renders login failed message', () => {
    const message = render.find('#login-failed').find(FormattedMessage).dive().text();
    chai.expect(message).to.eq('Authentication Failed!');
  });
});
