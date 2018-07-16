import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { FormattedMessage } from 'react-intl';
import { shallowWithIntl } from '../../../../helpers/intl-enzyme-test-helper';
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
    render = shallowWithIntl(<CompanyOfferings
      companyId=""
      companyName="Company"
    />);
  });

  it('loads page spinner when offering data is null', () => {
    render.setState({
      offeringData: null
    });
    const spinner = render.find('.page-load-spinner');
    chai.expect(spinner).to.have.length(1);
  });

  it('returns empty div when failed to get offering data', () => {
    render.setState({
      offeringData: 'Fail'
    });
    chai.expect(render.children()).to.have.length(0);
  });

  it('returns empty div when offering data is empty', () => {
    render.setState({
      offeringData: []
    });
    chai.expect(render.children()).to.have.length(0);
  });

  describe('renders company offerings', () => {
    before(() => {
      render.setState({
        offeringData: offeringMockData
      });
    });

    it('renders title', () => {
      const title = render.find('.offerings-header').find(FormattedMessage).dive().text();
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
