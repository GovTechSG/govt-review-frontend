import React, { Component } from 'react';
import { Checkbox, FormGroup } from 'react-bootstrap';
import { resolve } from 'react-resolver';
import './IndustryFIlter.scss';
import API from '../../../../_utilities/api';
import { API_URL_PREFIX } from '../../../../_utilities/api_url_prefix';

export class IndustryFilter extends Component {
  renderChild(data, index) {
    return (
      <li className="industry-category" key={`$industry-box-${index}`}>
        <Checkbox onChange={() => this.props.handleFilterChange(data.id)}>
          {data.name}
        </Checkbox>
      </li>
    );
  }

  render() {
    const { industryData } = this.props;

    return (
      <ul className="industry-group">
        <FormGroup validationState={null}>
          {industryData.map((data, index) => this.renderChild(data, index))}
        </FormGroup>
      </ul>
    );
  }
}

export default resolve('industryData', () => {
  const url = `${API_URL_PREFIX}/api/v1/industries`;
  return API.get({
    url
  });
})(IndustryFilter);
