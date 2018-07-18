import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from '../../../helpers/intl-enzyme-test-helper';
import SideBarFilter from '../../../../src/components/company/SideBarFilter/SideBarFilter';
import IndustryFilter from '../../../../src/components/company/SideBarFilter/IndustryFilter/IndustryFilter';
import GrantFilter from '../../../../src/components/company/SideBarFilter/GrantFilter/GrantFilter';

enzyme.configure({ adapter: new Adapter() });

describe('Side Bar Filter', () => {
  let render;

  before(() => {
    render = shallowWithIntl(<SideBarFilter />);
  });

  it('renders industry title', () => {
    const text = render.find('.industry-group-title').find('FormattedMessage').dive().text();
    chai.expect(text).to.eq('Filter by Your Industry');
  });

  it('renders industry filter', () => {
    const component = render.find(IndustryFilter);
    chai.expect(component).to.have.length(1);
  });

  it('renders grant title', () => {
    const text = render.find('.grant-group-title').find('FormattedMessage').dive().text();
    chai.expect(text).to.eq('Filter by Your Grant');
  });

  it('renders grant filter', () => {
    const component = render.find(GrantFilter);
    chai.expect(component).to.have.length(1);
  });
});
