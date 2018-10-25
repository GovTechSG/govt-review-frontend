import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import { Checkbox } from 'react-bootstrap';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from '../../../../helpers/intl-enzyme-test-helper';
import { IndustryFilter } from '../../../../../src/components/company/SideBarFilter/IndustryFilter/IndustryFilter';

enzyme.configure({ adapter: new Adapter() });

describe('Industry Filter', () => {
  let render;
  const industryData = [
    {
      id: 'ABCD1',
      name: 'Industry 1'
    },
    {
      id: 'ABCD2',
      name: 'Industry 2'
    }
  ];

  before(() => {
    render = shallowWithIntl(<IndustryFilter
      industryData={industryData}
    />);
  });

  it('renders filter checkboxes', () => {
    const checkboxes = render.find(Checkbox);
    chai.expect(checkboxes).to.have.length(2);
  });

  it('renders industry names', () => {
    const map = render.find(Checkbox).map(a => {
      return a.dive().text();
    });
    chai.expect(map).to.deep.equal(['Industry 1', 'Industry 2']);
  });
});
