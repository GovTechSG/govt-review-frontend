import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { mountWithIntl } from '../../../../helpers/intl-enzyme-test-helper';
import CompanyOfferings from '../../../../../src/components/company/CompanyPage/CompanyOfferings/CompanyOfferings';

enzyme.configure({ adapter: new Adapter() });

describe('CompanyOfferings', () => {
  let render;
  const offeringMockData = [
    {
      name: 'Offering 1',
      description: 'Description 1'
    },
    {
      name: 'Offering 2',
      description: 'Description 2'
    },
    {
      name: 'Offering 3',
      description: 'Description 3'
    }
  ];


  before(() => {
    render = mountWithIntl(<CompanyOfferings
      companyId=""
      companyName="Company"
    />);
    render.setState({
      offeringData: offeringMockData
    });
  });

  describe('renders company offerings', () => {
    it('renders title', () => {
      const title = render.find('.offerings-header').find('span').text();
      chai.expect(title).to.eq('Company\'s Product/Service/Project Listing');
    });

    it('renders offering names', () => {
      const list = render.find('.offering-name');
      const map = list.map(listItem => {
        return listItem.text();
      });
      chai.expect(list).to.have.length(3);
      chai.expect(map).to.deep.equal([
        'Offering 1',
        'Offering 2',
        'Offering 3',
      ]);
    });

    it('renders offering descriptions', () => {
      const list = render.find('.offering-desc');
      const map = list.map(listItem => {
        return listItem.text();
      });
      chai.expect(list).to.have.length(3);
      chai.expect(map).to.deep.equal([
        'Description 1',
        'Description 2',
        'Description 3',
      ]);
    });
  });
});
