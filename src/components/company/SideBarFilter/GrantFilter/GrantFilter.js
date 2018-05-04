import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import { resolve } from 'react-resolver';
// import API from '../../_utility/Api';
import './GrantFIlter.scss';

export class SideBarFilter extends Component {
  renderChild(data, index) {
    return (
      <li className="grant-category" key={`$grant-box-${index}`}>
        <Checkbox>
          {data.name}
        </Checkbox>
      </li>
    );
  }

  render() {
    const { grantData } = this.props;

    return (
      <ul className="grant-group">
        {grantData.map((data, index) => this.renderChild(data, index))}
      </ul>
    );
  }
}

export default resolve('grantData', () => {
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
