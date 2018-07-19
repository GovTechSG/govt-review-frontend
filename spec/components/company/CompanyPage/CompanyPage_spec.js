import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from '../../../helpers/intl-enzyme-test-helper';
import CompanyPage from '../../../../src/components/company/CompanyPage/CompanyPage';
import CompanyInfo from '../../../../src/components/company/CompanyPage/CompanyInfo/CompanyInfo';

enzyme.configure({ adapter: new Adapter() });

describe('CompanyPage', () => {
  let render;
  const companyMockData = {
    id: 'AbC123',
    name: 'Pivotal Software',
    phone_number: '6123 4567',
    url: 'http://pivotal.com',
    uen: '984208873',
    description: 'Lorem Ipsum',
    image: {
      url: 'https://review-api.gds-gov.tech/uploads/company/image/24/pivotal20180402-93182-7x7gd.gif',
      thumb: {
        url: 'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-02.jpg'
      }
    },
    industries: [
      {
        id: 'AbC123',
        name: 'Agriculture'
      },
      {
        id: 'DeF123',
        name: 'Dogiculture'
      }
    ],
    project_industries: [
      {
        id: 'AbC123',
        name: 'Agriculture'
      },
      {
        id: 'AbC123',
        name: 'Dgriculture'
      }
    ]
  };
  const mockMatch = {
    params: {
      id: 'xjVtpx'
    }
  };

  before(() => {
    render = shallowWithIntl(<CompanyPage match={mockMatch} />);
    render.setState({
      companyData: companyMockData
    });
  });

  describe('when companyData loads correctly', () => {
    it('renders back to vendor listings', () => {
      const link = render.find('.back-to-vendors-list');
      chai.expect(link).to.have.length(1);
    });

    it('renders back to vendor listings text', () => {
      const link = render.find('.companypage-back').find('FormattedMessage').dive();
      chai.expect(link.text()).to.eql('Back to Consultants and Vendors List');
    });

    it('renders back to vendor listings link', () => {
      const link = render.find('.back-to-vendors-list').find('Link');
      chai.expect(link.prop('to')).to.eql('/');
    });

    it('renders CompanyInfo', () => {
      const component = render.find(CompanyInfo);
      chai.expect(component).to.have.length(1);
    });

    it('renders CompanyOfferings', () => {
      const component = render.find('CompanyOfferings');
      chai.expect(component).to.have.length(1);
    });

    it('renders CompanyScoresReviews', () => {
      const component = render.find('CompanyScoresReviews');
      chai.expect(component).to.have.length(1);
    });
  });

  describe('when companyData fails to loads', () => {
    before(() => {
      render.setState({
        companyData: 'Fail'
      });
    });

    it('renders back to vendor listings', () => {
      const link = render.find('.back-to-vendors-list');
      chai.expect(link).to.have.length(1);
    });

    it('renders back to vendor listings text', () => {
      const link = render.find('.companypage-back').find('FormattedMessage').dive();
      chai.expect(link.text()).to.eql('Back to Consultants and Vendors List');
    });

    it('renders back to vendor listings link', () => {
      const link = render.find('.back-to-vendors-list').find('Link');
      chai.expect(link.prop('to')).to.eql('/');
    });

    it('renders CompanyInfo', () => {
      const component = render.find('CompanyInfo');
      chai.expect(component).to.have.length(0);
    });

    it('renders CompanyOfferings', () => {
      const component = render.find('CompanyOfferings');
      chai.expect(component).to.have.length(0);
    });

    it('renders CompanyScoresReviews', () => {
      const component = render.find('CompanyScoresReviews');
      chai.expect(component).to.have.length(0);
    });

    it('renders Company Not Found Text', () => {
      const text = render.find('#company-not-found').find('FormattedMessage').dive().text();
      chai.expect(text).to.eq('Company Not Found!');
    });
  });
});
