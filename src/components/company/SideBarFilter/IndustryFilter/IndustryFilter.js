import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import { resolve } from 'react-resolver';
// import API from '../../_utility/Api';
import './IndustryFIlter.scss';

export class SideBarFilter extends Component {
  renderChild(data, index) {
    return (
      <li className="industry-category" key={`$industry-box-${index}`}>
        <Checkbox>
          {data.name}
        </Checkbox>
      </li>
    );
  }

  render() {
    const { industryData } = this.props;

    return (
      <ul className="industry-group">
        {industryData.map((data, index) => this.renderChild(data, index))}
      </ul>
    );
  }
}

export default resolve('industryData', () => {
  // const url = '/api/v1/vendor';
  return [
    {
      id: 'AbC123',
      name: 'Agriculture'
    },
    {
      id: 'AbC123',
      name: 'Bgriculture'
    },
    {
      id: 'AbC123',
      name: 'Cgriculture'
    },
    {
      id: 'AbC123',
      name: 'Dgriculture'
    }
  ];
})(SideBarFilter);
