import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from '../../../../helpers/intl-enzyme-test-helper';
import CompanyInfo from '../../../../../src/components/company/CompanyPage/CompanyInfo/CompanyInfo';


enzyme.configure({ adapter: new Adapter() });

describe('CompanyInfo', () => {
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

  const grantMockData = [
    {
      name: 'Grant 1',
    },
    {
      name: 'Grant 2',
    },
    {
      name: 'Grant 3',
    }
  ];

  const clientMockData = [
    {
      name: 'Company 1',
      id: 'abc1',
      image: {
        thumb: {
          url: 'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-07.jpg'
        }
      }
    },
    {
      name: 'Company 2',
      id: 'abc2',
      image: {
        thumb: {
          url: 'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-07.jpg'
        }
      }
    },
    {
      name: 'Company 3',
      id: 'abc3',
      image: {
        thumb: {
          url: 'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-07.jpg'
        }
      }
    }
  ];

  before(() => {
    render = shallowWithIntl(<CompanyInfo companyData={companyMockData} />);
    render.setState({
      grantData: grantMockData,
      clientData: clientMockData
    });
  });

  describe('loads page spinner', () => {
    it('loads page spinner when both null', () => {
      render.setState({
        grantData: null,
        clientData: null
      });
      const spinner = render.find('.page-load-spinner');
      chai.expect(spinner).to.have.length(1);
    });

    it('loads page spinner when clientData is null', () => {
      render.setState({
        grantData: grantMockData,
        clientData: null
      });
      const spinner = render.find('.page-load-spinner');
      chai.expect(spinner).to.have.length(1);
    });

    it('loads page spinner when grantData is null', () => {
      render.setState({
        grantData: null,
        clientData: clientMockData
      });
      const spinner = render.find('.page-load-spinner');
      chai.expect(spinner).to.have.length(1);
    });
  });

  describe('renders vendor information', () => {
    before(() => {
      render.setState({
        grantData: grantMockData,
        clientData: clientMockData
      });
    });

    it('renders image', () => {
      const image = render.find('.companyinfo-logo-box').find('img');
      chai.expect(image.prop('src')).to.eql('http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-02.jpg');
    });

    it('renders vendor name', () => {
      const vendorName = render.find('.vendor-name').text();
      chai.expect(vendorName).to.eql('Pivotal Software');
    });

    it('renders vendor uen', () => {
      const vendorUen = render.find('.vendor-uen').find(FormattedMessage).dive().text();
      chai.expect(vendorUen).to.eql('UEN No: 984208873');
    });

    it('does not render vendor uen if empty', () => {
      const testCompanyMockData = Object.assign({}, companyMockData, { uen: null });
      render.setProps({
        companyData: testCompanyMockData
      });
      const vendorUen = render.find('.vendor-uen');
      chai.expect(vendorUen).to.have.length(0);
    });

    it('renders industry string', () => {
      const vendorIndustry = render.find('.vendor-industry').text();
      chai.expect(vendorIndustry).to.eql('Agriculture, Dogiculture');
    });

    it('does not render industry string if empty', () => {
      const testCompanyMockData = Object.assign({}, companyMockData, { industries: [] });
      render.setProps({
        companyData: testCompanyMockData
      });
      const vendorIndustry = render.find('.vendor-industry').text();
      chai.expect(vendorIndustry).to.eql('');
    });

    it('does not render industry string if null', () => {
      const testCompanyMockData = Object.assign({}, companyMockData, { industries: null });
      render.setProps({
        companyData: testCompanyMockData
      });
      const vendorIndustry = render.find('.vendor-industry').text();
      chai.expect(vendorIndustry).to.eql('');
    });

    it('renders vendor description', () => {
      const vendorDesc = render.find('.vendor-description-text').text();
      chai.expect(vendorDesc).to.eql('Lorem Ipsum');
    });

    it('renders fontawesome globe icon', () => {
      const image = render.find('.vendor-website').find(FontAwesomeIcon);
      chai.expect(image).to.have.length(1);
    });

    it('renders vendor url', () => {
      const vendorUrl = render.find('.vendor-website').find('a');
      chai.expect(vendorUrl.text()).to.eql('http://pivotal.com');
      chai.expect(vendorUrl.prop('href')).to.eql('http://pivotal.com');
    });

    it('renders fontawesome phone icon', () => {
      const image = render.find('.vendor-phone').find(FontAwesomeIcon);
      chai.expect(image).to.have.length(1);
    });

    it('renders vendor phone number', () => {
      const vendorPhone = render.find('.vendor-phone').text();
      chai.expect(vendorPhone).to.eql('<FontAwesomeIcon />6123 4567');
    });

    it('does not render url when no url', () => {
      const testCompanyMockData = Object.assign({}, companyMockData, { url: null });
      render.setProps({
        companyData: testCompanyMockData
      });
      chai.expect(render.find('.vendor-website')).to.have.length(0);
    });

    it('does not render url when no url', () => {
      const testCompanyMockData = Object.assign({}, companyMockData, { phone_number: null });
      render.setProps({
        companyData: testCompanyMockData
      });
      chai.expect(render.find('.vendor-phone')).to.have.length(0);
    });

    it('renders project string', () => {
      const vendorIndustry = render.find('.companyinfo-has-done-text').text();
      chai.expect(vendorIndustry).to.eql('Agriculture, Dgriculture');
    });

    it('does not render project string if empty', () => {
      const testCompanyMockData = Object.assign({}, companyMockData, { project_industries: [] });
      render.setProps({
        companyData: testCompanyMockData
      });
      const vendorIndustry = render.find('.companyinfo-has-done');
      chai.expect(vendorIndustry).to.have.length(0);
    });

    it('does not render project string if null', () => {
      const testCompanyMockData = Object.assign({}, companyMockData, { project_industries: null });
      render.setProps({
        companyData: testCompanyMockData
      });
      const vendorIndustry = render.find('.companyinfo-has-done');
      chai.expect(vendorIndustry).to.have.length(0);
    });
  });

  describe('renders previous clients', () => {
    let clients;

    before(() => {
      clients = render.find('.client-images').find('span');
    });

    it('renders correct number clients', () => {
      chai.expect(clients).to.have.length(3);
    });

    it('renders images', () => {
      const map = clients.map(client => {
        return client.find('img').prop('src');
      });
      chai.expect(map).to.deep.equal([
        'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-07.jpg',
        'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-07.jpg',
        'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-07.jpg'
      ]);
    });

    it('renders image titles', () => {
      const map = clients.map(client => {
        return client.find('img').prop('title');
      });
      chai.expect(map).to.deep.equal(['Company 1', 'Company 2', 'Company 3']);
    });

    it('renders image hyperlinks', () => {
      const map = clients.map(client => {
        return client.find(Link).prop('to');
      });
      chai.expect(map).to.deep.equal([
        '/company/abc1',
        '/company/abc2',
        '/company/abc3'
      ]);

      it('does not render when failed to get client data', () => {
        render.setState({
          clientData: 'Fail'
        });
        chai.expect(render.find('#previous-clients')).to.have.length(0);
      });

      it('does not render when client data is empty', () => {
        render.setState({
          clientData: []
        });
        chai.expect(render.find('#previous-clients')).to.have.length(0);
      });
    });

    describe('renders grant experience', () => {
      let grants;

      before(() => {
        grants = render.find('.grants-experience').find('li');
      });

      it('renders correct number of grants', () => {
        chai.expect(grants).to.have.length(3);
      });

      it('renders correct names', () => {
        const map = grants.map(grant => {
          return grant.text();
        });
        chai.expect(map).to.deep.equal([
          'Grant 1',
          'Grant 2',
          'Grant 3'
        ]);
      });

      it('does not render when failed to get grant data', () => {
        render.setState({
          grantData: 'Fail'
        });
        chai.expect(render.find('#grants')).to.have.length(0);
      });

      it('does not render when grant data is empty', () => {
        render.setState({
          grantData: []
        });
        chai.expect(render.find('#grants')).to.have.length(0);
      });
    });
  });
});
