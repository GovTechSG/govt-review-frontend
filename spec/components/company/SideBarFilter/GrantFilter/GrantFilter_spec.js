import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import { Checkbox } from 'react-bootstrap';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from '../../../../helpers/intl-enzyme-test-helper';
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
    render = shallowWithIntl(<GrantFilter
      grantData={grantData}
    />);
  });

  it('renders filter checkboxes', () => {
    const checkboxes = render.find(Checkbox);
    chai.expect(checkboxes).to.have.length(2);
  });

  it('renders grant names', () => {
    const map = render.find(Checkbox).map(a => {
      return a.dive().text();
    });
    chai.expect(map).to.deep.equal(['Grant 1', 'Grant 2']);
  });
});
