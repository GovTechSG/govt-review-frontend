import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper';
import CompanyPage from '../../../../src/components/company/CompanyPage/CompanyPage';

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
    render = mountWithIntl(<CompanyPage
      match={mockMatch}
    />);
    render.setState({
      companyData: companyMockData
    });
  });

  it('renders back to vendor listings', () => {
    const link = render.find('.back-to-vendors-list');
    chai.expect(link).to.have.length(1);
  });

  it('renders back to vendor listings text', () => {
    const link = render.find('.back-to-vendors-list');
    chai.expect(link.text()).to.eql('Back to Consultants and Vendors List');
  });

  it('renders back to vendor listings link', () => {
    const link = render.find('.back-to-vendors-list');
    chai.expect(link.find('a').prop('href')).to.eql('/demo');
  });
});
