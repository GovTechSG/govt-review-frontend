import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { mountWithIntl } from '../../../../helpers/intl-enzyme-test-helper';
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
    render = mountWithIntl(<IndustryFilter
      industryData={industryData}
    />);
  });

  it('renders filter checkboxes', () => {
    const checkboxes = render.find('li').find('.checkbox');
    chai.expect(checkboxes).to.have.length(2);
  });

  it('renders industry names', () => {
    const map = render.find('li').map(a => {
      return a.text();
    });
    chai.expect(map).to.deep.equal(['Industry 1', 'Industry 2']);
  });
});
