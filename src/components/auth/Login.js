import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import './Login.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authenticate(this.state.username, this.state.password);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <div className="login-container" style={{ padding: '20px' }}>
        <div style={{ fontSize: '30px' }} id="login-header">
          <FormattedMessage id="login.header" />
        </div>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <Col componentClass={ControlLabel} sm={2} className="login-form-label">
            <FormattedMessage id="login.username" />
            </Col>
            <Col sm={10}>
              <FormControl type="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} />
            </Col>
          </FormGroup>

          <FormGroup controlId="password">
            <Col componentClass={ControlLabel} sm={2} className="login-form-label">
            <FormattedMessage id="login.password" />
            </Col>
            <Col sm={10}>
              <FormControl type="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit"><FormattedMessage id="login.signin" /></Button>
            </Col>
          </FormGroup>
        </Form>
        {
          this.props.authFailed &&
          <div style={{ color: 'red' }} id="login-failed">
            <FormattedMessage id="login.auth.failed" />
          </div>
        }
      </div>
    );
  }
}

