import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { mountWithIntl } from '../../../../helpers/intl-enzyme-test-helper';
import { GrantFilter } from '../../../../../src/components/company/SideBarFilter/GrantFilter/GrantFilter';

enzyme.configure({ adapter: new Adapter() });

describe('Grant Filter', () => {
  let render;
  const grantData = [
    {
      id: 'ABCD1',
      name: 'Grant 1'
    },
    {
      id: 'ABCD2',
      name: 'Grant 2'
    }
  ];

  before(() => {
    render = mountWithIntl(<GrantFilter
      grantData={grantData}
    />);
  });

  it('renders filter checkboxes', () => {
    const checkboxes = render.find('li').find('.checkbox');
    chai.expect(checkboxes).to.have.length(2);
  });

  it('renders grant names', () => {
    const map = render.find('li').map(a => {
      return a.text();
    });
    chai.expect(map).to.deep.equal(['Grant 1', 'Grant 2']);
  });
});
