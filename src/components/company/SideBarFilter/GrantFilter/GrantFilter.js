import React, { Component } from 'react';
import { Checkbox, FormGroup } from 'react-bootstrap';
import { resolve } from 'react-resolver';
import './GrantFIlter.scss';
import API from '../../../../_utilities/api';
import { API_URL_PREFIX } from '../../../../_utilities/api_url_prefix';

export class GrantFilter extends Component {
  renderChild(data, index) {
    return (
      <li className="grant-category" key={`$grant-box-${index}`}>
        <Checkbox title={(data.name)} onChange={() => this.props.handleFilterChange(data.id)}>
          {data.name}
        </Checkbox>
      </li>
    );
  }

  render() {
    const { grantData } = this.props;

    return (
      <ul className="grant-group">
        <FormGroup validationState={null}>
          {grantData.map((data, index) => this.renderChild(data, index))}
        </FormGroup>
      </ul>
    );
  }
}

export default resolve('grantData', () => {
  const url = `${API_URL_PREFIX}/api/v1/grants`;
  return API.get({
    url
  });
})(GrantFilter);
